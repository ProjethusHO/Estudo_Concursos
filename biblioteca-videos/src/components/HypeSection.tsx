import React from 'react';

interface HypeMessage {
  id: string;
  user: string;
  text: string;
  source: 'YouTube' | 'Insta' | 'Hippy' | 'Blog';
  subject: string;
  date: string;
}

interface HypeSectionProps {
  messages: HypeMessage[];
}

export const HypeSection: React.FC<HypeSectionProps> = ({ messages }) => {
  if (messages.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-netflixDark to-black border border-indigo-500 border-opacity-30 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 opacity-10 blur-3xl -mr-16 -mt-16 group-hover:opacity-20 transition-opacity"></div>
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-white flex items-center tracking-tighter italic">
          <span className="bg-netflixRed text-white px-2 py-0.5 rounded mr-2 not-italic">HYPE</span>
          TENDÊNCIAS & COMENTÁRIOS
        </h2>
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-netflixRed animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className="bg-black bg-opacity-40 border border-gray-800 p-4 rounded-xl hover:border-indigo-400 transition-all duration-300 hover:scale-[1.02] relative"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold uppercase py-1 px-2 bg-gray-800 text-gray-400 rounded">
                #{msg.subject}
              </span>
              <span className="text-[10px] text-gray-500 font-mono">{msg.date}</span>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed mb-4 min-h-[60px]">
              "{msg.text}"
            </p>
            <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-900">
              <span className="text-xs font-bold text-indigo-400">@{msg.user}</span>
              <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${
                msg.source === 'Hippy' ? 'bg-purple-900 border border-purple-500 text-purple-200' : 
                msg.source === 'YouTube' ? 'bg-red-900 border border-red-500 text-red-200' :
                'bg-gray-900 border border-gray-700 text-gray-400'
              }`}>
                {msg.source}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
