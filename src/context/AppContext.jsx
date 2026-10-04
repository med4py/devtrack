import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { initialTasks, initialTopics } from '../data/initialData';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('devtrack_tasks', initialTasks);
  const [topics, setTopics] = useLocalStorage('devtrack_topics', initialTopics);
  const [theme, setTheme] = useLocalStorage('devtrack_theme', 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addTask = (task) => {
    setTasks((currentTasks) => [...currentTasks, task]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)),
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  const addTopic = (topic) => {
    setTopics((currentTopics) => [...currentTopics, topic]);
  };

  const updateTopic = (id, updatedTopic) => {
    setTopics((currentTopics) =>
      currentTopics.map((topic) => (topic.id === id ? { ...topic, ...updatedTopic } : topic)),
    );
  };

  const deleteTopic = (id) => {
    setTopics((currentTopics) => currentTopics.filter((topic) => topic.id !== id));
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  const resetData = () => {
    setTasks(initialTasks);
    setTopics(initialTopics);
    setTheme('light');
  };

  const value = useMemo(
    () => ({
      tasks,
      topics,
      theme,
      addTask,
      updateTask,
      deleteTask,
      addTopic,
      updateTopic,
      deleteTopic,
      toggleTheme,
      resetData,
    }),
    [tasks, topics, theme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }

  return context;
}
