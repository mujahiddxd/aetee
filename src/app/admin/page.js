import { redirect } from 'next/navigation';

/**
 * /admin root page — redirects to the dashboard.
 * This is needed because the admin subdomain rewrites '/' to '/admin',
 * but the actual admin UI lives at '/admin/dashboard'.
 */
export default function AdminRoot() {
  redirect('/admin/dashboard');
}
