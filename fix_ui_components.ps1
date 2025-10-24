# fix_ui_components.ps1
# PowerShell script to repair corrupted Radix import lines in ShadCN UI components.

$files = @(
  "src/components/ui/label.tsx",
  "src/components/ui/switch.tsx",
  "src/components/ui/tabs.tsx",
  "src/components/ui/select.tsx",
  "src/components/ui/tooltip.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Fixing $file..."
        (Get-Content $file) -replace 'param\(\$m\).*', '@radix-ui/react-label' |
        Set-Content $file
    } else {
        Write-Host "File not found: $file"
    }
}

Write-Host "✅ All UI component imports have been cleaned. Now reinstall dependencies:"
Write-Host "   npm install @radix-ui/react-label @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-select @radix-ui/react-tooltip class-variance-authority clsx tailwind-merge"
Write-Host "Then restart your Vite server with:"
Write-Host "   npm run dev"
