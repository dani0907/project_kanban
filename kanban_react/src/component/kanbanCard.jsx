import { Draggable } from '@hello-pangea/dnd';
import styles from './kanbanCard.module.scss';

const TAG_COLORS = [
  { bg: '#FFE8F0', text: '#D4547A' },
  { bg: '#E8F0FF', text: '#4A6FD4' },
  { bg: '#E8FFF0', text: '#3D9E64' },
  { bg: '#FFF5E8', text: '#C47A2A' },
  { bg: '#F5E8FF', text: '#7A4AC4' },
];

function getTagColor(tag) {
  let hash = 0;
  for (let c of tag) hash = (hash * 31 + c.charCodeAt(0)) % TAG_COLORS.length;
  return TAG_COLORS[hash];
}

const PRIORITY_COLORS = {
  High:   '#FF6B9D',
  Medium: '#FFB347',
  Low:    '#82C4A0',
};

function KanbanCard({ card, index }) {
  const accentColor = PRIORITY_COLORS[card.priority] || '#ccc';
  const priorityClass = card.priority?.toLowerCase();

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...provided.draggableProps.style }}
          className={[
            styles.card,
            styles[`card-${priorityClass}`],
            snapshot.isDragging ? styles['card-dragging'] : '',
          ].join(' ')}
        >
          <div
            className={styles.card_accent}
            style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)` }}
          />
          <div className={styles['card_priority-row']}>
            <div className={styles['card_priority-left']}>
              <span className={styles['card_priority-dot']} />
              <span className={styles['card_priority-label']}>{card.priority}</span>
            </div>
            <button className={styles['card_more-btn']}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <h3 className={styles.card_title}>{card.title}</h3>
          <div className={styles.card_tags}>
            {card.tags?.map((tag, i) => {
              const tc = getTagColor(tag);
              return (
                <span key={i} className={styles.tag} style={{ background: tc.bg, color: tc.text }}>
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default KanbanCard;
