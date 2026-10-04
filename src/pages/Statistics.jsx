import { useMemo } from 'react';
import PageHeader from '../components/common/PageHeader';
import { useAppContext } from '../context/AppContext';
import {
  calculateLearningStats,
  calculateTaskStats,
  getPriorityCounts,
  getStatusCounts,
  learningStatusLabels,
  statusLabels,
} from '../utils/statistics';

function Statistics() {
  const { tasks, topics } = useAppContext();

  const taskStats = useMemo(() => calculateTaskStats(tasks), [tasks]);
  const learningStats = useMemo(() => calculateLearningStats(topics), [topics]);
  const priorityCounts = useMemo(() => getPriorityCounts(tasks), [tasks]);
  const statusCounts = useMemo(() => getStatusCounts(tasks), [tasks]);

  const renderProgressRow = (label, value, max = 100) => (
    <div className="stat-list__item">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${Math.min((value / max) * 100, 100)}%` }}></div>
      </div>
    </div>
  );

  return (
    <>
      <PageHeader title="Statistics" subtitle="Review your work across tasks and learning goals." />

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card-surface stat-panel">
            <span>Total tasks</span>
            <strong>{taskStats.total}</strong>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card-surface stat-panel">
            <span>Completed tasks</span>
            <strong>{taskStats.completed}</strong>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card-surface stat-panel">
            <span>Completion rate</span>
            <strong>{taskStats.completionRate}%</strong>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card-surface stat-panel">
            <span>Average learning progress</span>
            <strong>{learningStats.averageProgress}%</strong>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card-surface section-card">
            <div className="section-card__header">
              <h3>Tasks by status</h3>
            </div>
            <div className="stat-list">
              {Object.entries(statusLabels).map(([key, label]) => renderProgressRow(label, statusCounts[key], Math.max(taskStats.total, 1)))}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card-surface section-card">
            <div className="section-card__header">
              <h3>Tasks by priority</h3>
            </div>
            <div className="stat-list">
              {Object.entries(priorityCounts).map(([key, value]) => renderProgressRow(key.charAt(0).toUpperCase() + key.slice(1), value, Math.max(taskStats.total, 1)))}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card-surface section-card">
            <div className="section-card__header">
              <h3>Learning overview</h3>
            </div>
            <div className="stat-list">
              {Object.entries(learningStatusLabels).map(([key, label]) => {
                const count = topics.filter((topic) => topic.status === key).length;
                return renderProgressRow(label, count, Math.max(topics.length, 1));
              })}
              <div className="mt-3 pt-3 border-top">
                <div className="d-flex justify-content-between">
                  <span>Completed topics</span>
                  <strong>{learningStats.completedTopics}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Statistics;
