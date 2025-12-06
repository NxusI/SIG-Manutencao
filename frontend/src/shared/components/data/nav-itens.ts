import { Archive, FilePlusCorner, FolderOpen, House } from "lucide-react";

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: House,
    },
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
};
