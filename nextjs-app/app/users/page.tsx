import { LibrarySidebar } from "@/components/library-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { UsersManagement } from "@/components/users-management"

export default function UsersPage() {
  return (
    <SidebarProvider>
      <LibrarySidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title={"User management"} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <UsersManagement />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
