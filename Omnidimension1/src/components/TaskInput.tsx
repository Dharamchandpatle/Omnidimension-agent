import React, { useState } from 'react';
import { Send, FileText, Loader } from 'lucide-react';
import { useTask } from '../context/TaskContext';
import { VoiceInterface } from './VoiceInterface';

export const TaskInput: React.FC = () => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastUserInput, setLastUserInput] = useState<string>('');
  const { createTask } = useTask();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsProcessing(true);
    setLastUserInput(input);
    
    try {
      await createTask(input);
      setInput('');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceInput = (transcript: string) => {
    setInput(transcript);
  };

  const exampleTasks = [
    "Find the best dentist in my area , call to book an appointment this week, add to my calendar",
    "Research restaurants for anniversary dinner, make reservation for 2 at 7pm Saturday",
    "Find a plumber, get quotes for bathroom renovation, schedule consultations",
    "Book flight to London for next month, find hotel near city center, arrange airport transfer"
  ];

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold flex items-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl mr-4 shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            Describe Your Task
          </h2>
          
          <VoiceInterface 
            onVoiceInput={handleVoiceInput}
            lastUserInput={lastUserInput}
          />
        </div>
        
        <p className="text-gray-600 text-lg">
          Tell us what you need done in plain language or use voice input. Our agents will plan and execute the entire workflow with spoken confirmation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Find providers for dental cleaning, sort by my preferences, call for the earliest appointment, book it, add it to my calendar, and keep checking for better slots"
            className="w-full bg-white/80 border border-gray-300 rounded-xl p-6 pr-16 text-gray-900 placeholder-gray-500 resize-none h-40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
            disabled={isProcessing}
          />
          
          <div className="absolute right-4 bottom-4">
            <button
              type="submit"
              disabled={!input.trim() || isProcessing}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200 flex items-center shadow-lg transform hover:scale-105 disabled:transform-none"
            >
              {isProcessing ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-8">
        <p className="text-sm text-gray-600 mb-4 font-medium">Try these examples:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exampleTasks.map((task, index) => (
            <button
              key={index}
              onClick={() => setInput(task)}
              className="text-left p-4 bg-gradient-to-br from-gray-50 to-white hover:from-blue-50 hover:to-purple-50 rounded-xl text-sm text-gray-700 transition-all duration-200 border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
            >
              {task}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};