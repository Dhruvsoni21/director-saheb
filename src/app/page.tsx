import { getProjects } from '@/lib/store';
import ClientHome from './ClientHome';

// Force dynamic since we read from local filesystem and want updates to reflect 
export const dynamic = 'force-dynamic';

export default async function Page() {
  const projects = await getProjects();
  return <ClientHome projects={projects} />;
}
