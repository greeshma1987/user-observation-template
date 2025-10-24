import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { useTheme } from '../context/ThemeContext';

export function Footer() {
  const { highContrast } = useTheme();

  return (
    <footer 
      className="w-full mt-8"
      role="contentinfo"
      aria-label="Credits footer"
    >
      <Card 
        className={`border-0 rounded-2xl p-4 md:p-6 transition-colors duration-300 ${
          highContrast 
            ? 'bg-neutral-900 border border-neutral-700' 
            : 'bg-[#F5F7FA]'
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white">📋</span>
            </div>
            <div className="text-center md:text-left">
              <p className={`text-sm md:text-base ${
                highContrast ? 'text-slate-200' : 'text-slate-700'
              }`}>
                Template designed by{' '}
                <span className={`font-semibold ${
                  highContrast ? 'text-white' : 'text-slate-900'
                }`}>
                  Dr. Greeshma Sharma
                </span>
              </p>
            </div>
          </div>
          
          <Separator 
            orientation="vertical" 
            className={`hidden md:block h-8 ${
              highContrast ? 'bg-neutral-600' : 'bg-slate-300'
            }`} 
          />
          
          
        </div>
        
        <Separator className={`my-4 ${
          highContrast ? 'bg-neutral-700' : 'bg-slate-200'
        }`} />
        
        {/* Framework Citations */}
        <div className={`mb-4 p-3 rounded-lg ${
          highContrast 
            ? 'bg-neutral-800 border border-neutral-600' 
            : 'bg-white/50 border border-slate-200'
        }`}>
          <p className={`text-xs md:text-sm font-medium mb-2 ${
            highContrast ? 'text-slate-200' : 'text-slate-700'
          }`}>
            Framework Citations:
          </p>
          <div className={`space-y-1 text-xs ${
            highContrast ? 'text-slate-300' : 'text-slate-600'
          }`}>
            <p>
              <span className="font-semibold">AEIOU:</span> Robinson, R. E., Prokopoff, I., Cain, J., & Pokorny, J. (1991). 
              <span className="italic"> Mapping experiences: A guide to creating value through improved customer experience.</span>
            </p>
            <p>
              <span className="font-semibold">POEMS:</span> Plish, K. (2023). 
              <span className="italic"> The POEMS Framework for Human-Centered Design.</span>
            </p>
          </div>
        </div>
        
        <div className={`flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm ${
          highContrast ? 'text-slate-400' : 'text-slate-500'
        }`}>
          <p className="text-center md:text-left">
            User Observation Template for Children & Digital Games
          </p>
          <p>
            © {new Date().getFullYear()} • AEIOU & POEMS Frameworks
          </p>
        </div>
      </Card>
    </footer>
  );
}