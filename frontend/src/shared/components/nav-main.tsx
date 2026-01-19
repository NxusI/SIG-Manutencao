import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/shared/components/ui/sidebar";
import { MenuItem } from "../types/components.types";
import { useAuth } from "@/modules/auth/providers/auth-context";
import { TipoUsuario } from "@/domain/usuario/entities/usuario.entity";

function filterMenuByPermission(
  items: MenuItem[],
  tipoUsuario?: TipoUsuario
): MenuItem[] {
  return items
    .map((item) => {
      const hasPermission =
        !item.permission ||
        item.permission.length === 0 ||
        (tipoUsuario && item.permission.includes(tipoUsuario));

      if (!hasPermission) return null;

      if (item.items && item.items.length > 0) {
        const filteredChildren = filterMenuByPermission(
          item.items,
          tipoUsuario
        );

        if (filteredChildren.length === 0) return null;

        return {
          ...item,
          items: filteredChildren,
        };
      }

      return item;
    })
    .filter(Boolean) as MenuItem[];
}

export function NavMain({
  items,
}: {items: MenuItem[]}) {
  const { userType } = useAuth();
  const filteredItems = filterMenuByPermission(items, userType as TipoUsuario ?? undefined);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {filteredItems.map((item) => {
          const hasSubItems = item.items && item.items.length > 0;

          if (!hasSubItems) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                >
                  <a href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible
              key={item.title}
              asChild
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
