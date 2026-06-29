const fs = require('fs');
const path = require('path');

const replacements = [
  { from: 'bg-[#F7F4F0]', to: 'bg-[var(--bg)]' },
  { from: 'bg-white', to: 'bg-[var(--bg-card)]' },
  { from: 'text-[#111111]', to: 'text-[var(--text-primary)]' },
  { from: 'text-[#6B6457]', to: 'text-[var(--text-muted)]' },
  { from: 'bg-[#8C6A4A]', to: 'bg-[var(--accent)]' },
  { from: 'text-[#8C6A4A]', to: 'text-[var(--accent)]' },
  { from: 'border-[#8C6A4A]', to: 'border-[var(--accent)]' },
  { from: 'shadow-[#8C6A4A]', to: 'shadow-[var(--accent)]' },
  { from: 'fill-[#8C6A4A]', to: 'fill-[var(--accent)]' },
  { from: 'outline-[#8C6A4A]', to: 'outline-[var(--accent)]' },
  { from: 'bg-[#EDE5DA]', to: 'bg-[var(--accent-light)]' },
  { from: 'border-[#E2D9CF]', to: 'border-[var(--border)]' },
  { from: 'border-[#F7F4F0]', to: 'border-[var(--bg)]' }
];

const files = [
  'components/navbar.tsx',
  'app/generate/page.tsx',
  'app/pricing/page.tsx',
  'app/dashboard/page.tsx',
  'components/generator-form.tsx',
  'components/prompt-kit-output.tsx',
  'components/pricing-card.tsx',
  'components/paywall-gate.tsx',
  'components/hero-section.tsx',
  'app/page.tsx',
  'components/export-button.tsx',
  'components/generation-loader.tsx'
];

for (const file of files) {
  const fullPath = path.join('/home/vishwajeet-kumar/vibe-code', file);
  if (!fs.existsSync(fullPath)) continue;
  let content = fs.readFileSync(fullPath, 'utf8');
  for (const r of replacements) {
    content = content.replace(new RegExp(r.from.replace(/\[/g, '\\[').replace(/\]/g, '\\]'), 'g'), r.to);
  }
  fs.writeFileSync(fullPath, content);
}
console.log("Done replacing colors.");
