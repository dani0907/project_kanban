import React, { useState } from 'react';
import { DragDropContext,Droppable,Draggable } from '@hello-pangea/dnd';


const KanbanCard = ({ card, index }) => {
  // 우선순위에 따른 무채색 보더 처리
  const getPriorityStyle = (prio) => {
    switch (prio) {
      case 'High': return 'border-l-4 border-black';
      case 'Medium': return 'border-l-4 border-gray-400';
      case 'Low': return 'border-l-4 border-gray-200';
      default: return 'border-l-4 border-transparent';
    }
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) =>(
      <div ref = {provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        ...provided.draggableProps.style,
        opacity: snapshot.isDragging ? 0.8 : 1
      }}
      className={`bg-white p-5 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] mb-4 hover:shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-shadow duration-300 cursor-grab active:cursor-grabbing ${getPriorityStyle(card.priority)}`}>
        <div className="flex justify-between items-start mb-3">
          <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
            {card.priority}
          </span>
          <button className="text-gray-300 hover:text-black transition-colors">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        <h3 className="text-sm font-medium text-gray-800 leading-snug mb-3">{card.title}</h3>
        <div className="flex flex-wrap gap-2">
          {card.tags?.map((tag, index) => (
            <span key={index} className="bg-gray-50 border border-gray-100 text-gray-500 px-2 py-0.5 rounded text-[11px]">
              {tag}
            </span>
          ))}
        </div>
      </div>
      )}
    </Draggable>
  );
};

const KanbanColumn = ({ title, cards, columnId }) => {
  return (
    <div className="w-[320px] flex-shrink-0 flex flex-col h-full max-h-screen">
      <div className="flex items-center justify-between px-2 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-black tracking-tight">{title}</h2>
          <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {cards.length}
          </span>
        </div>
        <button className="text-gray-400 hover:text-black transition-colors">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      <Droppable droppableId={columnId}>
        {(provided) => (
        <div {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex-1 overflow-y-auto px-1 custom-scrollbar">
          {cards.map((card, index) => (
            <KanbanCard key={card.id} card = {card} index={index}  />
          ))}
          {provided.placeholder}
        </div>
        )}
      </Droppable>
    </div>
  );
};

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

    // 영역 밖으로 던졌거나 제자리에 두면 무시
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
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      {/* Header */}
      <header className="border-b border-gray-100 px-10 py-6 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <h1 className="text-xl font-black tracking-tighter">KANBAN.</h1>
        <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
          <button className="hover:text-black">Boards</button>
          <button className="hover:text-black">Members</button>
          <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">D</div>
        </div>
      </header>

      {/* Main Board Area */}
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
    </div>
  );
};

export default KanbanBoard;