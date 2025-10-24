import { useState } from 'react';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Plus, Trash2, Download, HelpCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface StickyNote {
  id: string;
  content: string;
  type: 'positive' | 'neutral' | 'frustration';
}

interface ColumnData {
  title: string;
  letter: string;
  description: string;
  color: string;
  examples: string[];
  tooltip: string;
}

const columns: ColumnData[] = [
  {
    title: 'Activities',
    letter: 'A',
    description: 'What are children doing?',
    color: 'bg-blue-100 border-blue-200',
    examples: ['Tapping rapidly', 'Switching levels', 'Pausing mid-play'],
    tooltip: 'Record specific actions and behaviors children perform while playing'
  },
  {
    title: 'Environments',
    letter: 'E',
    description: 'Where is it happening?',
    color: 'bg-green-100 border-green-200',
    examples: ['Classroom corner', 'Living room', 'Mobile setting'],
    tooltip: 'Note the physical and social context where play occurs'
  },
  {
    title: 'Interactions',
    letter: 'I',
    description: 'How do they engage?',
    color: 'bg-yellow-100 border-yellow-200',
    examples: ['Touch gestures', 'Peer conversations', 'Facial reactions'],
    tooltip: 'Document how children interact with the game and others'
  },
  {
    title: 'Objects',
    letter: 'O',
    description: 'What tools/devices are used?',
    color: 'bg-pink-100 border-pink-200',
    examples: ['Tablet', 'Joystick', 'Headphones'],
    tooltip: 'List physical and digital objects involved in the experience'
  },
  {
    title: 'Users',
    letter: 'U',
    description: 'Who are they?',
    color: 'bg-purple-100 border-purple-200',
    examples: ['Age, gender', 'Game familiarity', 'Emotional state'],
    tooltip: 'Describe the player demographics and characteristics'
  }
];

const exampleNotes: Record<string, StickyNote[]> = {
  A: [{ id: 'ex-a1', content: '7-year-old rapidly tapping screen when character gets stuck in corner', type: 'frustration' }],
  E: [{ id: 'ex-e1', content: 'Quiet classroom corner during free play time, 3 other children nearby', type: 'neutral' }],
  I: [{ id: 'ex-i1', content: 'Asking peer "how do I jump?" while gesturing at screen', type: 'positive' }],
  O: [{ id: 'ex-o1', content: 'iPad Mini with case, no headphones, using index finger for touch', type: 'neutral' }],
  U: [{ id: 'ex-u1', content: '7 years old, female, first time playing this game, appears curious', type: 'positive' }]
};

