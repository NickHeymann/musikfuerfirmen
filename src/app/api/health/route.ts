/**
 * Health Check API Route
 * Used by Docker healthcheck and monitoring tools
 */

import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Basic health check - can be extended with DB checks, etc.
    return NextResponse.json(
      {
        status: "healthy",
        timestamp: new Date().toISOString(),
        service: "musikfuerfirmen",
        version: process.env.npm_package_version || "1.0.0",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}
