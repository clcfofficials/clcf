import { redirect } from 'next/navigation';

export default function AdminPage() {
  // This page just redirects to the login page by default.
  // The middleware will handle protecting the dashboard.
  redirect('/admin/login');
}
