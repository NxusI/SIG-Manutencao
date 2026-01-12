import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "../types/chamados.types";

const CardItem = ({ card }: { card: Card }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-md p-3 shadow-sm text-sm
        ${isDragging ? "opacity-0" : "opacity-100"}
        cursor-grab hover:bg-gray-50 active:cursor-grabbing`}
    >
      {card.title}
    </div>
  );
};

export default CardItem;
