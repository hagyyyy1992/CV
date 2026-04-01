// banner.svg 内の CSS スタイル生成
// config の値からテキストのフォント・色・サイズを CSS として出力する
function generateStyles(config) {
  return `
    .typing-text {
      font-family: ${config.font.family};
      font-size: ${config.font.size}px;
      font-weight: bold;
      fill: ${config.colors.text};
    }
  `;
}

module.exports = { generateStyles };
