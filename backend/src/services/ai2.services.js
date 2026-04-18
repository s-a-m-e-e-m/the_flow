const { GoogleGenAI } = require("@google/genai");
const { z } = require('zod/v3');
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const studyPlanDaySchema = z.object({
  day_number: z.number().describe("The day number of the study plan."),
  subject: z.string().optional().describe("The subject of the study plan."),
  topics: z.array(z.string()).describe("The list of topics to be covered on this day."),
  importanceLevel: z.enum(["low", "medium", "high"]).describe("The importance level of this day in the study plan, indicating how crucial it is for the overall preparation.")
});

const prompt = `Generate a study plan for a student preparing for exams. The study plan should properly cover all the subjects and topics that the student needs to study, and should be organized in a day-wise manner.`;

const generateStudyPlan = async (days, subjects) => {
    const totalDays = Number(days);
    const formattedSubjects = Array.isArray(subjects) ? subjects.join(", ") : String(subjects);

    if (!Number.isInteger(totalDays) || totalDays <= 0) {
        throw new Error("days must be a positive integer.");
    }

    const studyPlanSchema = z.array(studyPlanDaySchema).length(totalDays).describe("Day-wise study plan where each array item represents one day.");
    const studyPlanJsonSchema = zodToJsonSchema(studyPlanSchema);

    let finalPrompt = `${prompt}\nThe study plan should cover the following subjects: ${formattedSubjects}.\nThe study plan should be for a total of ${totalDays} days.\nReturn ONLY a valid JSON array with exactly ${totalDays} items.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: finalPrompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: studyPlanJsonSchema,
        },
    });

    const result = studyPlanSchema.parse(JSON.parse(response.text));
    return result;
}

module.exports = { generateStudyPlan };