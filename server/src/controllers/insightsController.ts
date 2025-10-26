import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

function safeParseJsonArray(text: string): any[] | null {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return null;
    const cleaned = jsonMatch[0].replace(/```json\n?|\n?```/g, '').trim();
    try {
        const parsed = JSON.parse(cleaned);
        return Array.isArray(parsed) ? parsed : null;
    } catch {
        return null;
    }
}

const insightSchema = {
    type: "array" as const, // Tipo principal: un array
    items: { // El formato de cada elemento del array
        type: "object" as const,
        properties: {
          "id": {
                type: "string" as const, // El ID se define como cadena de texto
                description: "Identificador único y corto para este insight, generado por el modelo."
            },
            type: {
                type: "string" as const,
                enum: ["success", "warning", "tip", "info"],
                description: "Categoría del insight."
            },
            title: {
                type: "string" as const,
                description: "Título breve del insight."
            },
            description: {
                type: "string" as const,
                description: "Descripción detallada del hallazgo y sugerencia."
            },
            priority: {
                type: "string" as const,
                enum: ["high", "medium", "low"],
                description: "Prioridad del insight."
            }
        },
        required: ["id", "type", "title", "description" , "priority" ],
    },
};

export async function generateInsights(req: Request, res: Response) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('GEMINI_API_KEY missing');
            return res.status(500).json({ error: 'Server misconfiguration: GEMINI_API_KEY missing' });
        }

        const { employeeData } = req.body;
        if (!employeeData) return res.status(400).json({ error: 'employeeData required' });

        const genAI = new GoogleGenerativeAI( apiKey );

        const prompt = `Analiza los siguientes datos de empleados y genera 3-5 insights relevantes sobre productividad y eficiencia:
${JSON.stringify(employeeData)}

Instrucción: Genera un array JSON que se adhiera estrictamente al esquema proporcionado.`;

        // Ajusta el modelId si necesitas otro; también puedes pasar GEMINI_MODEL en .env
        const modelId = 'gemini-2.5-pro';

        const model = genAI.getGenerativeModel({
            model: modelId
        });

        // Llamada a la API — la librería puede aceptar prompt directamente o en objeto, probamos con el uso más común
        const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { // <--- Usa 'config' aquí para las opciones de generación
        responseMimeType: "application/json",
        responseSchema: insightSchema, // <--- Tu esquema definido
        // Puedes mover las opciones de generación aquí o dejarlas en getGenerativeModel
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 3072,
    }
} as any);
        const response = await result.response;
        const text = response.text();

        console.log('Raw response from model:', text);

        const parsed = safeParseJsonArray(text);
        if (!parsed) {
            // Devuelve texto crudo para debugging si no se pudo parsear
            console.error('No valid JSON array found in AI response. Returning raw text for debug.');
            return res.status(502).json({
                error: 'Invalid JSON from model',
                raw: text,
            });
        }        

        return res.json(text);
    } catch (err: any) {
        console.error('Error generating insights:', err);
        return res.status(500).json({
            error: 'Error generating insights',
            details: err?.message ?? String(err),
        });
    }
}