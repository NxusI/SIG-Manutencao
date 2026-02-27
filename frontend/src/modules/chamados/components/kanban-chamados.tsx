import { useEffect, useState } from "react";
import { Column } from "../types/chamados.types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  rectIntersection,
} from "@dnd-kit/core";

import { defaultDropAnimationSideEffects } from "@dnd-kit/core";
import ColumnKanban from "./column";
import { STATUS_COLUMNS } from "../data/status";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useUpateChamado } from "../hooks/use-chamado";

const KanbanChamados = ({
  columns,
  loading,
  refetch,
}: {
  columns: Column[];
  loading: boolean;
  refetch: () => void;
}) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [internalColumns, setInternalColumns] = useState<Column[]>(columns);

  const { update } = useUpateChamado();

  useEffect(() => {
    setInternalColumns([...columns]);
  }, [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveCardId(null);
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const sourceColumn = internalColumns.find((col) =>
      col.cards.some((card) => `card-${card.idChamado}` === activeId),
    );

    const destinationColumn = internalColumns.find(
      (col) => `column-${col.id}` === overId,
    );

    if (!sourceColumn || !destinationColumn) return;
    if (sourceColumn.id === destinationColumn.id) return;

    const draggedCard = sourceColumn.cards.find(
      (card) => `card-${card.idChamado}` === activeId,
    );

    if (!draggedCard) return;

    const updatedColumns = internalColumns.map((column) => {
      if (column.id === sourceColumn.id) {
        return {
          ...column,
          cards: column.cards.filter(
            (card) => card.idChamado !== draggedCard.idChamado,
          ),
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

    setInternalColumns(updatedColumns);

    update({
      id: draggedCard.idChamado,
      data: { idStatus: Number(destinationColumn.id) },
    });
  }

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragEnd={handleDragEnd}
      onDragStart={(event) => setActiveCardId(event.active.id as string)}
      sensors={sensors}
    >
      <div className="flex gap-2 overflow-x-auto items-start">
        {loading ? (
          <>
            {STATUS_COLUMNS.map((s) => (
              <div className="grid gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="bg-secondary/20 w-70 h-30 animate-pulse"
                  />
                ))}
              </div>
            ))}
          </>
        ) : (
          <>
            {internalColumns.map((column) => (
              <ColumnKanban refetch={refetch} key={column.id} column={column} />
            ))}
          </>
        )}
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
            <div className="bg-white rounded-md p-3 shadow-lg text-sm h-20">
              {
                columns
                  .flatMap((col) => col.cards)
                  .find((card) => String(card.idChamado) === activeCardId)
                  ?.titulo
              }
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default KanbanChamados;
