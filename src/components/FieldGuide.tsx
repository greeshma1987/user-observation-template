import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Footer } from './Footer';
import { CheckCircle2, Users, Gamepad2, Clock, MapPin, Eye, PenTool, Target, Info } from 'lucide-react';

export function FieldGuide() {
  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-0">
        <div className="text-center mb-8">
          <h2 className="text-pink-600 mb-2">🧠 How to Use in Field Studies</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A step-by-step guide to conducting effective user observations with children and digital games
          </p>
        </div>

        {/* Quick Start Alert */}
        <Alert className="mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-slate-700">
            <strong>Quick Start:</strong> Begin with the AEIOU framework for rapid field notes, then use POEMS for deeper case studies. 
            Always synthesize findings in the Insights Dashboard to identify actionable patterns.
          </AlertDescription>
        </Alert>

        {/* 3-Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-200 shadow-md">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <div className="text-blue-600 mb-2">1️⃣ Observe</div>
              <h3 className="text-slate-800 mb-3">Watch & Listen</h3>
              <p className="text-slate-600 text-sm">
                Pay attention to activities, interactions, and emotional responses. 
                Note the environment and objects being used without interference.
              </p>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl bg-gradient-to-br from-pink-100 to-pink-50 border-2 border-pink-200 shadow-md">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <PenTool className="w-8 h-8 text-white" />
              </div>
              <div className="text-pink-600 mb-2">2️⃣ Document</div>
              <h3 className="text-slate-800 mb-3">Record Patterns</h3>
              <p className="text-slate-600 text-sm">
                Use the AEIOU or POEMS framework to systematically capture observations. 
                Tag emotions and categorize by type (positive, neutral, frustration).
              </p>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-200 shadow-md">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="text-green-600 mb-2">3️⃣ Synthesize</div>
              <h3 className="text-slate-800 mb-3">Derive Insights</h3>
              <p className="text-slate-600 text-sm">
                Identify patterns, behavioral triggers, and translate findings into 
                actionable design implications for improving the gaming experience.
              </p>
            </div>
          </Card>
        </div>

        {/* Best Practices */}
        <Card className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100 mb-6">
          <h3 className="text-purple-700 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Best Practices for Observing Children
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-slate-800">Get Consent</p>
                  <p className="text-sm text-slate-600">
                    Always obtain parental/guardian permission and child assent before observing
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-slate-800">Be Unobtrusive</p>
                  <p className="text-sm text-slate-600">
                    Minimize your presence to capture natural behavior; avoid leading questions
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-slate-800">Time Appropriately</p>
                  <p className="text-sm text-slate-600">
                    Keep sessions short (15-30 min) based on age; watch for fatigue signals
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Gamepad2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-slate-800">Context Matters</p>
                  <p className="text-sm text-slate-600">
                    Note distractions, peer influence, and environmental factors that affect play
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PenTool className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-slate-800">Document Immediately</p>
                  <p className="text-sm text-slate-600">
                    Record observations in real-time or immediately after to ensure accuracy
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-slate-800">Multiple Contexts</p>
                  <p className="text-sm text-slate-600">
                    Observe in varied settings (home, school, outdoor) for comprehensive insights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Framework Comparison */}
        <Card className="p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-100">
          <h3 className="text-yellow-700 mb-4">📋 When to Use Each Framework</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-blue-500 hover:bg-blue-600">AEIOU</Badge>
                <span className="text-slate-700">Activity-Focused</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Best for capturing <strong>moment-to-moment interactions</strong> and behaviors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Ideal for <strong>rapid field observations</strong> and quick note-taking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Focus on <strong>what, where, how, and who</strong> in discrete observations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Great for <strong>multiple short observations</strong> across different children</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-green-500 hover:bg-green-600">POEMS</Badge>
                <span className="text-slate-700">Context-Focused</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Best for understanding <strong>broader context and ecosystem</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Ideal for <strong>in-depth case studies</strong> of individual players</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Focus on <strong>environmental and social factors</strong> influencing play</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Great for <strong>extended observation sessions</strong> (20+ minutes)</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Tips Footer */}
        <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border-2 border-teal-100">
          <p className="text-sm text-slate-700">
            <strong className="text-teal-700">💡 Pro Tip:</strong> Combine both frameworks for comprehensive research. 
            Use AEIOU for initial broad observations, then POEMS for deeper dives into interesting cases. 
            Always review the Insights Dashboard to identify patterns across multiple sessions.
          </p>
        </div>
      </Card>
      <Footer />
    </div>
  );
}