import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TaskStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  agentId?: string;
}

interface Task {
  id: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  steps: TaskStep[];
}

interface TaskResponse {
  task_id: string;
  status: 'completed' | 'failed';
  result: {
    providers?: any[];
    booking?: any;
    event?: any;
  };
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
    // Initialize a local task for optimistic UI
    const tempId = Date.now().toString();
    const newTask: Task = {
      id: tempId,
      description,
      status: 'processing',
      createdAt: new Date(),
      steps: [
        { id: '1', title: 'Analyze Request', description: 'Planning execution', status: 'active' },
        { id: '2', title: 'Execute Search', description: 'Finding providers', status: 'pending' },
        { id: '3', title: 'Make Calls', description: 'Contacting providers', status: 'pending' },
        { id: '4', title: 'Finalize', description: 'Booking & calendar', status: 'pending' }
      ]
    };
    setActiveTasks(prev => [...prev, newTask]);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/tasks/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: description }),
      });
      if (!res.ok) throw new Error('Server error');
      const data: TaskResponse = await res.json();

      // Update steps statuses sequentially based on result keys
      setActiveTasks(prev => prev.map(task => {
        if (task.id !== tempId) return task;
        return {
          ...task,
          status: data.status === 'completed' ? 'completed' : 'failed',
          steps: task.steps.map((step, i) => ({
            ...step,
            status: i <= task.steps.length - 1
              ? 'completed'
              : step.status
          }))
        };
      }));

    } catch (error) {
      setActiveTasks(prev => prev.map(task => (
        task.id === tempId ? { ...task, status: 'failed' } : task
      )));
      console.error(error);
    }
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
  if (!context) throw new Error('useTask must be used within TaskProvider');
  return context;
};
