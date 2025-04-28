import { AppSidebar } from "@/components/app-sidebar"
import Chart from "@/components/chart"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
    {/* Chart card */}
    <div className="relative rounded-xl bg-muted/50 aspect-[4/3] md:aspect-[5/4]">
      <div className="absolute inset-0">
        <Chart />
      </div>
    </div>

    {/* Placeholder card 1 */}
    <div className="rounded-xl bg-muted/50 aspect-[4/3] md:aspect-[5/4]" />

    {/* Placeholder card 2 */}
    <div className="rounded-xl bg-muted/50 aspect-[4/3] md:aspect-[5/4]" />
  </div>

  {/* Bottom block */}
  <div className="min-h-[400px] md:min-h-[300px] flex-1 rounded-xl bg-muted/50" />
</div>

      </SidebarInset>
    </SidebarProvider>
  )
}
