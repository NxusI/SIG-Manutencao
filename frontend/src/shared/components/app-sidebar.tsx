import * as React from "react"
import {
  Archive,
  Bot,
  FilePlusCorner,
  FolderOpen,
} from "lucide-react"

import { NavMain } from "@/shared/components/nav-main"
import { NavUser } from "@/shared/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/shared/components/ui/sidebar"
import Image from "next/image"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Cadastrar",
      url: "#",
      icon: FilePlusCorner,
      items: [
        {
          title: "Clientes",
          url: "/cadastrar/cliente",
        },
        {
          title: "Usuários",
          url: "/cadastrar/usuario",
        },
      ],
    },
    {
      title: "Chamados",
      url: "/chamados",
      icon: FolderOpen,
    },
    {
      title: "Ordem de Serviço",
      url: "/ordem-servico",
      icon: Archive,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex justify-center items-center mb-5 mt-3">
        <Image
          alt="Logo"
          src={open ? "/assets/logo.png" : "/assets/icon.png"}
          width={250}
          height={150}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
