import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Download, FileCode, Folder, Copy, Check, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Alert, AlertDescription } from './ui/alert';

interface FileInfo {
  path: string;
  name: string;
  category: string;
  description: string;
}

const projectFiles: FileInfo[] = [
  // Main App
  { path: '/App.tsx', name: 'App.tsx', category: 'Main', description: 'Main application entry with tab navigation' },
  
  // Components
  { path: '/components/AEIOUFramework.tsx', name: 'AEIOUFramework.tsx', category: 'Components', description: 'AEIOU observation framework' },
  { path: '/components/POEMSFramework.tsx', name: 'POEMSFramework.tsx', category: 'Components', description: 'POEMS observation matrix' },
  { path: '/components/InsightsDashboard.tsx', name: 'InsightsDashboard.tsx', category: 'Components', description: 'Insights synthesis dashboard' },
  { path: '/components/FieldGuide.tsx', name: 'FieldGuide.tsx', category: 'Components', description: 'Usage instructions guide' },
  { path: '/components/Footer.tsx', name: 'Footer.tsx', category: 'Components', description: 'Footer with attributions' },
  { path: '/components/CodeDownloader.tsx', name: 'CodeDownloader.tsx', category: 'Components', description: 'Code download utility' },
  
  // Styles
  { path: '/styles/globals.css', name: 'globals.css', category: 'Styles', description: 'Global styles and Tailwind config' },
  
  // Documentation
  { path: '/SECURITY_AUDIT.md', name: 'SECURITY_AUDIT.md', category: 'Documentation', description: 'Security audit report' },
  { path: '/Attributions.md', name: 'Attributions.md', category: 'Documentation', description: 'Third-party attributions' },
  { path: '/guidelines/Guidelines.md', name: 'Guidelines.md', category: 'Documentation', description: 'Design and usage guidelines' },
];

