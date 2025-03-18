"use client";

import React from "react";
import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  MenuIcon,
  ShieldCheckIcon,
} from "lucide-react";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const routes = [
  {
    name: "Home",
    href: "",
    icon: HomeIcon,
  },
  {
    name: "WorkFlows",
    href: "workflows",
    icon: Layers2Icon,
  },
  {
    name: "Credentials",
    href: "credentials",
    icon: ShieldCheckIcon,
  },
  {
    name: "Billing",
    href: "billing",
    icon: CoinsIcon,
  },
];

function DesktopSideBar() {
  const pathName = usePathname();
  const activeRoute = routes.find((route) => pathName === `/${route.href}`);
  return (
    <div className="hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate ">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
          <Logo />
        </div>
        <div className="p-2">TODO CREDITS</div>
        <div className="flex flex-col p-2">
          {routes.map((route, index) => (
            <a
              key={index}
              href={`/${route.href}`}
              className={buttonVariants({
                variant:
                  activeRoute?.href === route.href
                    ? "sidebarActiveItem"
                    : "sidebarItem",
              })}
            >
              <route.icon className="w-5 h-5" />
              <span className="ml-4">{route.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MobileSidebar() {
  const pathName = usePathname();
  const activeRoute = routes.find((route) => pathName === `/${route.href}`);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-[400px] sm:w-[540px] space-y-4"
            side={"left"}
          >
            <Logo />
            <div className="flex flex-col gap-1">
              {routes.map((route, index) => (
                <a
                  key={index}
                  href={`/${route.href}`}
                  className={buttonVariants({
                    variant:
                      activeRoute?.href === route.href
                        ? "sidebarActiveItem"
                        : "sidebarItem",
                  })}
                >
                  <route.icon className="w-5 h-5" />
                  <span className="ml-4">{route.name}</span>
                </a>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}

export default DesktopSideBar;
