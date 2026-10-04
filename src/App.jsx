import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { AppProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import Learning from './pages/Learning';
import LearningForm from './pages/LearningForm';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import Statistics from './pages/Statistics';
import TaskFormPage from './pages/TaskFormPage';
import Tasks from './pages/Tasks';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/new" element={<TaskFormPage />} />
            <Route path="/tasks/:id/edit" element={<TaskFormPage />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/learning/new" element={<LearningForm />} />
            <Route path="/learning/:id/edit" element={<LearningForm />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
