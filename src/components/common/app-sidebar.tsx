"use client";

import { Home, Search, ShieldAlert } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

const menuItems = [
  { name: "Dashboard", icon: Home, href: "/" },
  { name: "Explorer", icon: Search, href: "/explorer" },
  { name: "Battle", icon: ShieldAlert, href: "/battle" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-slate-200">
      <SidebarHeader className="bg-[#ac6a6a] p-6">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold text-white ">
            Diksfa Achmad Adyasandi
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-[#ac6a6a] px-2 ">
        <SidebarMenu className="gap-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  className={`h-11 px-4 transition-all rounded-xl ${
                    isActive
                      ? "bg-white/40 text-white shadow-sm hover:bg-white/40 hover:text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Link
                    href={item.href}
                    className="flex items-center justify-between w-full group"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        className={`h-4 w-4 ${isActive ? "opacity-100" : "opacity-50"}`}
                      />
                      <span className="font-semibold tracking-tight">
                        {item.name}
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
