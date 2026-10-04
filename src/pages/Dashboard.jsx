import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import LearningProgress from '../components/dashboard/LearningProgress';
import RecentTasks from '../components/dashboard/RecentTasks';
import StatCard from '../components/dashboard/StatCard';
import PageHeader from '../components/common/PageHeader';
import { useAppContext } from '../context/AppContext';
import { calculateLearningStats, calculateTaskStats } from '../utils/statistics';

function Dashboard() {
  const { tasks, topics } = useAppContext();

  const taskStats = useMemo(() => calculateTaskStats(tasks), [tasks]);
  const learningStats = useMemo(() => calculateLearningStats(topics), [topics]);
  const recentTasks = useMemo(
    () => [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4),
    [tasks],
  );

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Track your learning journey and stay consistent."
        action={
          <Link to="/tasks/new" className="btn btn-primary">
            <i className="bi bi-plus-lg me-2" aria-hidden="true"></i>
            Add task
          </Link>
        }
      />

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard title="Total Tasks" value={taskStats.total} subtitle="All active tasks" icon="bi-list-task" accent="primary" />
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard title="Completed" value={taskStats.completed} subtitle="Finished items" icon="bi-check-circle-fill" accent="success" />
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard title="In Progress" value={taskStats.inProgress} subtitle="Currently moving" icon="bi-hourglass-split" accent="warning" />
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard title="To Do" value={taskStats.todo} subtitle="Planned next" icon="bi-clipboard-check" accent="info" />
        </div>
      </div>

      <div className="utility-metrics mb-4">
        <div className="card-surface utility-metric">
          <span className="utility-metric__label">Task completion rate</span>
          <strong>{taskStats.completionRate}%</strong>
        </div>
        <div className="card-surface utility-metric">
          <span className="utility-metric__label">Average learning progress</span>
          <strong>{learningStats.averageProgress}%</strong>
        </div>
      </div>

      <div className="dashboard-grid">
        <RecentTasks tasks={recentTasks} />
        <LearningProgress topics={topics.slice(0, 4)} />
      </div>
    </>
  );
}

export default Dashboard;
