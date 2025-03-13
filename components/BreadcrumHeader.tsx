"use client"

import React from 'react'
import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbList
} from "@/components/ui/breadcrumb";
import { MobileSidebar } from "@/components/Sidebar";

const BreadcrumHeader = () => {
    const pathName = usePathname();
    const paths = pathName === "/" ? [""] : pathName.split("/").filter(Boolean);

    return (
        <div className="flex items-center flex-start">
            <MobileSidebar />
            <Breadcrumb>
                <BreadcrumbList>
                    {paths.map((path, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/${path}`} className="capitalize">
                                    {path === "" ? "Home" : path}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {index < paths.length - 1 && (
                                <BreadcrumbSeparator>
                                    /
                                </BreadcrumbSeparator>
                            )}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}
export default BreadcrumHeader
