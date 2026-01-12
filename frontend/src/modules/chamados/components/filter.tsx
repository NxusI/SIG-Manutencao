import { Button } from "@/shared/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { ListFilter } from "lucide-react";

const FilterChamados = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="hover:scale-105"
        >
          <ListFilter /> Filtros
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-screen sm:w-[700px]">

      </PopoverContent>
    </Popover>
  );
};

export default FilterChamados;