export function AEIOUFramework() {
  const { highContrast } = useTheme();
  const [notes, setNotes] = useState<Record<string, StickyNote[]>>(exampleNotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'positive' | 'neutral' | 'frustration'>('all');
  const [showExamples, setShowExamples] = useState(true);

  const addNote = (letter: string) => {
    const newNote: StickyNote = {
      id: Date.now().toString(),
      content: '',
      type: 'neutral'
    };
    setNotes(prev => ({
      ...prev,
      [letter]: [...prev[letter], newNote]
    }));
  };

  const updateNote = (letter: string, id: string, content: string) => {
    setNotes(prev => ({
      ...prev,
      [letter]: prev[letter].map(note =>
        note.id === id ? { ...note, content } : note
      )
    }));
  };

  const deleteNote = (letter: string, id: string) => {
    setNotes(prev => ({
      ...prev,
      [letter]: prev[letter].filter(note => note.id !== id)
    }));
  };

  const changeNoteType = (letter: string, id: string, type: StickyNote['type']) => {
    setNotes(prev => ({
      ...prev,
      [letter]: prev[letter].map(note =>
        note.id === id ? { ...note, type } : note
      )
    }));
  };

  const getNoteBorderColor = (type: StickyNote['type']) => {
    if (highContrast) {
      switch (type) {
        case 'positive':
          return 'border-green-500 bg-neutral-800';
        case 'frustration':
          return 'border-red-500 bg-neutral-800';
        default:
          return 'border-white bg-neutral-800';
      }
    }
    
    switch (type) {
      case 'positive':
        return 'border-green-400 bg-green-50';
      case 'frustration':
        return 'border-red-400 bg-red-50';
      default:
        return 'border-gray-300 bg-white';
    }
  };

  const filterNotes = (columnNotes: StickyNote[]) => {
    let filtered = columnNotes;
    
    if (!showExamples) {
      filtered = filtered.filter(note => !note.id.startsWith('ex-'));
    }
    
    if (filterType !== 'all') {
      filtered = filtered.filter(note => note.type === filterType);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(note => 
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const sanitizeCSV = (str: string): string => {
    if (!str) return '';
    if (/^[=+\-@\t\r]/.test(str)) {
      return `'${str}`;
    }
    return str;
  };

  const exportToCSV = () => {
    let csv = 'Framework,Category,Content,Type\n';
    
    Object.entries(notes).forEach(([letter, columnNotes]) => {
      const column = columns.find(c => c.letter === letter);
      columnNotes.forEach(note => {
        if (note.content) {
          const sanitized = sanitizeCSV(note.content);
          csv += `AEIOU,${column?.title},"${sanitized.replace(/"/g, '""')}",${note.type}\n`;
        }
      });
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aeiou-observations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setNotes({
      A: [],
      E: [],
      I: [],
      O: [],
      U: []
    });
  };

  const clearExamples = () => {
    setNotes({
      A: notes.A.filter(n => !n.id.startsWith('ex-')),
      E: notes.E.filter(n => !n.id.startsWith('ex-')),
      I: notes.I.filter(n => !n.id.startsWith('ex-')),
      O: notes.O.filter(n => !n.id.startsWith('ex-')),
      U: notes.U.filter(n => !n.id.startsWith('ex-'))
    });
    setShowExamples(false);
  };

  const getColumnColor = (columnColor: string) => {
    if (highContrast) {
      return 'bg-neutral-800 border-white';
    }
    return columnColor;
  };

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <Card className={`backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-lg border-0 transition-colors duration-300 ${
          highContrast ? 'bg-neutral-900' : 'bg-white/90'
        }`}>
          <div className="mb-4 md:mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h2 className={`mb-2 text-xl md:text-2xl transition-colors duration-300 ${
                highContrast ? 'text-white' : 'text-blue-600'
              }`}>
                AEIOU Framework
              </h2>
              <p className={`text-sm md:text-base transition-colors duration-300 ${
                highContrast ? 'text-slate-300' : 'text-slate-600'
              }`}>
                A systematic method for capturing field observations in five dimensions
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      onClick={exportToCSV}
                      variant="outline"
                      className={`rounded-xl flex-1 sm:flex-none transition-colors duration-300 ${
                        highContrast 
                          ? 'bg-neutral-800 border-white text-white hover:bg-neutral-700' 
                          : ''
                      }`}
                      aria-label="Export observations to CSV"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Export CSV</span>
                      <span className="sm:hidden">Export</span>
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download all AEIOU observations as CSV</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      onClick={clearAll}
                      variant="outline"
                      className={`rounded-xl flex-1 sm:flex-none transition-colors duration-300 ${
                        highContrast 
                          ? 'bg-neutral-800 border-white text-white hover:bg-neutral-700' 
                          : ''
                      }`}
                      aria-label="Clear all observations"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Clear All</span>
                      <span className="sm:hidden">Clear</span>
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove all sticky notes</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {columns.map((column) => (
              <div key={column.letter} className="space-y-3 flex flex-col">
                <div className={`p-4 rounded-xl border-2 flex flex-col h-full transition-colors duration-300 ${
                  getColumnColor(column.color)
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      highContrast ? 'bg-neutral-700' : 'bg-white/80'
                    }`}>
                      <span className={highContrast ? 'text-white' : 'text-slate-700'}>
                        {column.letter}
                      </span>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button 
                          className={`transition-colors ${
                            highContrast 
                              ? 'text-slate-300 hover:text-white' 
                              : 'text-slate-500 hover:text-slate-700'
                          }`}
                          aria-label={`Help for ${column.title}`}
                        >
                          <HelpCircle className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{column.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <h3 className={highContrast ? 'text-white' : 'text-slate-800'}>
                    {column.title}
                  </h3>
                  <p className={`text-sm mb-3 min-h-[40px] ${
                    highContrast ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {column.description}
                  </p>
                  <div className="space-y-1 flex-1">
                    <p className={`text-xs ${highContrast ? 'text-slate-400' : 'text-slate-500'}`}>
                      Examples:
                    </p>
                    {column.examples.map((example, idx) => (
                      <p key={idx} className={`text-xs ${
                        highContrast ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        • {example}
                      </p>
                    ))}
                  </div>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button
                        onClick={() => addNote(column.letter)}
                        className={`w-full rounded-xl border-2 border-dashed transition-colors duration-300 ${
                          highContrast
                            ? 'bg-neutral-800 hover:bg-neutral-700 text-white border-white'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                        }`}
                        variant="outline"
                        aria-label={`Add note to ${column.title}`}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Note
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to add a new observation for {column.title}</p>
                  </TooltipContent>
                </Tooltip>

                <div className="space-y-2">
                  {filterNotes(notes[column.letter]).map((note) => (
                    <Card
                      key={note.id}
                      className={`p-3 rounded-xl shadow-sm border-2 transition-colors duration-300 ${
                        getNoteBorderColor(note.type)
                      } ${note.id.startsWith('ex-') && !highContrast ? 'bg-amber-50/50' : ''}`}
                      role="article"
                      aria-label={`Observation note: ${note.content || 'Empty note'}`}
                    >
                      {note.id.startsWith('ex-') && (
                        <Badge variant="outline" className={`mb-2 text-xs ${
                          highContrast 
                            ? 'bg-neutral-700 border-yellow-500 text-yellow-400' 
                            : 'bg-amber-100 border-amber-300'
                        }`}>
                          📌 Example
                        </Badge>
                      )}
                      <Textarea
                        placeholder="Enter observation..."
                        value={note.content}
                        onChange={(e) => updateNote(column.letter, note.id, e.target.value)}
                        className={`min-h-24 mb-2 border-0 p-0 resize-none focus-visible:ring-0 ${
                          highContrast 
                            ? 'bg-neutral-800 text-white placeholder:text-slate-500' 
                            : ''
                        }`}
                        aria-label={`Edit observation for ${column.title}`}
                      />
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex gap-1" role="group" aria-label="Emotion classification">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => changeNoteType(column.letter, note.id, 'positive')}
                                className={`w-6 h-6 rounded-full border-2 ${
                                  note.type === 'positive' 
                                    ? 'bg-green-400 border-green-600' 
                                    : 'bg-green-100 border-green-300'
                                }`}
                                aria-label="Mark as positive"
                                aria-pressed={note.type === 'positive'}
                              />
                            </TooltipTrigger>
                            <TooltipContent>Positive Engagement</TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => changeNoteType(column.letter, note.id, 'neutral')}
                                className={`w-6 h-6 rounded-full border-2 ${
                                  note.type === 'neutral' 
                                    ? 'bg-gray-400 border-gray-600' 
                                    : 'bg-gray-100 border-gray-300'
                                }`}
                                aria-label="Mark as neutral"
                                aria-pressed={note.type === 'neutral'}
                              />
                            </TooltipTrigger>
                            <TooltipContent>Neutral Observation</TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => changeNoteType(column.letter, note.id, 'frustration')}
                                className={`w-6 h-6 rounded-full border-2 ${
                                  note.type === 'frustration' 
                                    ? 'bg-red-400 border-red-600' 
                                    : 'bg-red-100 border-red-300'
                                }`}
                                aria-label="Mark as frustration"
                                aria-pressed={note.type === 'frustration'}
                              />
                            </TooltipTrigger>
                            <TooltipContent>Frustration/Struggle</TooltipContent>
                          </Tooltip>
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => deleteNote(column.letter, note.id)}
                              className={`transition-colors ${
                                highContrast
                                  ? 'text-slate-300 hover:text-red-400'
                                  : 'text-slate-400 hover:text-red-500'
                              }`}
                              aria-label="Delete note"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Delete this observation</TooltipContent>
                        </Tooltip>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
}