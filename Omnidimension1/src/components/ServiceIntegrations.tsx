import React, { useState } from 'react';
import { Phone, Calendar, Search, CreditCard, MapPin, Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  status: 'connected' | 'disconnected' | 'error';
  description: string;
  lastUsed?: Date;
  gradient: string;
}

export const ServiceIntegrations: React.FC = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: 'omnidimension',
      name: 'OmniDimension Calling',
      icon: Phone,
      status: 'connected',
      description: 'AI-powered calling service for appointments and bookings',
      lastUsed: new Date(Date.now() - 300000),
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      icon: Calendar,
      status: 'connected',
      description: 'Calendar integration for scheduling and reminders',
      lastUsed: new Date(Date.now() - 600000),
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'google-search',
      name: 'Google Search API',
      icon: Search,
      status: 'connected',
      description: 'Advanced search capabilities for finding services',
      lastUsed: new Date(Date.now() - 180000),
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'stripe',
      name: 'Stripe Payments',
      icon: CreditCard,
      status: 'disconnected',
      description: 'Payment processing for booking deposits and fees',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'google-maps',
      name: 'Google Maps',
      icon: MapPin,
      status: 'connected',
      description: 'Location services and routing capabilities',
      lastUsed: new Date(Date.now() - 900000),
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 'email',
      name: 'Email Service',
      icon: Mail,
      status: 'error',
      description: 'Email notifications and confirmations',
      gradient: 'from-red-500 to-red-600'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100 border-green-200';
      case 'error': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 rounded-full bg-gray-400"></div>;
    }
  };

  const toggleService = (serviceId: string) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId 
        ? { ...service, status: service.status === 'connected' ? 'disconnected' : 'connected' }
        : service
    ));
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Service Integrations</h2>
        <p className="text-gray-600 mb-10 text-lg">
          Connect external services to enable your agents to perform real-world actions like making calls, 
          booking appointments, and managing your calendar.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.id} className="bg-white/80 rounded-xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`bg-gradient-to-br ${service.gradient} p-3 rounded-xl shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{service.name}</h3>
                    </div>
                  </div>
                  {getStatusIcon(service.status)}
                </div>

                <p className="text-sm text-gray-600 mb-4">{service.description}</p>

                <div className={`px-3 py-2 rounded-full text-xs font-bold border mb-4 ${getStatusColor(service.status)}`}>
                  {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                </div>

                {service.lastUsed && (
                  <p className="text-xs text-gray-500 mb-4">
                    Last used: {service.lastUsed.toLocaleString()}
                  </p>
                )}

                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleService(service.id)}
                    className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg transform hover:scale-105 ${
                      service.status === 'connected'
                        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                    }`}
                  >
                    {service.status === 'connected' ? 'Disconnect' : 'Connect'}
                  </button>
                  
                  <button className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-lg transform hover:scale-105">
                    Configure
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl">
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Integration Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-green-700 font-bold">Active Services</span>
              <span className="text-3xl font-bold text-green-600">
                {services.filter(s => s.status === 'connected').length}
              </span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-red-50 border border-red-200 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-red-700 font-bold">Failed Services</span>
              <span className="text-3xl font-bold text-red-600">
                {services.filter(s => s.status === 'error').length}
              </span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-blue-700 font-bold">Total Integrations</span>
              <span className="text-3xl font-bold text-blue-600">{services.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};