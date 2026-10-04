import Badge from '../common/Badge';
import { learningStatusLabels } from '../../utils/statistics';

function LearningProgress({ topics = [] }) {
  if (!topics.length) {
    return (
      <div className="card-surface section-card">
        <div className="section-card__header">
          <h3>Learning progress</h3>
        </div>
        <p className="empty-copy">No topics yet. Add a technology you want to learn.</p>
      </div>
    );
  }

  return (
    <div className="card-surface section-card">
      <div className="section-card__header">
        <h3>Learning progress</h3>
      </div>

      <div className="learning-progress-list">
        {topics.map((topic) => (
          <div key={topic.id} className="learning-progress-item">
            <div className="learning-progress-item__header">
              <div>
                <h4>{topic.name}</h4>
                <p>{topic.description}</p>
              </div>
              <Badge variant={topic.status}>{learningStatusLabels[topic.status]}</Badge>
            </div>
            <div className="progress-track" aria-label={`${topic.name} progress`}>
              <div className="progress-fill" style={{ width: `${topic.progress}%` }}></div>
            </div>
            <div className="learning-progress-item__footer">
              <span>{topic.progress}% complete</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LearningProgress;
