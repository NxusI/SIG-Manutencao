import { Button } from "@/shared/components/ui/button";
import { CardTitle } from "@/shared/components/ui/card";
import { Table, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Plus } from "lucide-react";

const Usuarios = () => {
  return (
    <div className="grid gap-5">
      <div className="flex justify-between items-center">
        <CardTitle className="text-xl">Gerenciar Usuários</CardTitle>
        <Button>
          <Plus />
        </Button>
      </div>
      <Table>
        <TableHeader>
            <TableRow>
                
            </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
};

export default Usuarios;
