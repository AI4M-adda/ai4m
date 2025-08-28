import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function UIComponentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main id="ui-component">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <section id="ui-component-section">{children}</section>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
