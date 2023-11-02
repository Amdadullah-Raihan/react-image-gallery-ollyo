"use client";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const DrageNdrop = () => {
  const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7]);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return; // No change in position
    }

    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setList(items);
  };

  return (
    <div className="w-full h-full bg-gray-200">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-full h-full flex flex-col items-center justify-center p-8"
            >
              {list.map((item, index) => (
                <Draggable
                  key={item.toString()}
                  draggableId={item.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="border border-rose-500 rounded-lg px-16 py-4 flex mb-4 items-center justify-center"
                    >
                      {item}
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DrageNdrop;
