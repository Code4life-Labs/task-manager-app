import { SidebarProvider, SidebarTrigger } from "src/components/ui/sidebar";
import { AppSidebar } from "src/components/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full overflow-hidden">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
