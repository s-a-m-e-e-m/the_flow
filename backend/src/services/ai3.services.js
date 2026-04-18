const { GoogleGenAI } = require("@google/genai");
const { z } = require('zod/v3');
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const careerRoadmapSchema = z.object({
  role: z.string().describe("The career role for which to generate a roadmap."),
  stages: z.array(z.object({
    stage: z.string().describe("The stage in the career roadmap."),
    skills: z.array(z.string()).describe("The list of skills required for this stage.")
  })).describe("The list of stages in the career roadmap.")
});

const generateCareerRoadmap = async (role) => {

    let prompt = `Generate a career roadmap for the role ${role} you have to give the required skills one should need to learn for making a career in field of ${role}. The skills should be listed in a step-wise manner, starting from the most basic skills to the more advanced ones. The roadmap should be comprehensive and cover all the essential skills required for this role. Return an array of objects with key as stages and value as the list of skills for each stage.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(careerRoadmapSchema),
        },
    });

    const result = careerRoadmapSchema.parse(JSON.parse(response.text));
    return result;
}

module.exports = { generateCareerRoadmap };