import { useState } from 'react';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { TrendingUp, Zap, Lightbulb, Smile, Meh, Frown, Laugh, Heart, AlertCircle, Download, HelpCircle } from 'lucide-react';

interface EmotionData {
  emotion: string;
  icon: any;
  color: string;
  count: number;
}

export function InsightsDashboard() {
  const [patterns, setPatterns] = useState('');
  const [triggers, setTriggers] = useState('');
  const [implications, setImplications] = useState('');
  
  const [emotions, setEmotions] = useState<EmotionData[]>([
    { emotion: 'Joy', icon: Laugh, color: 'bg-yellow-400', count: 0 },
    { emotion: 'Interest', icon: Smile, color: 'bg-blue-400', count: 0 },
    { emotion: 'Neutral', icon: Meh, color: 'bg-gray-400', count: 0 },
    { emotion: 'Frustration', icon: Frown, color: 'bg-red-400', count: 0 },
    { emotion: 'Excitement', icon: Heart, color: 'bg-pink-400', count: 0 },
    { emotion: 'Confusion', icon: AlertCircle, color: 'bg-orange-400', count: 0 }
  ]);

  const incrementEmotion = (index: number) => {
    setEmotions(prev =>
      prev.map((emotion, i) =>
        i === index ? { ...emotion, count: emotion.count + 1 } : emotion
      )
    );
  };

  const decrementEmotion = (index: number) => {
    setEmotions(prev =>
      prev.map((emotion, i) =>
        i === index && emotion.count > 0
          ? { ...emotion, count: emotion.count - 1 }
          : emotion
      )
    );
  };

  const exportInsights = () => {
    let content = '=== USER OBSERVATION INSIGHTS REPORT ===\n\n';
    content += `Generated: ${new Date().toLocaleString()}\n\n`;
    
    content += '--- EMOTION TRACKING ---\n';
    emotions.forEach(emotion => {
      if (emotion.count > 0) {
        content += `${emotion.emotion}: ${emotion.count}\n`;
      }
    });
    
    content += '\n--- PATTERNS NOTICED ---\n';
    content += patterns || '(No patterns recorded)\n';
    
    content += '\n--- BEHAVIORAL TRIGGERS ---\n';
    content += triggers || '(No triggers recorded)\n';
    
    content += '\n--- DESIGN IMPLICATIONS ---\n';
    content += implications || '(No implications recorded)\n';
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `research-insights-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url); // Prevent memory leak
  };

  const totalEmotions = emotions.reduce((sum, e) => sum + e.count, 0);

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <Card className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-0">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-yellow-600 mb-2">Insights Dashboard</h2>
              <p className="text-slate-600">
                Synthesize your observations into actionable insights and track emotional responses.
              </p>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    onClick={exportInsights}
                    variant="outline"
                    className="rounded-xl"
                    aria-label="Export insights report"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download all insights as a text report</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Emotion Tracker */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-slate-800">😊 Emotion Tracker</h3>
              <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                Affect Mapping
              </Badge>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className="text-slate-500 hover:text-slate-700 transition-colors"
                    aria-label="Help for emotion tracker"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Track emotional responses during observations. Click + to increment, - to decrement.</p>
                </TooltipContent>
              </Tooltip>
              {totalEmotions > 0 && (
                <span className="text-sm text-slate-500 ml-auto">
                  Total observations: {totalEmotions}
                </span>
              )}
            </div>
            
            <Card className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {emotions.map((emotion, index) => {
                  const Icon = emotion.icon;
                  return (
                    <div
                      key={emotion.emotion}
                      className="bg-white p-4 rounded-xl shadow-sm border border-slate-200"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-12 h-12 ${emotion.color} rounded-full flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                        </div>
                        <span className="text-sm text-slate-700">{emotion.emotion}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decrementEmotion(index)}
                            className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center text-slate-600"
                            aria-label={`Decrease ${emotion.emotion} count`}
                          >
                            −
                          </button>
                          <span className="text-slate-800 min-w-6 text-center" aria-live="polite">
                            {emotion.count}
                          </span>
                          <button
                            onClick={() => incrementEmotion(index)}
                            className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center text-slate-600"
                            aria-label={`Increase ${emotion.emotion} count`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Synthesis Areas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Patterns Noticed */}
            <Card className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-blue-700">Patterns Noticed</h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      className="text-slate-500 hover:text-slate-700 ml-auto"
                      aria-label="Help for patterns"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Document recurring behaviors, common themes, and consistent observations across multiple sessions</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-sm text-slate-600 mb-3 min-h-[40px]">
                What recurring behaviors or themes emerged?
              </p>
              <Textarea
                placeholder="e.g., Children under 8 tend to tap randomly when stuck, older kids seek help from peers..."
                value={patterns}
                onChange={(e) => setPatterns(e.target.value)}
                className="min-h-48 rounded-lg bg-white border-blue-200 flex-1"
                aria-label="Patterns noticed"
              />
            </Card>

            {/* Behavioral Triggers */}
            <Card className="p-5 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-100 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-pink-700">Behavioral Triggers</h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      className="text-slate-500 hover:text-slate-700 ml-auto"
                      aria-label="Help for triggers"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Identify specific stimuli or events that prompted particular reactions or behavior changes</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-sm text-slate-600 mb-3 min-h-[40px]">
                What caused specific reactions or behaviors?
              </p>
              <Textarea
                placeholder="e.g., Sudden sound effects caused startled reactions; reward animations increased engagement..."
                value={triggers}
                onChange={(e) => setTriggers(e.target.value)}
                className="min-h-48 rounded-lg bg-white border-pink-200 flex-1"
                aria-label="Behavioral triggers"
              />
            </Card>

            {/* Design Implications */}
            <Card className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-green-700">Design Implications</h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      className="text-slate-500 hover:text-slate-700 ml-auto"
                      aria-label="Help for implications"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Translate observations into actionable recommendations for game design and development</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-sm text-slate-600 mb-3 min-h-[40px]">
                How should these insights inform design decisions?
              </p>
              <Textarea
                placeholder="e.g., Consider adding progressive hints; reduce aggressive sound design; implement child-friendly error messages..."
                value={implications}
                onChange={(e) => setImplications(e.target.value)}
                className="min-h-48 rounded-lg bg-white border-green-200 flex-1"
                aria-label="Design implications"
              />
            </Card>
          </div>

          {/* Visual Legend */}
          <Card className="mt-6 p-5 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 border-2 border-slate-200">
            <h3 className="text-slate-800 mb-4">📊 Observation Legend</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg" aria-hidden="true" />
                <div>
                  <p className="text-slate-800">Positive Engagement</p>
                  <p className="text-xs text-slate-500">Active participation, joy, flow state</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-400 rounded-lg" aria-hidden="true" />
                <div>
                  <p className="text-slate-800">Neutral Observation</p>
                  <p className="text-xs text-slate-500">Standard behavior, routine actions</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-lg" aria-hidden="true" />
                <div>
                  <p className="text-slate-800">Frustration/Struggle</p>
                  <p className="text-xs text-slate-500">Confusion, abandonment, negative affect</p>
                </div>
              </div>
            </div>
          </Card>
        </Card>
      </div>
    </TooltipProvider>
  );
}