"use client";

import React from "react";
import { appConfig } from "@/appConfig";
import { ROUTES } from "@/utils/constants";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export function AdminNavbar() {
  const pathname = usePathname();

  const getBreadcrumbSegments = (path: string) => {
    const segments = path.split('/').filter(segment => segment);
    return segments.map((segment, index) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: '/' + segments.slice(0, index + 1).join('/')
    }));
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList key="breadcrumb-list">
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={ROUTES.DASHBOARD}>
                {appConfig.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {getBreadcrumbSegments(pathname).map((segment, index) => (
              <React.Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={segment.path}>
                    {segment.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
