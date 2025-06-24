import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Task {
  id: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  steps: TaskStep[];
}

interface TaskStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  agentId?: string;
}

interface TaskContextType {
  activeTasks: Task[];
  createTask: (description: string) => Promise<void>;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);

  const createTask = async (description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      description,
      status: 'processing',
      createdAt: new Date(),
      steps: [
        {
          id: '1',
          title: 'Analyze Request',
          description: 'Understanding task requirements and planning execution',
          status: 'active'
        },
        {
          id: '2',
          title: 'Research Phase',
          description: 'Finding relevant providers and options',
          status: 'pending'
        },
        {
          id: '3',
          title: 'Contact Providers',
          description: 'Making calls and gathering information',
          status: 'pending'
        },
        {
          id: '4',
          title: 'Schedule & Confirm',
          description: 'Booking appointments and updating calendar',
          status: 'pending'
        }
      ]
    };

    setActiveTasks(prev => [...prev, newTask]);

    // Simulate task progression
    setTimeout(() => {
      setActiveTasks(prev => prev.map(task => 
        task.id === newTask.id 
          ? {
              ...task,
              steps: task.steps.map((step, index) => ({
                ...step,
                status: index === 0 ? 'completed' : index === 1 ? 'active' : 'pending'
              }))
            }
          : task
      ));
    }, 2000);
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setActiveTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ activeTasks, createTask, updateTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};