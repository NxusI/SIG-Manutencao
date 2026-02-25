import { Chamado } from "@/domain/chamado/entities/chamado.entity";
import { Card, CardTitle } from "@/shared/components/ui/card";
import { formatDateString } from "@/utils/formatters";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { User } from "lucide-react";
import { useState } from "react";
import ViewChamado from "./view-chamado";

const CardItem = ({ card, refetch }: { card: Chamado, refetch: () => void }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `card-${card.idChamado}`,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-md p-3 shadow-sm text-sm
        ${isDragging ? "opacity-0" : "opacity-100"}
        cursor-grab hover:bg-gray-50 active:cursor-grabbing`}
        onClick={() => setShowModal(true)}
    >
      <CardTitle>
        [{card.idChamado}] - {card.titulo.toUpperCase()}
      </CardTitle>
      <div className="flex gap-3 text-xs text-muted-foreground items-center">
        <button>
          <User size={15} />
        </button>
        <span>{formatDateString(card.dataSolicitacao)}</span>
      </div>

      {showModal && card && (
        <ViewChamado
          chamado={card}
          onClose={() => setShowModal(false)}
          showModal={showModal}
          refetch={refetch}
        />
      )}
    </Card>
  );
};

export default CardItem;
