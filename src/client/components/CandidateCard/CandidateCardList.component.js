import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CandidateCardList.style.css';
import DeleteIcon from './SvgIcon.component';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const CardListItem = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.candidate.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className={`card-display ${props.variant}`}>
        <div className={`delete-icon-display ${props.display}`}>
          <DeleteIcon />
        </div>
        <li>
          <div className="card-container">
            <div className="card-title">
              <p>{props.candidate.name}</p>
            </div>

            <div>
              <span>&#8942;</span>
              <span>&#8942;</span>
            </div>
          </div>
        </li>
      </div>
    </div>
  );
};

const CardList = ({ variant, candidateList, display }) => {
  const [items, setItems] = useState(candidateList);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul>
          {items.map((candidate) => (
            <CardListItem
              key={candidate.id}
              id={candidate.id}
              candidate={candidate}
              variant={variant}
              display={display}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
};
CardList.propTypes = {
  display: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  candidateList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
};
CardListItem.defaultProps = {
  name: 'Standard Name',
  candidate: [],
};
CardListItem.propTypes = {
  name: PropTypes.string,
  candidate: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};
export default CardList;
