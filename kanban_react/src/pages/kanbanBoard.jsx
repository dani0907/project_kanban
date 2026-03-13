import { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import KanbanColumn from '../component/kanbanColumn';
import styles from './kanbanBoard.module.scss';

const KanbanBoard = () => {
  const [data, setData] = useState({
    todo: { title: 'To Do', cards: [
      { id: 't1', title: 'Define Project Architecture', tags: ['Backend', 'Spring'], priority: 'High' },
      { id: 't2', title: 'Design System Guidelines', tags: ['UI/UX'], priority: 'Medium' },
      { id: 't3', title: 'Database Schema Design', tags: ['SQL', 'PostgreSQL'], priority: 'High' },
    ]},
    inProgress: { title: 'In Progress', cards: [
      { id: 't4', title: 'Kanban Frontend Implementation', tags: ['React', 'Tailwind'], priority: 'High' },
      { id: 't5', title: 'Setup GitHub Repository', tags: ['Git'], priority: 'Low' },
    ]},
    done: { title: 'Done', cards: [
      { id: 't6', title: 'Project Initialization', tags: ['Vite'], priority: 'Low' },
    ]},
  });

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const startCol = data[source.droppableId];
    const finishCol = data[destination.droppableId];

    if (startCol === finishCol) {
      const newCards = Array.from(startCol.cards);
      const [item] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, item);
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
      [destination.droppableId]: { ...finishCol, cards: finishCards },
    });
  };

  const totalDone = data.done?.cards.length ?? 0;
  const totalCards = Object.values(data).reduce((a, c) => a + c.cards.length, 0);

  function addCardData(colId, newCard){
    console.log(`add column Id :: ${colId}`);
    console.log(`add new Card :: ${JSON.stringify(newCard)}`);
    
    if(newCard.tags.length == 0){
      alert('please enter the tags');
      return;
    }
    setData({
      ...data,
      [colId]:{...data[colId], cards:[...data[colId].cards,newCard]}
    });
    console.log('data :: '+JSON.stringify(data));
    return true;
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className={styles.board}>
        <div className={styles.board_heading}>
          <h1 className={styles.board_title}>My Kanban Board ✨</h1>
          <p className={styles.board_subtitle}>{totalCards} tasks · {totalDone} done</p>
        </div>

        <div className={styles.board_columns}>
          {Object.entries(data).map(([colId, col]) => (
            <KanbanColumn key={colId} columnId={colId} title={col.title} cards={col.cards} addCardData={addCardData} />
          ))}
          <div className={styles['board_add-column']}>+ Add Column</div>
        </div>
      </main>
    </DragDropContext>
  );
};

export default KanbanBoard;
