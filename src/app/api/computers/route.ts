import { NextResponse } from "next/server";

// POST /api/computers - Create a new computer
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { os = "linux", cpu = 1, ram = "4gb" } = body;

    // TODO: provision actual VM
    const computer = {
      id: crypto.randomUUID(),
      os,
      cpu,
      ram,
      status: "running",
      created_at: new Date().toISOString(),
      endpoints: {
        screenshot: `/api/computers/{id}/screenshot`,
        actions: `/api/computers/{id}/actions`,
        bash: `/api/computers/{id}/bash`,
      },
    };

    return NextResponse.json(computer, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// GET /api/computers - List all computers
export async function GET() {
  // TODO: fetch from database
  return NextResponse.json({ computers: [], total: 0 });
}
