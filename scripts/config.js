// banner.svg の設定ファイル
// テキスト・色・フォント・アニメーション速度を変更して node scripts/generate-banner.js で再生成
const careerStartDate = new Date(2017, 3); // 2017年4月
const now = new Date();
const yearsOfExperience = Math.floor(
  (now - careerStartDate) / (365.25 * 24 * 60 * 60 * 1000)
);

module.exports = {
  width: 800,
  height: 300,
  lines: [
    { text: "const name = \"Keiichi Hagiwara\";", tokens: [
      { text: "const", color: "#569cd6" },
      { text: " name ", color: "#9cdcfe" },
      { text: "= ", color: "#d4d4d4" },
      { text: "\"Keiichi Hagiwara\"", color: "#ce9178" },
      { text: ";", color: "#d4d4d4" },
    ]},
    { text: "const role = \"Software Developer\";", tokens: [
      { text: "const", color: "#569cd6" },
      { text: " role ", color: "#9cdcfe" },
      { text: "= ", color: "#d4d4d4" },
      { text: "\"Software Developer\"", color: "#ce9178" },
      { text: ";", color: "#d4d4d4" },
    ]},
    { text: `const experience = ${yearsOfExperience}; // years since 2017`, tokens: [
      { text: "const", color: "#569cd6" },
      { text: " experience ", color: "#9cdcfe" },
      { text: "= ", color: "#d4d4d4" },
      { text: `${yearsOfExperience}`, color: "#b5cea8" },
      { text: "; ", color: "#d4d4d4" },
      { text: "// years since 2017", color: "#6a9955" },
    ]},
    { text: "const company = \"Hagyyyy Inc.\"; // CEO", tokens: [
      { text: "const", color: "#569cd6" },
      { text: " company ", color: "#9cdcfe" },
      { text: "= ", color: "#d4d4d4" },
      { text: "\"Hagyyyy Inc.\"", color: "#ce9178" },
      { text: "; ", color: "#d4d4d4" },
      { text: "// CEO", color: "#6a9955" },
    ]},
    { text: "const skills = [\"TypeScript\", \"Next.js\", \"Node.js\", \"PHP\", \"Python\"];", tokens: [
      { text: "const", color: "#569cd6" },
      { text: " skills ", color: "#9cdcfe" },
      { text: "= [", color: "#d4d4d4" },
      { text: "\"TypeScript\"", color: "#ce9178" },
      { text: ", ", color: "#d4d4d4" },
      { text: "\"Next.js\"", color: "#ce9178" },
      { text: ", ", color: "#d4d4d4" },
      { text: "\"Node.js\"", color: "#ce9178" },
      { text: ", ", color: "#d4d4d4" },
      { text: "\"PHP\"", color: "#ce9178" },
      { text: ", ", color: "#d4d4d4" },
      { text: "\"Python\"", color: "#ce9178" },
      { text: "];", color: "#d4d4d4" },
    ]},
    { text: "const passion = \"AI-Driven Development\";", tokens: [
      { text: "const", color: "#569cd6" },
      { text: " passion ", color: "#9cdcfe" },
      { text: "= ", color: "#d4d4d4" },
      { text: "\"AI-Driven Development\"", color: "#ce9178" },
      { text: ";", color: "#d4d4d4" },
    ]},
  ],
  font: {
    family: "'Courier New', 'Consolas', monospace",
  },
  colors: {
    bg: "#1e1e1e",
    titleBar: "#323233",
    activityBar: "#333333",
    sideBarHeader: "#252526",
    tab: "#1e1e1e",
    tabInactive: "#2d2d2d",
    tabBorder: "#1e1e1e",
    lineNumber: "#858585",
    lineNumberActive: "#c6c6c6",
    cursor: "#aeafad",
    border: "#474747",
    accent: "#007acc",
    minimap: "#3a3a3a",
    statusBar: "#007acc",
    statusBarText: "#ffffff",
  },
  typing: {
    charDurationSec: 0.08,
  },
};
