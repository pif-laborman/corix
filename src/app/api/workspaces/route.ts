import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { NextResponse } from "next/server";

// GET /api/workspaces - List all workspaces
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: workspaces } = await supabase
    .from("workspaces")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: true });

  return NextResponse.json({ workspaces: workspaces || [] });
}

// POST /api/workspaces - Create a new workspace
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const name = body.name?.trim();
    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const admin = createAdminClient();
    const { data: workspace, error } = await admin
      .from("workspaces")
      .insert({ user_id: user.id, name })
      .select("*")
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "A workspace with that name already exists" }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(workspace, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
