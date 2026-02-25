import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Column } from "../types/chamados.types";
import CardItem from "./card";

const columnColors: Record<string, string> = {
  blue: "bg-blue-600",
  green: "bg-green-600",
  yellow: "bg-yellow-600",
  orange: "bg-orange-600",
  red: "bg-red-600",
};

const ColumnKanban = ({ column, refetch }: { column: Column, refetch: () => void }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${column.id}`,
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-w-[280px] max-w-[280px] 
    ${isOver ? "bg-blue-100" : "bg-gray-200"} 
    rounded-lg p-3 flex flex-col gap-3 transition-colors`}
    >
      <h3
        className={`text-xs font-semibold uppercase text-white tracking-wide p-2 rounded-md ${
          columnColors[column.color] ?? "bg-gray-200"
        }`}
      >
        {column.title}
      </h3>

      <SortableContext
        items={column.cards.map((card) => `card-${card.idChamado}`)}
        strategy={verticalListSortingStrategy}
      >
        {column.cards.map((card) => (
          <CardItem refetch={refetch} key={card.idChamado} card={card} />
        ))}
      </SortableContext>
    </div>
  );
};

export default ColumnKanban;
