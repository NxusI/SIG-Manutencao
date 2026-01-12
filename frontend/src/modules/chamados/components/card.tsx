import { Chamado } from "@/domain/chamado/entities/chamado.entity";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const CardItem = ({ card }: { card: Chamado }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.idChamado,
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
      {card.titulo}
    </div>
  );
};

export default CardItem;