export function CodeDownloader() {
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const copyPath = (path: string) => {
    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(path)
        .then(() => {
          setCopiedPath(path);
          setTimeout(() => setCopiedPath(null), 2000);
        })
        .catch(() => {
          // Fallback to legacy method
          fallbackCopy(path);
        });
    } else {
      // Use fallback immediately if Clipboard API not available
      fallbackCopy(path);
    }
  };

  const fallbackCopy = (text: string) => {
    try {
      // Create temporary textarea
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '-9999px';
      document.body.appendChild(textarea);
      
      // Select and copy
      textarea.focus();
      textarea.select();
      
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopiedPath(text);
          setTimeout(() => setCopiedPath(null), 2000);
        }
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      
      // Clean up
      document.body.removeChild(textarea);
    } catch (err) {
      console.error('Could not copy text:', err);
    }
  };

  const downloadProjectGuide = () => {
    const guideContent = `# User Observation Template - Download Guide

## 📋 Project Information
- **Name**: User Observation Template
- **Type**: React + TypeScript + Tailwind CSS
- **Framework**: AEIOU + POEMS Observation Frameworks
- **Generated**: ${new Date().toLocaleString()}

## 📁 File Structure
\`\`\`
├── App.tsx
├── Attributions.md
├── SECURITY_AUDIT.md
├── components/
│   ├── AEIOUFramework.tsx
│   ├── CodeDownloader.tsx
│   ├── FieldGuide.tsx
│   ├── Footer.tsx
│   ├── InsightsDashboard.tsx
│   ├── POEMSFramework.tsx
│   └── ui/
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── progress.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── tooltip.tsx
│       └── ... (other shadcn/ui components)
├── guidelines/
│   └── Guidelines.md
└── styles/
    └── globals.css
\`\`\`

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Modern web browser

### Installation Steps

1. **Create a new React + Vite project:**
   \`\`\`bash
   npm create vite@latest user-observation-template -- --template react-ts
   cd user-observation-template
   \`\`\`

2. **Install Tailwind CSS:**
   \`\`\`bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   \`\`\`

3. **Install dependencies:**
   \`\`\`bash
   npm install lucide-react class-variance-authority clsx tailwind-merge
   npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog
   npm install @radix-ui/react-checkbox @radix-ui/react-dialog
   npm install @radix-ui/react-label @radix-ui/react-progress
   npm install @radix-ui/react-select @radix-ui/react-separator
   npm install @radix-ui/react-switch @radix-ui/react-tabs
   npm install @radix-ui/react-tooltip @radix-ui/react-slot
   \`\`\`

4. **Setup shadcn/ui:**
   \`\`\`bash
   npx shadcn-ui@latest init
   \`\`\`

5. **Add required shadcn/ui components:**
   \`\`\`bash
   npx shadcn-ui@latest add accordion alert-dialog alert badge button
   npx shadcn-ui@latest add card checkbox dialog input label progress
   npx shadcn-ui@latest add select separator switch table tabs textarea tooltip
   \`\`\`

## 📝 How to Get Your Code

### Option 1: Manual Download from Figma Make
1. Open the file browser in Figma Make
2. Navigate to each file listed in "Files to Download" below
3. Copy the content of each file
4. Create the corresponding file in your local project
5. Paste the content

### Option 2: Use Browser Developer Tools
1. Open your browser's Developer Tools (F12)
2. Go to the Sources or Debugger tab
3. Find the file you want in the file tree
4. Right-click and select "Save as..." or copy the content

### Option 3: Export from Figma Make (if available)
- Look for an export or download option in your Figma Make interface
- Export the entire project as a ZIP file

## 📂 Files to Download

### Core Files (Required)
- \`/App.tsx\` - Main application component
- \`/styles/globals.css\` - Global styles and Tailwind configuration

### Framework Components (Required)
- \`/components/AEIOUFramework.tsx\`
- \`/components/POEMSFramework.tsx\`
- \`/components/InsightsDashboard.tsx\`
- \`/components/FieldGuide.tsx\`
- \`/components/Footer.tsx\`

### Optional Files
- \`/components/CodeDownloader.tsx\` - This download utility
- \`/SECURITY_AUDIT.md\` - Security documentation
- \`/Attributions.md\` - Third-party credits
- \`/guidelines/Guidelines.md\` - Design guidelines

### UI Components
All shadcn/ui components in \`/components/ui/\` can be regenerated using:
\`\`\`bash
npx shadcn-ui@latest add [component-name]
\`\`\`

## ⚙️ Configuration Files

### tailwind.config.js
\`\`\`javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\`

### package.json (partial)
\`\`\`json
{
  "name": "user-observation-template",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
\`\`\`

## 🎯 Key Features
- ✅ Dual framework support (AEIOU + POEMS)
- ✅ CSV export functionality with security hardening
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Accessibility compliance (ARIA labels, keyboard navigation)
- ✅ Local storage for data persistence
- ✅ High contrast mode
- ✅ Memory leak prevention
- ✅ Formula injection protection

## 🔒 Security Features
- CSV formula injection prevention
- Input sanitization
- XSS protection
- Blob URL cleanup
- Safe data export

## 📚 Documentation
- **SECURITY_AUDIT.md**: Complete security audit and fixes
- **Attributions.md**: Third-party library credits
- **Guidelines.md**: Design system and usage guidelines

## 🎨 Design System
- **Colors**: Soft pastels (#E3F2FD, #C8E6C9, #FFF9C4, #FCE4EC)
- **Typography**: Nunito Sans (system fallback)
- **Border Radius**: 12px for cards, 8px for inputs
- **Spacing**: Consistent 8px grid system

## 🐛 Troubleshooting

### Module not found errors
Make sure all dependencies are installed:
\`\`\`bash
npm install
\`\`\`

### Tailwind classes not working
Ensure your \`tailwind.config.js\` has the correct content paths

### Component styling issues
Verify that \`globals.css\` is imported in your main entry file

## 📞 Support
For issues or questions, refer to:
- React documentation: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- shadcn/ui: https://ui.shadcn.com

---
Generated: ${new Date().toLocaleString()}
`;

    const blob = new Blob([guideContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DOWNLOAD-GUIDE.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadFileList = () => {
    const fileList = `# User Observation Template - File List

## Files to Copy (${projectFiles.length} files)

${Object.entries(
  projectFiles.reduce((acc, file) => {
    if (!acc[file.category]) acc[file.category] = [];
    acc[file.category].push(file);
    return acc;
  }, {} as Record<string, FileInfo[]>)
).map(([category, files]) => `
### ${category} (${files.length} file${files.length > 1 ? 's' : ''})
${files.map(file => `
- **${file.name}**
  - Path: \`${file.path}\`
  - Description: ${file.description}
`).join('')}
`).join('\n')}

## How to Use This List

1. Open each file path in your code editor or browser
2. Copy the entire content
3. Create a new file with the same name in your project
4. Paste the content
5. Save the file

## Next Steps

After copying all files:
1. Install dependencies (see DOWNLOAD-GUIDE.md)
2. Run \`npm run dev\` to start development server
3. Open http://localhost:5173 in your browser

Generated: ${new Date().toLocaleString()}
`;

    const blob = new Blob([fileList], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FILE-LIST.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const groupedFiles = projectFiles.reduce((acc, file) => {
    if (!acc[file.category]) {
      acc[file.category] = [];
    }
    acc[file.category].push(file);
    return acc;
  }, {} as Record<string, FileInfo[]>);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <Card className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-0">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-purple-600 mb-2">Download Project Files</h1>
                <p className="text-slate-600">
                  Get setup instructions and file paths for your User Observation Template
                </p>
              </div>
              <FileCode className="w-12 h-12 text-purple-500" />
            </div>

            {/* Info Alert */}
            <Alert className="mb-6 border-blue-200 bg-blue-50">
              <Info className="w-4 h-4 text-blue-600" />
              <AlertDescription className="text-sm text-blue-800">
                <strong>How to download:</strong> Use the guides below to get setup instructions and file paths. 
                Then manually copy each file from the editor or use your browser's developer tools to save the source files.
              </AlertDescription>
            </Alert>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={downloadProjectGuide}
                    className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Setup Guide
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Complete setup instructions, dependencies, and configuration</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={downloadFileList}
                    variant="outline"
                    className="w-full rounded-xl"
                  >
                    <Folder className="w-4 h-4 mr-2" />
                    Download File List
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Checklist of all files with paths and descriptions</p>
                </TooltipContent>
              </Tooltip>

              <Badge variant="outline" className="flex items-center justify-center p-3 bg-blue-50 border-blue-200">
                <FileCode className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-blue-700">{projectFiles.length} Files</span>
              </Badge>
            </div>
          </Card>

          {/* File Lists by Category */}
          {Object.entries(groupedFiles).map(([category, files]) => (
            <Card key={category} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-0">
              <div className="flex items-center gap-3 mb-4">
                <Folder className="w-6 h-6 text-purple-500" />
                <h2 className="text-slate-800">{category}</h2>
                <Badge variant="outline" className="ml-auto">
                  {files.length} {files.length === 1 ? 'file' : 'files'}
                </Badge>
              </div>

              <div className="space-y-2">
                {files.map((file) => (
                  <div
                    key={file.path}
                    className="flex items-start justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors gap-4"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <FileCode className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-slate-800 mb-1">{file.name}</p>
                        <p className="text-xs text-slate-500 mb-1 truncate">{file.path}</p>
                        <p className="text-xs text-slate-600">{file.description}</p>
                      </div>
                    </div>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => copyPath(file.path)}
                          variant="ghost"
                          size="sm"
                          className="rounded-lg flex-shrink-0"
                        >
                          {copiedPath === file.path ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{copiedPath === file.path ? 'Copied!' : 'Copy file path'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </Card>
          ))}

          {/* Instructions */}
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
            <h3 className="text-blue-700 mb-3">📝 Step-by-Step Instructions</h3>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                <p><strong>Download the Setup Guide</strong> - Click "Download Setup Guide" to get complete installation instructions</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                <p><strong>Download the File List</strong> - Get a checklist of all files you need to copy</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">3</span>
                <p><strong>Copy File Paths</strong> - Click the copy button next to each file to copy its path</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">4</span>
                <p><strong>Access Files</strong> - Open each file in your editor or use browser DevTools (F12 → Sources)</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">5</span>
                <p><strong>Setup Project</strong> - Follow the setup guide to install dependencies and configure your project</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
              <p className="text-xs text-yellow-800">
                <strong>💡 Tip:</strong> The shadcn/ui components in <code className="bg-yellow-100 px-1 rounded">/components/ui/</code> can be 
                regenerated using <code className="bg-yellow-100 px-1 rounded">npx shadcn-ui@latest add [component-name]</code> after setting up your project.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}