import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import TaskForm from '../components/tasks/TaskForm';
import { useAppContext } from '../context/AppContext';

const emptyTask = {
  title: '',
  description: '',
  category: '',
  priority: 'medium',
  status: 'todo',
  dueDate: '',
};

function TaskFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks, addTask, updateTask } = useAppContext();

  const existingTask = tasks.find((task) => task.id === id);

  useEffect(() => {
    if (id && !existingTask) {
      navigate('/tasks', { replace: true });
    }
  }, [existingTask, id, navigate]);

  const handleSubmit = (formValues) => {
    if (existingTask) {
      updateTask(existingTask.id, formValues);
    } else {
      addTask({
        ...formValues,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      });
    }

    navigate('/tasks');
  };

  const formTitle = existingTask ? 'Edit Task' : 'Add Task';

  return (
    <>
      <PageHeader title={formTitle} subtitle="Capture your next milestone and keep moving forward." />
      <TaskForm
        initialValues={existingTask ? { ...existingTask } : emptyTask}
        onSubmit={handleSubmit}
        submitLabel={existingTask ? 'Update task' : 'Create task'}
      />
    </>
  );
}

export default TaskFormPage;
