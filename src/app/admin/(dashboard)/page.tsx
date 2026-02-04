import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import AdminView from '@/components/Admin/AdminView';

export default async function AdminPage() {
    const authed = await isAuthenticated();

    if (!authed) {
        redirect('/admin/login');
    }

    return (
        <AdminView />
    );
}
