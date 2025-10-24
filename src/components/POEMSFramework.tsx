import { useState } from 'react';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Plus, Trash2, Download, HelpCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ObservationRow {
  id: string;
  people: string;
  objects: string;
  environments: string;
  messages: string;
  services: string;
}

const exampleRow: ObservationRow = {
  id: 'example',
  people: '9-year-old girl, plays Minecraft on tablet',
  objects: 'Tablet with stylus',
  environments: 'After-school club, semi-noisy room',
  messages: '"Level up!" pop-ups trigger excitement',
  services: 'Parental account, school Wi-Fi'
};

export function POEMSFramework() {
  const { highContrast } = useTheme();
  const [observations, setObservations] = useState<ObservationRow[]>([exampleRow]);
  const [searchTerm, setSearchTerm] = useState('');

  const addObservation = () => {
    const newObservation: ObservationRow = {
      id: Date.now().toString(),
      people: '',
      objects: '',
      environments: '',
      messages: '',
      services: ''
    };
    setObservations(prev => [...prev, newObservation]);
  };

  const updateObservation = (id: string, field: keyof ObservationRow, value: string) => {
    setObservations(prev =>
      prev.map(obs =>
        obs.id === id ? { ...obs, [field]: value } : obs
      )
    );
  };

  const deleteObservation = (id: string) => {
    if (id === 'example') return;
    setObservations(prev => prev.filter(obs => obs.id !== id));
  };

  const clearExamples = () => {
    setObservations(prev => prev.filter(obs => obs.id !== 'example'));
  };

  const filterObservations = () => {
    if (!searchTerm) return observations;

    const searchLower = searchTerm.toLowerCase();
    return observations.filter(obs =>
      Object.values(obs).some(value => value.toLowerCase().includes(searchLower))
    );
  };

  const sanitizeCSV = (str: string): string => {
    if (!str) return '';
    if (/^[=+\-@\t\r]/.test(str)) {
      return `'${str}`;
    }
    return str;
  };

  const exportToCSV = () => {
    let csv = 'Framework,People,Objects,Environments,Messages,Services\n';

    observations.forEach(obs => {
      if (obs.people || obs.objects || obs.environments || obs.messages || obs.services) {
        const fields = [
          sanitizeCSV(obs.people),
          sanitizeCSV(obs.objects),
          sanitizeCSV(obs.environments),
          sanitizeCSV(obs.messages),
          sanitizeCSV(obs.services)
        ].map(str => `"${str.replace(/"/g, '""')}"`);
        csv += `POEMS,${fields.join(',')}\n`;
      }
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `poems-observations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredObservations = filterObservations();

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <Card className={`backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-lg border-0 transition-colors duration-300 ${
          highContrast ? 'bg-neutral-900' : 'bg-white/90'
        }`}>
          <div className="mb-4 md:mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h2 className={`mb-2 text-xl md:text-2xl transition-colors duration-300 ${
                highContrast ? 'text-white' : 'text-green-600'
              }`}>
                POEMS Framework
              </h2>
              <p className={`text-sm md:text-base transition-colors duration-300 ${
                highContrast ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Explore People, Objects, Environments, Messages, and Services in context
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={exportToCSV}
                    variant="outline"
                    className={`rounded-xl transition-colors duration-300 ${
                      highContrast
                        ? 'bg-neutral-800 border-white text-white hover:bg-neutral-700'
                        : ''
                    }`}
                    aria-label="Export POEMS data to CSV"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download POEMS matrix as CSV file</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={clearExamples}
                    variant="outline"
                    className={`rounded-xl transition-colors duration-300 ${
                      highContrast
                        ? 'bg-neutral-800 border-white text-white hover:bg-neutral-700'
                        : ''
                    }`}
                    aria-label="Clear example data"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Examples
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove example observations and start fresh</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Mobile Hint */}
          <div className={`mb-4 md:hidden rounded-xl p-3 border-2 transition-colors duration-300 ${
            highContrast
              ? 'bg-neutral-800 border-blue-500'
              : 'bg-blue-50 border-blue-200'
          }`}>
            <p className={`text-sm text-center ${
              highContrast ? 'text-blue-400' : 'text-blue-700'
            }`}>
              💡 Swipe left/right to see all columns
            </p>
          </div>

          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="inline-block min-w-full px-4 md:px-0">
              <div className={`overflow-hidden rounded-2xl border-2 transition-colors duration-300 ${
                highContrast ? 'border-white' : 'border-slate-200'
              }`}>
                <table className="min-w-full divide-y divide-slate-200" role="table">
                  <thead className={`transition-colors duration-300 ${
                    highContrast
                      ? 'bg-neutral-800'
                      : 'bg-gradient-to-r from-green-100 to-teal-100'
                  }`}>
                    <tr>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-left text-sm text-green-800">#</th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-left text-sm text-green-800">People</th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-left text-sm text-green-800">Objects</th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-left text-sm text-green-800">Environments</th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-left text-sm text-green-800">Messages</th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-left text-sm text-green-800">Services</th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-left text-sm text-green-800">Actions</th>
                    </tr>
                  </thead>

                  <tbody className={highContrast ? 'divide-neutral-700' : 'divide-slate-200'}>
                    {filteredObservations.map((observation, index) => (
                      <tr key={observation.id}>
                        <td className="px-3 md:px-6 py-3 text-sm">
                          {observation.id === 'example' ? (
                            <Badge
                              variant="outline"
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold leading-tight shadow-sm transition-all duration-300 ${
                              highContrast
                              ? 'bg-neutral-700 border-yellow-500 text-yellow-400'
                              : 'bg-yellow-50 border-yellow-400 text-yellow-800'
                              }`}
                              >
                              <span role="img" aria-label="pin" className="text-pink-500 text-base">📌</span>
                              Example
                            </Badge>

                          ) : (
                            <span className={highContrast ? 'text-slate-300' : 'text-slate-700'}>
                              Observation {index}
                            </span>
                          )}
                        </td>

                        {['people', 'objects', 'environments', 'messages', 'services'].map((field) => (
                          <td key={field} className="px-3 md:px-6 py-3 text-sm">
                            <Textarea
                              placeholder={`Enter ${field}...`}
                              value={(observation as any)[field]}
                              onChange={(e) => updateObservation(observation.id, field as keyof ObservationRow, e.target.value)}
                              className={`min-h-24 rounded-lg text-sm ${
                                highContrast ? 'bg-neutral-800 text-white border-neutral-600' : ''
                              }`}
                              disabled={observation.id === 'example'}
                            />
                          </td>
                        ))}

                        <td className="px-3 md:px-6 py-3 text-sm text-right">
                          {observation.id !== 'example' && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => deleteObservation(observation.id)}
                                  className={`transition-colors ${
                                    highContrast
                                      ? 'text-slate-300 hover:text-red-400'
                                      : 'text-slate-400 hover:text-red-500'
                                  }`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>Delete this observation</TooltipContent>
                            </Tooltip>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={addObservation}
                className={`w-full mt-4 rounded-xl text-white transition-colors duration-300 ${
                  highContrast
                    ? 'bg-green-700 hover:bg-green-600'
                    : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600'
                }`}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Observation
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create a new POEMS observation row</p>
            </TooltipContent>
          </Tooltip>
        </Card>
      </div>
    </TooltipProvider>
  );
}
