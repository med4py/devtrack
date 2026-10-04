import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import { formatDate, statusLabels } from '../../utils/statistics';

function RecentTasks({ tasks = [] }) {
  if (!tasks.length) {
    return (
      <div className="card-surface section-card">
        <div className="section-card__header">
          <h3>Recent tasks</h3>
        </div>
        <p className="empty-copy">No recent work to display yet.</p>
      </div>
    );
  }

  return (
    <div className="card-surface section-card">
      <div className="section-card__header">
        <h3>Recent tasks</h3>
        <Link to="/tasks" className="section-link">
          View all
        </Link>
      </div>

      <div className="recent-task-list">
        {tasks.map((task) => (
          <div key={task.id} className="recent-task-item">
            <div>
              <div className="recent-task-item__title">{task.title}</div>
              <div className="recent-task-item__meta">
                <span>{task.category}</span>
                <span>{formatDate(task.dueDate)}</span>
              </div>
            </div>
            <Badge variant={task.status}>{statusLabels[task.status]}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentTasks;
