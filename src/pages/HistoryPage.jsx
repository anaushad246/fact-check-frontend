import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const mockHistory = [
  {
    id: 1,
    content: "NASA confirms discovery of Earth-like planet",
    type: 'text',
    verdict: 'uncertain',
    confidence: 0.75,
    timestamp: new Date('2024-03-15T10:30:00'),
  },
  {
    id: 2,
    content: "New study shows chocolate is good for health",
    type: 'text',
    verdict: 'fake',
    confidence: 0.92,
    timestamp: new Date('2024-03-14T15:45:00'),
  },
  {
    id: 3,
    content: "Global temperature records broken in 2023",
    type: 'text',
    verdict: 'real',
    confidence: 0.98,
    timestamp: new Date('2024-03-13T09:15:00'),
  },
];

const verdictConfig = {
  real: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    label: 'Real'
  },
  fake: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    label: 'Fake'
  },
  uncertain: {
    icon: AlertCircle,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    label: 'Uncertain'
  }
};

export default function HistoryPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Check History
        </h1>

        <div className="space-y-4">
          {mockHistory.map((item) => {
            const config = verdictConfig[item.verdict];
            const Icon = config.icon;
            
            return (
              <div
                key={item.id}
                className={`rounded-xl ${config.bgColor} ${config.borderColor} border p-4`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <Icon className={`h-6 w-6 ${config.color}`} />
                  <div>
                    <h3 className="font-semibold">{config.label}</h3>
                    <p className="text-sm text-gray-600">
                      {item.timestamp.toLocaleDateString()} at {item.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="ml-auto text-sm text-gray-600">
                    Confidence: {(item.confidence * 100).toFixed(1)}%
                  </div>
                </div>
                <p className="text-gray-700">{item.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 