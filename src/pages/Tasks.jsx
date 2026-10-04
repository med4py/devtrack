import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import ConfirmModal from '../components/common/ConfirmModal';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskList from '../components/tasks/TaskList';
import { useAppContext } from '../context/AppContext';
import { priorityOrder } from '../utils/statistics';

function Tasks() {
  const navigate = useNavigate();
  const { tasks, deleteTask } = useAppContext();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [taskToDelete, setTaskToDelete] = useState(null);

  const filteredTasks = useMemo(() => {
    const lowerSearch = search.trim().toLowerCase();

    const result = tasks.filter((task) => {
      const matchesSearch =
        !lowerSearch ||
        task.title.toLowerCase().includes(lowerSearch) ||
        task.description.toLowerCase().includes(lowerSearch) ||
        task.category.toLowerCase().includes(lowerSearch);

      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'dueDate':
          return new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31');
        case 'priority':
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  }, [priorityFilter, search, sortBy, statusFilter, tasks]);

  const handleDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete);
      setTaskToDelete(null);
    }
  };

  return (
    <>
      <PageHeader
        title="All Tasks"
        subtitle="Organize your priorities and keep your learning momentum strong."
        action={
          <button type="button" className="btn btn-primary" onClick={() => navigate('/tasks/new')}>
            <i className="bi bi-plus-lg me-2" aria-hidden="true"></i>
            Add Task
          </button>
        }
      />

      <TaskFilters
        search={search}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        sortBy={sortBy}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onSortChange={setSortBy}
      />

      <div className="mt-4">
        <TaskList
          tasks={filteredTasks}
          onCreate={() => navigate('/tasks/new')}
          onEdit={(id) => navigate(`/tasks/${id}/edit`)}
          onDelete={(id) => setTaskToDelete(id)}
        />
      </div>

      <ConfirmModal
        show={Boolean(taskToDelete)}
        title="Delete task?"
        message="This action cannot be undone."
        onCancel={() => setTaskToDelete(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default Tasks;
