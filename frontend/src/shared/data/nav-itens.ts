import { TipoUsuario } from "@/domain/auth/params/login.params";
import { MenuItem } from "@/shared/types/components.types";
import { Archive, FilePlusCorner, FolderOpen, House } from "lucide-react";

export const data: MenuItem[] = [
  {
    title: "Home",
    url: "/home",
    icon: House,
    permission: [],
  },
  {
    title: "Cadastrar",
    url: "#",
    icon: FilePlusCorner,
    items: [
      {
        title: "Clientes",
        url: "/cadastrar/cliente",
        permission: [],
      },
      {
        title: "Usuários",
        url: "/cadastrar/usuario",
        permission: [TipoUsuario.GESTOR],
      },
      {
        title: "Empresa",
        url: "/cadastrar/empresa",
        permission: [TipoUsuario.GESTOR],
      },
    ],
  },
  {
    title: "Chamados",
    url: "/chamados",
    icon: FolderOpen,
    permission: [],
  },
  {
    title: "Ordem de Serviço",
    url: "/ordem-servico",
    icon: Archive,
    permission: [],
  },
];
