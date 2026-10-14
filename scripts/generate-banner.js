// banner.svg 生成スクリプト
// 実行: node scripts/generate-banner.js
// config.js の設定に基づいて VS Code 風タイピングアニメーション付きの SVG バナーを生成し、banner.svg に出力する
const fs = require("fs");
const path = require("path");
const config = require("./config");

function generateSVG(config) {
  const lines = config.lines;
  const c = config.colors;
  const W = config.width;
  const H = config.height;

  // Layout constants
  const titleBarH = 30;
  const tabBarH = 35;
  const statusBarH = 22;
  const editorTop = titleBarH + tabBarH;
  const editorBottom = H - statusBarH;
  const gutterW = 50;
  const lineHeight = 26;
  const fontSize = 14;
  const codePadLeft = gutterW + 16;
  const firstLineY = editorTop + 22;

  const lineDurations = lines.map((line) => line.text.length * config.typing.charDurationSec);
  const totalDuration = lineDurations.reduce((a, b) => a + b, 0);

  let clipsSVG = "";
  let textsSVG = "";
  let keyframesSVG = "";
  let cumulativeDelay = 0;

  lines.forEach((line, i) => {
    const y = firstLineY + i * lineHeight;
    const typingDuration = lineDurations[i];
    const textWidth = line.text.length * 8.4; // monospace char width at 14px

    // Line number
    const isFirstLine = i === 0;
    textsSVG += `
    <text font-family="${config.font.family}" fill="${isFirstLine ? c.lineNumberActive : c.lineNumber}" font-size="13"
      dominant-baseline="middle" x="${gutterW - 8}" y="${y}" text-anchor="end">${i + 1}</text>`;

    // Clip for typing reveal
    clipsSVG += `
    <clipPath id="clip${i}">
      <rect class="reveal${i}" x="${codePadLeft}" y="${y - 13}" width="0" height="${lineHeight}" />
    </clipPath>`;

    // Syntax-highlighted tokens
    let tokensSVG = "";
    let xOffset = 0;
    line.tokens.forEach((token) => {
      const tx = codePadLeft + xOffset * 8.4;
      tokensSVG += `<tspan x="${tx.toFixed(1)}" fill="${token.color}">${escapeXml(token.text)}</tspan>`;
      xOffset += token.text.length;
    });

    textsSVG += `
    <text clip-path="url(#clip${i})" font-family="${config.font.family}" font-size="${fontSize}"
      dominant-baseline="middle" y="${y}">${tokensSVG}</text>`;

    keyframesSVG += `
    .reveal${i} {
      animation: reveal${i} ${typingDuration.toFixed(2)}s steps(${line.text.length}) ${cumulativeDelay.toFixed(2)}s forwards;
    }
    @keyframes reveal${i} {
      from { width: 0; }
      to { width: ${textWidth.toFixed(0)}px; }
    }`;

    cumulativeDelay += typingDuration;
  });

  // Cursor position: hidden during typing, blinks at final position after typing ends
  const lastLine = lines[lines.length - 1];
  const lastY = firstLineY + (lines.length - 1) * lineHeight;
  const lastEndX = codePadLeft + lastLine.text.length * 8.4;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <style>
    ${keyframesSVG}
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    @keyframes cursorAppear {
      0%, 99.9% { opacity: 0; }
      100% { opacity: 1; }
    }
    .cursor {
      opacity: 0;
      transform: translate(${lastEndX.toFixed(1)}px, ${lastY - 9}px);
      animation: cursorAppear ${totalDuration.toFixed(2)}s forwards, blink 1s step-end ${totalDuration.toFixed(2)}s infinite;
    }
  </style>

  <defs>
    ${clipsSVG}
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="${c.bg}"/>

  <!-- Title bar -->
  <rect width="${W}" height="${titleBarH}" fill="${c.titleBar}"/>
  <circle cx="16" cy="15" r="6" fill="#ff5f56"/>
  <circle cx="36" cy="15" r="6" fill="#ffbd2e"/>
  <circle cx="56" cy="15" r="6" fill="#27c93f"/>
  <text font-family="${config.font.family}" fill="${c.lineNumber}" font-size="12"
    dominant-baseline="middle" x="${W / 2}" y="15" text-anchor="middle">profile.js — hagyyyy1992/CV</text>

  <!-- Tab bar -->
  <rect x="0" y="${titleBarH}" width="${W}" height="${tabBarH}" fill="${c.tabInactive}"/>
  <!-- Active tab -->
  <rect x="0" y="${titleBarH}" width="160" height="${tabBarH - 1}" fill="${c.tab}"/>
  <rect x="0" y="${titleBarH}" width="160" height="2" fill="${c.accent}"/>
  <text font-family="${config.font.family}" fill="#ffffff" font-size="12"
    dominant-baseline="middle" x="28" y="${titleBarH + 17}">JS</text>
  <text font-family="${config.font.family}" fill="#d4d4d4" font-size="12"
    dominant-baseline="middle" x="48" y="${titleBarH + 17}">profile.js</text>
  <!-- Inactive tab -->
  <rect x="160" y="${titleBarH}" width="140" height="${tabBarH - 1}" fill="${c.tabInactive}"/>
  <line x1="160" y1="${titleBarH}" x2="160" y2="${titleBarH + tabBarH}" stroke="${c.border}" stroke-width="1"/>
  <text font-family="${config.font.family}" fill="${c.lineNumber}" font-size="12"
    dominant-baseline="middle" x="188" y="${titleBarH + 17}">README.md</text>

  <!-- Gutter background -->
  <rect x="0" y="${editorTop}" width="${gutterW}" height="${editorBottom - editorTop}" fill="${c.bg}"/>

  <!-- Active line highlight -->
  <rect x="${gutterW}" y="${firstLineY - 13}" width="${W - gutterW}" height="${lineHeight}" fill="#2a2d2e" opacity="0.5"/>

  <!-- Gutter separator -->
  <line x1="${gutterW}" y1="${editorTop}" x2="${gutterW}" y2="${editorBottom}" stroke="#404040" stroke-width="1" opacity="0.5"/>

  <!-- Code lines -->
  ${textsSVG}

  <!-- Blinking cursor -->
  <rect class="cursor" width="2" height="18" fill="${c.cursor}" rx="0"/>

  <!-- Status bar -->
  <rect x="0" y="${editorBottom}" width="${W}" height="${statusBarH}" fill="${c.statusBar}"/>
  <text font-family="${config.font.family}" fill="${c.statusBarText}" font-size="11"
    dominant-baseline="middle" x="10" y="${editorBottom + 11}">main</text>
  <text font-family="${config.font.family}" fill="${c.statusBarText}" font-size="11"
    dominant-baseline="middle" x="${W - 10}" y="${editorBottom + 11}" text-anchor="end">JavaScript | UTF-8 | LF</text>
</svg>
`;
}

function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const svg = generateSVG(config);
const outputPath = path.join(__dirname, "..", "banner.svg");
fs.writeFileSync(outputPath, svg);
console.log("Generated banner.svg");
