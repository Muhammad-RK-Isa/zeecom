import { Link, useLocation } from "@tanstack/react-router"
import type {
  LucideIcon
} from "lucide-react"
import {
  ChevronRight,
  Command,
  Layers3,
  Package,
  Settings,
  ShoppingCart,
  UsersRound,
} from "lucide-react"
import * as React from "react"
import { NavUser } from "~/components/root-sidebar/nav-user"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "~/components/ui/sidebar"
import type { FileRoutesByFullPath } from '../../routeTree.gen'

interface NavItem {
  title: string
  path: keyof FileRoutesByFullPath
  icon: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    path: keyof FileRoutesByFullPath
  }[]
}

export function RootSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()

  const navLinks: NavItem[] = [
    {
      title: "Orders",
      path: "/orders",
      icon: ShoppingCart,
    },
    {
      title: "Products",
      path: "/products",
      icon: Package,
      items: [
        {
          title: "Collections",
          path: "/collections",
        },
        {
          title: "Categories",
          path: "/categories",
        }
      ]
    },
    {
      title: "Inventory",
      path: "/inventory",
      icon: Layers3,
    },
    {
      title: "Customers",
      path: "/customers",
      icon: UsersRound,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings,
      items: [
        {
          title: "Store",
          path: "/settings/store",
        },
        {
          title: "Users",
          path: "/settings/users",
        },
        {
          title: "Profile",
          path: "/settings/profile",
        }
      ]
    }
  ]

  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ZECOM</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navLinks.map((item) => {
              if (!item.items)
                return (
                  <SidebarMenuItem key={item.title}>
                    <Link to={item.path}>
                      <SidebarMenuButton
                        isActive={location.pathname === item.path}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                )
              return (
                <Collapsible key={item.title} asChild>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <Link to={item.path} className="group/collapsible">
                        <SidebarMenuButton
                          tooltip={item.title}
                          isActive={location.pathname === item.path}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </Link>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={location.pathname === subItem.path}>
                              <Link to={subItem.path}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
