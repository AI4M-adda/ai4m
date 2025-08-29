import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ComponentSidebar } from "./_lib/component/component-sidebar";

export default function UIComponentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main id="ui-component">
      <SidebarProvider>
        <ComponentSidebar />
        <SidebarInset>
          <section id="ui-component-section">{children}</section>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
