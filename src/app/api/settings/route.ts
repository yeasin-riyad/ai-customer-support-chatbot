
import connectDb from "@/lib/db";
import Settings from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { ownerId, businessName, supportEmail, knowledge } = body;

    // Validate required fields
    if (!ownerId) {
      return NextResponse.json(
        {
          success: false,
          message: "Owner ID is required",
        },
        { status: 400 },
      );
    }

    if (
      typeof ownerId !== "string" ||
      typeof businessName !== "string" ||
      typeof supportEmail !== "string" ||
      typeof knowledge !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data",
        },
        { status: 400 },
      );
    }

    if (!businessName.trim() || !supportEmail.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Business name and support email are required",
        },
        { status: 400 },
      );
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supportEmail.trim())
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid support email",
        },
        { status: 400 },
      );
    }

    // Connect to MongoDB
    await connectDb();

    // Create or update settings
    const settings = await Settings.findOneAndUpdate(
      { ownerId },
      {
        $set: {
          businessName: businessName.trim(),
          supportEmail: supportEmail.trim().toLowerCase(),
          knowledge,
        },
        $setOnInsert: {
          ownerId,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    return NextResponse.json(
      {
        success: true,
        message: "Settings saved successfully",
        data: settings,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Settings API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save settings",
      },
      { status: 500 },
    );
  }
}
