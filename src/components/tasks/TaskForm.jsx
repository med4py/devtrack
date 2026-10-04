import { useEffect, useState } from 'react';

const initialFormState = {
  title: '',
  description: '',
  category: '',
  priority: 'medium',
  status: 'todo',
  dueDate: '',
};

function TaskForm({ initialValues = initialFormState, onSubmit, submitLabel = 'Save task' }) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.title.trim()) {
      nextErrors.title = 'Title is required.';
    }

    if (!formData.category.trim()) {
      nextErrors.category = 'Category is required.';
    }

    if (!formData.priority) {
      nextErrors.priority = 'Priority is required.';
    }

    if (!formData.status) {
      nextErrors.status = 'Status is required.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category.trim(),
    });
  };

  return (
    <form className="card-surface form-card" onSubmit={handleSubmit} noValidate>
      <div className="row g-3">
        <div className="col-12">
          <label className="form-label" htmlFor="task-title">
            Title
          </label>
          <input
            id="task-title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          />
          {errors.title ? <div className="invalid-feedback d-block">{errors.title}</div> : null}
        </div>

        <div className="col-12">
          <label className="form-label" htmlFor="task-description">
            Description
          </label>
          <textarea
            id="task-description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label" htmlFor="task-category">
            Category
          </label>
          <input
            id="task-category"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            className={`form-control ${errors.category ? 'is-invalid' : ''}`}
          />
          {errors.category ? <div className="invalid-feedback d-block">{errors.category}</div> : null}
        </div>

        <div className="col-12 col-md-3">
          <label className="form-label" htmlFor="task-priority">
            Priority
          </label>
          <select
            id="task-priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className={`form-select ${errors.priority ? 'is-invalid' : ''}`}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority ? <div className="invalid-feedback d-block">{errors.priority}</div> : null}
        </div>

        <div className="col-12 col-md-3">
          <label className="form-label" htmlFor="task-status">
            Status
          </label>
          <select
            id="task-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`form-select ${errors.status ? 'is-invalid' : ''}`}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status ? <div className="invalid-feedback d-block">{errors.status}</div> : null}
        </div>

        <div className="col-12">
          <label className="form-label" htmlFor="task-date">
            Due date
          </label>
          <input
            id="task-date"
            name="dueDate"
            type="date"
            value={formData.dueDate || ''}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="form-card__actions">
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
