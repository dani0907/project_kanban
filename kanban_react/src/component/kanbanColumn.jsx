import { Droppable } from '@hello-pangea/dnd';
import { useState } from 'react';
import KanbanCard from './kanbanCard';
import styles from './kanbanColumn.module.scss';
import newCardStyles from './newCard.module.scss';

const PRIORITIES = ['High', 'Medium', 'Low'];

function NewCard({ columnId, onCancel,addCardData ,setAddCard}) {
  const [title, setTitle] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [priority, setPriority] = useState('Low');

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (i) => setTags(tags.filter((_, idx) => idx !== i));

  const makeCardData=()=>{
    console.log('call makeCardData function');
    const cardData = {
      id:'id0',
      title : title,
      tags : tags,
      priority : priority
    }
    console.log(`cardData :: ${JSON.stringify(cardData)}`);
    if(addCardData(columnId,cardData)){
      setTitle('');
      setTagInput('');
      setTags([]);
      setPriority('Low');
      setAddCard(false);

    } else {
      alert('fail to save. please try again.');
    }
  }
  return (
    <div className={newCardStyles.newcard}>
      <span className={newCardStyles.newcard_label}>New Card</span>

      <div className={newCardStyles.newcard_priorities}>
        {PRIORITIES.map((p) => (
          <button
            key={p}
            onClick={() => setPriority(p)}
            className={[
              newCardStyles['newcard_priority-btn'],
              priority === p ? newCardStyles['newcard_priority-btn-active'] : '',
            ].join(' ')}
          >
            {p}
          </button>
        ))}
      </div>

      <textarea
        className={newCardStyles.newcard_textarea}
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className={newCardStyles['newcard_tag-list']}>
        {tags.map((tag, i) => (
          <span key={i} className={newCardStyles['newcard_tag-chip']}>
            #{tag}
            <button onClick={() => removeTag(i)}>×</button>
          </span>
        ))}
      </div>

      <input
        type="text"
        className={newCardStyles['newcard_tag-input']}
        placeholder="Press enter to add tags"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleTagKeyDown}
      />

      <div className={newCardStyles.newcard_actions}>
        <button className={newCardStyles['newcard_cancel-btn']} onClick={onCancel}>
          Cancel
        </button>
        <button className={newCardStyles['newcard_save-btn']} onClick={makeCardData}>
          Save Card
        </button>
      </div>
    </div>
  );
}

function KanbanColumn({ title, cards, columnId ,addCardData}) {
  const [addCard, setAddCard] = useState(false);

  return (
    <div className={[styles.column, styles[`column-${columnId}`]].join(' ')}>
      <div className={styles.column_header}>
        <div className={styles['column_header-left']}>
          <span className={styles.column_dot} />
          <h2 className={styles.column_title}>{title}</h2>
          <span className={styles.column_count}>{cards.length}</span>
        </div>
        <button className={styles['column_add-btn']} onClick={() => setAddCard(!addCard)}>
          +
        </button>
      </div>

      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`${styles.column_cards} custom-scrollbar`}
          >
            {addCard && <NewCard addCardData={addCardData} setAddCard={setAddCard} columnId={columnId} onCancel={() => setAddCard(false)} />}
            {cards.map((card, index) => (
              <KanbanCard key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <button className={styles['column_add-card']} onClick={() => setAddCard(!addCard)}>
        + Add card
      </button>
    </div>
  );
}

export default KanbanColumn;
