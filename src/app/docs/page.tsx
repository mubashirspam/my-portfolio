'use client';

import { useState } from 'react';
import { FileText, Download, Eye, FileCode, BookOpen, GraduationCap, Briefcase } from 'lucide-react';

interface DocFile {
  name: string;
  path: string;
  type: 'html' | 'docx' | 'pdf' | 'image';
  category: string;
  displayName: string;
}

const docFiles: DocFile[] = [
  {
    name: 'german-course.html',
    path: '/docs/german-course.html',
    type: 'html',
    category: 'Courses',
    displayName: 'German Course'
  },
  {
    name: 'ielts-mastery-course.html',
    path: '/docs/ielts-mastery-course.html',
    type: 'html',
    category: 'Courses',
    displayName: 'IELTS Mastery Course'
  },
  {
    name: 'learnforge.html',
    path: '/docs/learnforge.html',
    type: 'html',
    category: 'Projects',
    displayName: 'LearnForge'
  },
  {
    name: 'flawlessera-architecture.html',
    path: '/docs/flawlessera-architecture.html',
    type: 'html',
    category: 'Projects',
    displayName: 'FlawlessEra Architecture'
  },
  {
    name: 'flawlessera-lean-model.html',
    path: '/docs/flawlessera-lean-model.html',
    type: 'html',
    category: 'Projects',
    displayName: 'FlawlessEra Lean Model'
  },
  {
    name: 'Flutter_Senior_Engineer_Interview_Prep_Infosys_2026 (1).docx',
    path: '/docs/Flutter_Senior_Engineer_Interview_Prep_Infosys_2026 (1).docx',
    type: 'docx',
    category: 'Interview Prep',
    displayName: 'Flutter Senior Engineer Interview Prep (Infosys 2026)'
  },
  {
    name: 'Mubashir_Ahmed_Cover_Letter (2).docx',
    path: '/docs/Mubashir_Ahmed_Cover_Letter (2).docx',
    type: 'docx',
    category: 'Professional',
    displayName: 'Mubashir Ahmed Cover Letter'
  }
];

const categories = Array.from(new Set(docFiles.map(doc => doc.category)));

const categoryIcons: Record<string, any> = {
  'Courses': GraduationCap,
  'Projects': Briefcase,
  'Interview Prep': BookOpen,
  'Professional': FileText
};

export default function DocsPage() {
  const [selectedDoc, setSelectedDoc] = useState<DocFile | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredDocs = selectedCategory === 'All' 
    ? docFiles 
    : docFiles.filter(doc => doc.category === selectedCategory);

  const handleDocClick = (doc: DocFile) => {
    if (doc.type === 'html') {
      setSelectedDoc(doc);
    } else if (doc.type === 'docx' || doc.type === 'pdf') {
      window.open(doc.path, '_blank');
    }
  };

  const handleDownload = (doc: DocFile) => {
    const link = document.createElement('a');
    link.href = doc.path;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <FileCode className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-bold text-white">Documentation Hub</h1>
          </div>
          <p className="text-slate-400 mt-2">Browse and view project documentation, courses, and resources</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedDoc ? (
          <>
            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                    selectedCategory === 'All'
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  All Documents
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                      selectedCategory === category
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {categoryIcons[category] && (() => {
                      const Icon = categoryIcons[category];
                      return <Icon className="w-4 h-4" />;
                    })()}
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocs.map((doc, index) => {
                const Icon = categoryIcons[doc.category] || FileText;
                return (
                  <div
                    key={index}
                    className="group bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        doc.type === 'html' 
                          ? 'bg-purple-500/20 text-purple-300' 
                          : 'bg-blue-500/20 text-blue-300'
                      }`}>
                        {doc.type.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {doc.displayName}
                    </h3>
                    
                    <p className="text-slate-400 text-sm mb-4">{doc.category}</p>

                    <div className="flex gap-2">
                      {doc.type === 'html' ? (
                        <button
                          onClick={() => handleDocClick(doc)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleDocClick(doc)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
                          >
                            <Eye className="w-4 h-4" />
                            Open
                          </button>
                          <button
                            onClick={() => handleDownload(doc)}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors font-medium"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredDocs.length === 0 && (
              <div className="text-center py-16">
                <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No documents found in this category</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* HTML Viewer */}
            <div className="mb-6">
              <button
                onClick={() => setSelectedDoc(null)}
                className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
              >
                ← Back to Documents
              </button>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
              <div className="border-b border-slate-800 bg-slate-950/50 px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">{selectedDoc.displayName}</h2>
                  <p className="text-slate-400 text-sm mt-1">{selectedDoc.category}</p>
                </div>
                <button
                  onClick={() => window.open(selectedDoc.path, '_blank')}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors font-medium"
                >
                  <Eye className="w-4 h-4" />
                  Open in New Tab
                </button>
              </div>
              
              <div className="bg-white">
                <iframe
                  src={selectedDoc.path}
                  className="w-full h-[calc(100vh-16rem)] border-0"
                  title={selectedDoc.displayName}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
