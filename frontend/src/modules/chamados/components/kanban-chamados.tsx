import { useState } from "react";
import { Column } from "../types/chamados.types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  closestCorners,
} from "@dnd-kit/core";
import { defaultDropAnimationSideEffects } from "@dnd-kit/core";
import ColumnKanban from "./column";

const KanbanChamados = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 1,
      title: "INICIADO",
      color: "blue",
      cards: [],
    },
    {
      id: 2,
      title: "EM ANDAMENTO",
      color: "yellow",
      cards: [],
    },
    {
      id: 3,
      title: "PENDENTE",
      color: "orange",
      cards: [],
    },
    {
      id: 4,
      title: "FINALIZADO",
      color: "green",
      cards: [],
    },
    {
      id: 5,
      title: "CANCELADO",
      color: "red",
      cards: [],
    },
  ]);

  function findColumnByCardId(cardId: string, cols: Column[]) {
    return cols.find((col) => col.cards.some((card) => String(card.idChamado) === cardId));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveCardId(null);

    if (!over) return;

    setColumns((prev) => {
      const sourceColumn = findColumnByCardId(active.id as string, prev);

      const destinationColumn =
        findColumnByCardId(over.id as string, prev) ??
        prev.find((col) => col.id === over.id);

      if (!sourceColumn || !destinationColumn) return prev;
      if (sourceColumn.id === destinationColumn.id) return prev;

      const draggedCard = sourceColumn.cards.find(
        (card) => card.idChamado === active.id
      );

      if (!draggedCard) return prev;

      return prev.map((column) => {
        if (column.id === sourceColumn.id) {
          return {
            ...column,
            cards: column.cards.filter((card) => card.idChamado !== draggedCard.idChamado),
          };
        }

        if (column.id === destinationColumn.id) {
          return {
            ...column,
            cards: [...column.cards, draggedCard],
          };
        }

        return column;
      });
    });
  }

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragStart={(event) => setActiveCardId(event.active.id as string)}
    >
      <div className="flex gap-2 overflow-x-auto items-start">
        {columns.map((column) => (
          <ColumnKanban key={column.id} column={column} />
        ))}
        <DragOverlay
          dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: {
                active: { opacity: "0.5" },
              },
            }),
          }}
        >
          {activeCardId ? (
            <div className="bg-white rounded-md p-3 shadow-lg text-sm">
              {
                columns
                  .flatMap((col) => col.cards)
                  .find((card) => String(card.idChamado) === activeCardId)?.titulo
              }
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default KanbanChamados;
