import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Switch } from "./components/ui/switch";
import { Label } from "./components/ui/label";
import { AEIOUFramework } from "./components/AEIOUFramework";
import { POEMSFramework } from "./components/POEMSFramework";
import { InsightsDashboard } from "./components/InsightsDashboard";
import { FieldGuide } from "./components/FieldGuide";
import { CodeDownloader } from "./components/CodeDownloader";
import { useTheme } from "./context/ThemeContext";
import {
  Clipboard,
  Users,
  Lightbulb,
  BookOpen,
  Moon,
  Download,
} from "lucide-react";

export default function App() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6">
          <div className="flex flex-col gap-4 mb-4 md:flex-row md:items-center md:justify-between">
            <div className="hidden md:block md:flex-1" />
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-0 px-2 ${
                darkMode ? "text-white" : "text-blue-600"
              }`}
            >
              User Observation Template
            </h1>
            <div className="flex md:flex-1 justify-center md:justify-end">
              <div
                className={`flex items-center gap-2 ${
                  darkMode
                    ? "bg-neutral-800 border border-neutral-600"
                    : "bg-white/80 border border-slate-200"
                } backdrop-blur-sm px-3 py-2 rounded-xl shadow-sm`}
              >
                <Moon
                  className={`w-4 h-4 ${
                    darkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                  aria-hidden="true"
                />
                <Label
                  htmlFor="dark-mode"
                  className="text-sm cursor-pointer whitespace-nowrap"
                >
                  Dark Theme
                </Label>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={toggleTheme}
                  aria-label="Toggle dark theme"
                />
              </div>
            </div>
          </div>
          <p
            className={`max-w-2xl mx-auto text-sm md:text-base px-2 ${
              darkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            A structured framework for observing and documenting how children
            engage with digital games
          </p>
        </header>

        {/* Tabs Navigation */}
        <Tabs defaultValue="aeiou" className="w-full">
          <TabsList
            className={`grid w-full grid-cols-5 mb-6 ${
              darkMode
                ? "bg-neutral-900 border border-neutral-700"
                : "bg-white/80 backdrop-blur-sm"
            } p-1 rounded-2xl shadow-sm items-center h-12`}
          >
            {[
              {
                value: "aeiou",
                icon: Clipboard,
                label: "AEIOU",
                gradient: "from-blue-200 to-blue-100",
                dark: "from-blue-700 to-blue-600",
              },
              {
                value: "poems",
                icon: Users,
                label: "POEMS",
                gradient: "from-green-200 to-green-100",
                dark: "from-green-700 to-green-600",
              },
              {
                value: "insights",
                icon: Lightbulb,
                label: "Insights",
                gradient: "from-yellow-200 to-yellow-100",
                dark: "from-yellow-600 to-yellow-500",
              },
              {
                value: "guide",
                icon: BookOpen,
                label: "Guide",
                gradient: "from-pink-200 to-pink-100",
                dark: "from-pink-700 to-pink-600",
              },
              {
                value: "download",
                icon: Download,
                label: "Download",
                gradient: "from-purple-200 to-purple-100",
                dark: "from-purple-700 to-purple-600",
              },
            ].map(({ value, icon: Icon, label, gradient, dark }) => (
              <TabsTrigger
                key={value}
                value={value}
                className={`flex items-center justify-center gap-2 h-10 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 
                ${
                  darkMode
                    ? `data-[state=active]:bg-gradient-to-r data-[state=active]:${dark} data-[state=active]:text-white`
                    : `data-[state=active]:bg-gradient-to-r data-[state=active]:${gradient} data-[state=active]:text-slate-700`
                } 
                hover:opacity-100 data-[state=inactive]:opacity-80`}
              >
                <Icon className="w-4 h-4 sm:mr-1" aria-hidden="true" />
                <span className="hidden sm:inline">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="aeiou" className="mt-0">
            <AEIOUFramework />
          </TabsContent>

          <TabsContent value="poems" className="mt-0">
            <POEMSFramework />
          </TabsContent>

          <TabsContent value="insights" className="mt-0">
            <InsightsDashboard />
          </TabsContent>

          <TabsContent value="guide" className="mt-0">
            <FieldGuide />
          </TabsContent>

          <TabsContent value="download" className="mt-0">
            <CodeDownloader />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}