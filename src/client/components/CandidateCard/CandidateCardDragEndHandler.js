import { arrayMove } from '@dnd-kit/sortable';

export function CandidateCardDragEndHandler(setItems) {
  return function (event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((draggedItems) => {
        const oldIndex = draggedItems.findIndex((x) => x.id === active.id);
        const newIndex = draggedItems.findIndex((x) => x.id === over.id);

        return arrayMove(draggedItems, oldIndex, newIndex);
      });
    }
  };
}
