import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface VoiceInterfaceProps {
  onVoiceInput: (text: string) => void;
  lastUserInput?: string;
}

export const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ onVoiceInput, lastUserInput }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleVoiceInput(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const handleVoiceInput = (transcript: string) => {
    if (speechEnabled && synthRef.current) {
      // Greet and repeat input
      const greeting = "Hello, you're welcome!";
      const repetition = `You said: ${transcript}`;
      const response = "I'll process that task for you now.";
      
      const fullMessage = `${greeting} ${repetition} ${response}`;
      
      speak(fullMessage);
    }
    
    onVoiceInput(transcript);
  };

  const speak = (text: string) => {
    if (!synthRef.current || !speechEnabled) return;

    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    synthRef.current.speak(utterance);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleSpeech = () => {
    setSpeechEnabled(!speechEnabled);
    if (synthRef.current && !speechEnabled) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Automatically provide voice feedback when user submits a task
  useEffect(() => {
    if (lastUserInput && speechEnabled && synthRef.current) {
      const greeting = "Hello, you're welcome! sir what can I do for you today?";
      const repetition = `You entered: ${lastUserInput}`;
      const response = "I'm now coordinating with our agents to execute your task. You can monitor the progress in real-time below.";
      
      const fullMessage = `${greeting} ${repetition} ${response}`;
      speak(fullMessage);
    }
  }, [lastUserInput, speechEnabled]);

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={isListening ? stopListening : startListening}
        className={`p-4 rounded-xl transition-all duration-200 shadow-lg transform hover:scale-105 ${
          isListening 
            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse text-white' 
            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
        }`}
        title={isListening ? 'Stop listening' : 'Start voice input'}
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>

      <button
        onClick={toggleSpeech}
        className={`p-4 rounded-xl transition-all duration-200 shadow-lg transform hover:scale-105 ${
          speechEnabled 
            ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white' 
            : 'bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white'
        } ${isSpeaking ? 'animate-pulse' : ''}`}
        title={speechEnabled ? 'Disable voice feedback' : 'Enable voice feedback'}
      >
        {speechEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </button>

      {isListening && (
        <div className="flex items-center space-x-3 text-blue-600">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-sm font-medium">Listening...</span>
        </div>
      )}

      {isSpeaking && (
        <div className="flex items-center space-x-3 text-green-600">
          <Volume2 className="w-4 h-4 animate-pulse" />
          <span className="text-sm font-medium">Speaking...</span>
        </div>
      )}
    </div>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}