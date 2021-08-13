import { arrayMove } from '@dnd-kit/sortable';

export function dragEndHandler(setItems, sortFunction) {
  return function (event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((draggedItems) => {
        const { oldIndex, newIndex } = sortFunction(
          draggedItems,
          active.id,
          over.id,
        );

        return arrayMove(draggedItems, oldIndex, newIndex);
      });
    }
  };
}
