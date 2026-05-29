import { NextRequest, NextResponse } from 'next/server';
import { listProjects } from '@/lib/api/pinpoint-public';
import { getSiteShellData } from '@/lib/site-shell';
import { buildServicesLookup, mapPublicProjectToWorkCard } from '@/lib/utils/cms-mappers';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number(searchParams.get('page') ?? 1) || 1);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? 10) || 10));
  const sector = searchParams.get('sector')?.trim() ?? '';
  const service = searchParams.get('service')?.trim() ?? '';

  try {
    const [{ services }, projectsRes] = await Promise.all([
      getSiteShellData(),
      listProjects({
        page,
        limit,
        sectors: sector ? [sector] : [],
        services: service ? [service] : [],
      }),
    ]);

    const lookup = buildServicesLookup(services);
    const projects = projectsRes.projects.map(p => mapPublicProjectToWorkCard(p, lookup));

    return NextResponse.json({
      projects,
      pagination: projectsRes.pagination,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 502 });
  }
}
