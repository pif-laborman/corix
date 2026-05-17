@AGENTS.md

# Vessel - Cloud Desktops for AI Agents

## What this is
Orgo competitor. API-first cloud desktop infrastructure that lets developers spin up virtual machines, connect AI agents, and let them control computers programmatically (screenshot, click, type, bash, python, files).

## Architecture

### Frontend (Vercel)
- Next.js 16, Tailwind 4, Rekon design system (light theme, DM Sans + Inter + Fragment Mono)
- Dashboard at /dashboard with sidebar thumbnails, inline desktop viewer, unified settings modal
- Computer URLs: /dashboard/computers/{id}
- Auth: Supabase (Google OAuth + email magic link)
- DESIGN.md has the full token reference

### Backend (VPS at meetpif.com)
- **vessel-orchestrator** (port 8421, systemd) - manages Docker containers, proxies to agents
- **vessel-api** (port 8422, systemd) - public API with auth, rate limiting, Supabase integration
- **vessel-ws-terminal** (port 8423, systemd) - WebSocket terminal for interactive shell
- **nginx proxy**: /vessel-api/ -> 8422, /vessel-ws/ -> 8423
- **env file**: /etc/vessel-api.env (VESSEL_ORCHESTRATOR_TOKEN, VESSEL_SUPABASE_URL, VESSEL_SUPABASE_SERVICE_KEY, VESSEL_INTERNAL_TOKEN)
- **cleanup cron**: every 5 min, kills containers older than 30 min

### Container image (vessel-desktop:latest)
- Debian bookworm + XFCE + Xvfb + Firefox + Python + Node.js + git
- In-container agent on port 8420 (screenshot, click, drag, type, key, scroll, wait, bash, python, file ops)
- Entrypoint cleans stale X11 locks before starting Xvfb (critical for docker restart)
- Resource limits: max 1 CPU / 2 GB RAM per container, max 2 concurrent, PID limit 256

### Database (Supabase project: vessel, ref: zyycljctvwquirciolfl)
- **profiles**: auto-created on signup via trigger, tracks plan + limits
- **workspaces**: groups computers, has icon_url
- **api_keys**: vsl_ prefix, SHA-256 hashed, key_prefix for display
- **computers**: 17 columns including container_id, hostname, auto_stop_minutes
- **computer_actions**: audit log (not yet wired to record actions)
- All tables have RLS scoped by user_id

### Credentials
- Supabase Management API: Nango connector (supabase-management, connection 02d7a168)
- GCP service account: /root/.gcp/vessel-sa.json (vessel-infra@vessel-496613, Owner role)
- Google OAuth client: 607757625794-da5q70gteo8k9u1sf4p4uurmj6djn1pu.apps.googleusercontent.com
- Vercel: pif-creds get Vercel, project "vessel" on piflaborman-1824s-projects
- Orchestrator token: vsl-orch-mvp-2026
- Internal token (Vercel to VPS): vsl-internal-mvp-2026

## API surface (30+ endpoints)
- Workspaces: create, get, list, delete
- Computers: create, get, list, delete, clone, resize, move
- Lifecycle: start, stop, restart, auto-stop (get/set)
- Actions: screenshot (?format=base64), click, drag, type, key, scroll, wait
- Execution: bash, python
- Files: list, upload, download, delete
- Streaming: WebSocket terminal
- Auth: vsl_ API keys with SHA-256 lookup, rate limiting (1000/day starter)

## Still deferred
- Events WebSocket (12 event types: window, clipboard, file, process, idle, audio)
- Audio WebSocket streaming (PCM)
- RTMP live video streaming
- Published SDK packages (PyPI vessel-sdk, npm @vessel/sdk)
- Custom domain (vesselcompute.com available)
- GitHub OAuth (needs GitHub OAuth app setup in Supabase)
- Stripe billing integration
- Container image templates (pre-configured environments)
- computer_actions audit table: exists but actions not yet recorded to it
- Auto-stop enforcement: field exists, endpoints exist, but no background job actually stops idle containers

## Key files
- compute/orchestrator.js - Docker container lifecycle
- compute/api-server.js - public API with auth + rate limiting
- compute/ws-terminal.js - WebSocket terminal
- compute/agent/server.js - in-container agent (runs inside each VM)
- compute/docker/Dockerfile + entrypoint.sh - container image
- compute/vessel-cleanup.sh - zombie container killer (cron)
- src/app/dashboard/DashboardShell.tsx - main dashboard component
- src/app/dashboard/UnifiedSettings.tsx - settings modal
- src/app/docs/page.tsx - API documentation
