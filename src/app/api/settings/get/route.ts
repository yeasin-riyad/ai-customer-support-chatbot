import connectDb from "@/lib/db";
import Settings from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get("ownerId");

    if (!ownerId) {
      return NextResponse.json(
        {
          success: false,
          message: "Owner ID is required",
        },
        { status: 400 },
      );
    }

    await connectDb();

    const settings = await Settings.findOne({ ownerId }).lean();

    if (!settings) {
      return NextResponse.json(
        {
          success: false,
          message: "Settings not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Settings fetched successfully",
        data: settings,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Get settings API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch settings",
      },
      { status: 500 },
    );
  }
}
