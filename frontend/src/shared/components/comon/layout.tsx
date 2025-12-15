import { AppSidebar } from "@/shared/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/shared/components/ui/sidebar";
import { SiteHeader } from "./header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
