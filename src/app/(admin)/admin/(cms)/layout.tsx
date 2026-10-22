import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-session";
import { listPages } from "@/lib/content/store";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const dynamic = "force-dynamic";

export default async function CmsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  return (
    <div className="flex min-h-screen">
      <AdminSidebar pages={listPages()} />
      <div className="flex-1 overflow-x-hidden">{children}</div>
    </div>
  );
}
