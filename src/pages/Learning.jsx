import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/common/ConfirmModal';
import EmptyState from '../components/common/EmptyState';
import PageHeader from '../components/common/PageHeader';
import Badge from '../components/common/Badge';
import { useAppContext } from '../context/AppContext';
import { learningStatusLabels } from '../utils/statistics';

function Learning() {
  const navigate = useNavigate();
  const { topics, deleteTopic } = useAppContext();
  const [topicToDelete, setTopicToDelete] = useState(null);

  const sortedTopics = useMemo(
    () => [...topics].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [topics],
  );

  const handleDelete = () => {
    if (topicToDelete) {
      deleteTopic(topicToDelete);
      setTopicToDelete(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Learning Topics"
        subtitle="Track the technologies and skills you want to master."
        action={
          <button type="button" className="btn btn-primary" onClick={() => navigate('/learning/new')}>
            <i className="bi bi-plus-lg me-2" aria-hidden="true"></i>
            Add Topic
          </button>
        }
      />

      {!sortedTopics.length ? (
        <EmptyState
          title="No learning topics"
          description="Add a technology you want to learn."
          actionLabel="Add topic"
          onAction={() => navigate('/learning/new')}
        />
      ) : (
        <div className="row g-4">
          {sortedTopics.map((topic) => (
            <div key={topic.id} className="col-12 col-lg-6">
              <div className="card-surface topic-card">
                <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                  <div>
                    <h3>{topic.name}</h3>
                    <p className="topic-card__description">{topic.description}</p>
                  </div>
                  <div className="topic-card__actions">
                    <button type="button" className="icon-button" aria-label={`Edit ${topic.name}`} onClick={() => navigate(`/learning/${topic.id}/edit`)}>
                      <i className="bi bi-pencil-square" aria-hidden="true"></i>
                    </button>
                    <button type="button" className="icon-button icon-button--danger" aria-label={`Delete ${topic.name}`} onClick={() => setTopicToDelete(topic.id)}>
                      <i className="bi bi-trash3" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>

                <div className="topic-card__status-row">
                  <Badge variant={topic.status}>{learningStatusLabels[topic.status]}</Badge>
                  <span>{topic.progress}%</span>
                </div>

                <div className="progress-track" aria-label={`${topic.name} progress`}>
                  <div className="progress-fill" style={{ width: `${topic.progress}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        show={Boolean(topicToDelete)}
        title="Delete topic?"
        message="This action cannot be undone."
        onCancel={() => setTopicToDelete(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default Learning;
