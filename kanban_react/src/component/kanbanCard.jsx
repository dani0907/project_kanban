import { DragDropContext,Droppable,Draggable } from '@hello-pangea/dnd';
function KanbanCard({ card, index }){
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
}

export default KanbanCard;