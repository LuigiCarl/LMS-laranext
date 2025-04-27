import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  
  export function Breadcrumbs() {
    return (
      <div className="flex justify-center py-4">
        <Breadcrumb>
          <BreadcrumbList className="list-none flex items-center gap-2">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="no-underline hover:underline text-gray-700 dark:text-gray-300 transition-colors"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/about"
                className="no-underline hover:underline text-gray-700 dark:text-gray-300 transition-colors"
              >
                About
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/services"
                className="no-underline hover:underline text-gray-700 dark:text-gray-300 transition-colors"
              >
                Services
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    );
  }
  