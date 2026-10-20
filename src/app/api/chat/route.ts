import Settings from "@/model/settings.model";
import { NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";
import connectDb from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { message, ownerId } = await req.json();
    if (!message || !ownerId) {
      return;
    }


    await connectDb();
    const setting = await Settings.findOne({ ownerId });
    if (!setting) {
      return;
    }

    const KNOWLEDGE = `
    business name- ${setting.businessName} || not provided
    support email- ${setting.supportEmail} || not provided
    knowledge- ${setting.knowledge} || not provided
    `;

    const prompt = ` `;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const interaction = await ai.interactions.create({
      model: "gemini-2.5-flash",
      input: prompt,
    });
  } catch (error) {}
}
