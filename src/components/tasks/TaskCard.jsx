import Badge from '../common/Badge';
import { formatDate, statusLabels } from '../../utils/statistics';

function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="task-card card-surface">
      <div className="task-card__header">
        <div>
          <h3>{task.title}</h3>
          <div className="task-card__meta">
            <span>{task.category}</span>
            <span>{formatDate(task.dueDate)}</span>
          </div>
        </div>
        <div className="task-card__actions">
          <button type="button" className="icon-button" aria-label={`Edit ${task.title}`} onClick={() => onEdit(task.id)}>
            <i className="bi bi-pencil-square" aria-hidden="true"></i>
          </button>
          <button type="button" className="icon-button icon-button--danger" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task.id)}>
            <i className="bi bi-trash3" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <p className="task-card__description">{task.description}</p>

      <div className="task-card__badges">
        <Badge variant={task.status}>{statusLabels[task.status]}</Badge>
        <Badge variant={task.priority}>{task.priority}</Badge>
      </div>
    </div>
  );
}

export default TaskCard;
