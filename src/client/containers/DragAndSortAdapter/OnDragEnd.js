import { arrayMove } from '@dnd-kit/sortable';

export function onDragEnd(
  setItems,
  sortFunction,
  transformFunction,
  setDraggedInit,
) {
  return function (event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((draggedItems) => {
        const { oldIndex, newIndex } = sortFunction(
          draggedItems,
          active.id,
          over.id,
        );
        setDraggedInit(true);
        return arrayMove(draggedItems, oldIndex, newIndex).map(
          transformFunction,
        );
      });
    }
  };
}
