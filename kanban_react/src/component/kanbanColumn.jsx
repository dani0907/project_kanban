import { DragDropContext,Droppable,Draggable } from '@hello-pangea/dnd';
import KanbanCard from '../component/kanbanCard';

function KanbanColumn({ title, cards, columnId }){
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
}

export default KanbanColumn;