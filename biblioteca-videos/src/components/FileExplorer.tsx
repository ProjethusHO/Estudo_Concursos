import React, { useState } from 'react';

interface FileNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  url?: string;
  children?: FileNode[];
}

interface FileExplorerProps {
  data: FileNode[];
}

const FileTreeNode: React.FC<{ node: FileNode; level: number }> = ({ node, level }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    if (node.type === 'folder') {
      setIsOpen(!isOpen);
    } else if (node.url) {
      window.open(node.url, '_blank');
    }
  };

  return (
    <div className="select-none">
      <div 
        className={`flex items-center py-2 px-3 hover:bg-white hover:bg-opacity-10 cursor-pointer rounded-md transition-colors ${level > 0 ? 'ml-4 border-l border-gray-800' : ''}`}
        onClick={toggle}
      >
        <span className="mr-2">
          {node.type === 'folder' ? (
            <svg 
              className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''} text-netflixRed`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )}
        </span>
        <span className={`text-sm ${node.type === 'folder' ? 'font-bold uppercase tracking-tight text-gray-300' : 'text-gray-400'}`}>
          {node.name}
        </span>
      </div>
      
      {node.type === 'folder' && isOpen && node.children && (
        <div className="mt-1">
          {node.children.map(child => (
            <FileTreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileExplorer: React.FC<FileExplorerProps> = ({ data }) => {
  return (
    <div className="bg-gray-950 bg-opacity-50 border border-gray-800 rounded-xl p-6 shadow-glow">
      <h2 className="text-xl font-extrabold text-white mb-6 flex items-center">
        <svg className="w-6 h-6 mr-3 text-netflixRed" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        Raiz de Provas e Questões (QConcursos)
      </h2>
      <div className="space-y-1 max-h-[600px] overflow-y-auto custom-scrollbar">
        {data.map(rootNode => (
          <FileTreeNode key={rootNode.id} node={rootNode} level={0} />
        ))}
      </div>
    </div>
  );
};
