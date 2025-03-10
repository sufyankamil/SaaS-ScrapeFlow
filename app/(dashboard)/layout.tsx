import React from "react";
import {Separator} from "@/components/ui/separator";
import DesktopSideBar from "@/components/Sidebar";
import BreadcrumHeader from "@/components/BreadcrumHeader";
import {ModeToggle} from "@/components/ThemeModeToggle";
import {SignedIn, UserButton} from "@clerk/nextjs";

function Layout({children}: { children: React.ReactNode }) {
    return (<div className="flex h-screen">
        <DesktopSideBar/>
            <div className="flex flex-col flex-1 min-h-screen">
                <header className="flex items-center justify-between px-4 py-2 bg-accent-background">
                    <BreadcrumHeader />
                    <div className="gap-4 flex items-center justify-end">
                        <ModeToggle />
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </header>
                <Separator/>
                <div className="overflow-auto">
                    <div className="flex-1 container py-4 text-accent-foreground">
                        {children}
                    </div>
                </div>
            </div>
        </div>);
}

export default Layout;