import React, { useState } from 'react';
import { DragDropContext,Droppable,Draggable } from '@hello-pangea/dnd';

import KanbanColumn from '../component/kanbanColumn';


const KanbanBoard = () => {
  const [data,setData]  =  useState({
   'todo' : { title: 'To Do', cards: [
      { id : "t1", title: 'Define Project Architecture', tags: ['Backend', 'Spring'], priority: 'High' },
      { id : "t2", title: 'Design System Guidelines', tags: ['UI/UX'], priority: 'Medium' },
      { id : "t3", title: 'Database Schema Design', tags: ['SQL', 'PostgreSQL'], priority: 'High' }
    ]},
   'inProgress' : { title: 'In Progress', cards: [
      { id : "t4",title: 'Kanban Frontend Implementation', tags: ['React', 'Tailwind'], priority: 'High' },
      { id : "t5",title: 'Setup GitHub Repository', tags: ['Git'], priority: 'Low' }
    ]},
    'done' : { title: 'Done', cards: [
      { id : "t6",title: 'Project Initialization', tags: ['Vite'], priority: 'Low' }
    ]}
  });
  const onDragEnd = (result) => {
    const { destination, source } = result;
    console.log(result);
    
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const startCol = data[source.droppableId];
    const finishCol = data[destination.droppableId];
    if(startCol ===  finishCol){
      const newCards = Array.from(startCol.cards);
      const [reorderedItem] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, reorderedItem);

      setData({ ...data, [source.droppableId]: { ...startCol, cards: newCards } });
      return;
    }
    const startCards = Array.from(startCol.cards);
    const [movedItem] = startCards.splice(source.index, 1);
    const finishCards = Array.from(finishCol.cards);
    finishCards.splice(destination.index, 0, movedItem);

    setData({
      ...data,
      [source.droppableId]: { ...startCol, cards: startCards },
      [destination.droppableId]: { ...finishCol, cards: finishCards }
    });
  };
  return (
    
      <DragDropContext onDragEnd={onDragEnd}>
        <main className="p-10 flex gap-10 h-[calc(100vh-80px)] overflow-x-auto">
          {Object.entries(data).map(([colId, col]) => (
            <KanbanColumn key={colId} columnId = {colId} title={col.title} cards={col.cards} />
          ))}
          
          {/* New Column Placeholder */}
          <div className="w-[320px] flex-shrink-0 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center group cursor-pointer hover:border-gray-300 transition-colors h-fit py-10">
            <span className="text-gray-300 font-medium group-hover:text-gray-500">+ Add Column</span>
          </div>
        </main>
      </DragDropContext>
    
  );
};

export default KanbanBoard;