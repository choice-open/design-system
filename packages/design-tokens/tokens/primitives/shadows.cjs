// 从 shadows.ts 提取的数据
// 生成时间: 2025-06-20T03:15:00.000Z

const shadowsLight = {
  xxs: [
    "0px 0px 2px 0px rgb(0 0 0 / 0.02)",
    "0px 1px 3px 0px rgb(0 0 0 / 0.1)",
    "0px 0px 0.5px 0px rgb(0 0 0 / 0.3)",
  ],
  xs: [
    "0px 1px 3px 0px rgba(0 0 0 / 0.15)",
    "0px 0px 0.5px 0px rgba(0 0 0 / 0.3)",
  ],
  sm: [
    "0px 1px 3px 0px rgba(0 0 0 / 0.1)",
    "0px 3px 8px 0px rgba(0 0 0 / 0.1)",
    "0px 0px 0.5px 0px rgba(0 0 0 / 0.18)",
  ],
  md: [
    "0px 1px 3px 0px rgba(0 0 0 / 0.1)",
    "0px 5px 12px 0px rgba(0 0 0 / 0.13)",
    "0px 0px 0.5px 0px rgba(0 0 0 / 0.15)",
  ],
  lg: [
    "0px 2px 5px 0px rgba(0 0 0 / 0.15)",
    "0px 10px 16px 0px rgba(0 0 0 / 0.12)",
    "0px 0px 0.5px 0px rgba(0 0 0 / 0.12)",
  ],
  xl: [
    "0px 2px 5px 0px rgba(0 0 0 / 0.15)",
    "0px 10px 24px 0px rgba(0 0 0 / 0.18)",
    "0px 0px 0.5px 0px rgba(0 0 0 / 0.08)",
  ],

  focus: [
    "0px 0px 0px 1px rgb(255 255 255 / 1)",
    "0px 0px 0px 2px rgb(13 153 255 / 1)",
  ],
  line: ["inset 0 0 0 1px rgba(0 0 0 / 0.1)"],
  "border-default": ["0 0 0 1px rgb(230 230 230 / 1)"],
  "border-default-inset": ["0 0 0 1px rgb(230 230 230 / 1) inset"],
};

const shadowsDark = {
  xxs: [
    "0px 0.5px 0px 0px rgba(255 255 255 / 0.1) inset",
    "0px 0px 2px 0px rgb(0 0 0 / 0.04)",
    "0px 1px 3px 0px rgb(0 0 0 / 0.1)",
    "0px 0px 0.5px 0px rgb(0 0 0 / 0.8)",
  ],
  xs: [
    "0px 0.5px 0px 0px rgba(255 255 255 / 0.1) inset",
    "0px 0px 0.5px 0px rgba(255 255 255 / 0.3) inset",
    "0px 0px 0.5px 0px rgba(0 0 0 / 0.5)",
    "0px 1px 3px 0px rgba(0 0 0 / 0.4)",
  ],
  sm: [
    "0px 0.5px 0px 0px rgba(255 255 255 / 0.08) inset",
    "0px 0px 0.5px 0px rgba(255 255 255 / 0.3) inset",
    "0px 1px 3px 0px rgba(0 0 0 / 0.35)",
    "0px 3px 8px 0px rgba(0 0 0 / 0.4)",
  ],
  md: [
    "0px 0.5px 0px 0px rgba(255 255 255 / 0.08) inset",
    "0px 0px 0.5px 0px rgba(255 255 255 / 0.3) inset",
    "0px 1px 3px rgba(0 0 0 / 0.5)",
    "0px 5px 12px rgba(0 0 0 / 0.35)",
  ],
  lg: [
    "0px 0.5px 0px 0px rgba(255 255 255 / 0.08) inset",
    "0px 0px 0.5px 0px rgba(255 255 255 / 0.35) inset",
    "0px 2px 5px 0px rgba(0 0 0 / 0.35)",
    "0px 10px 16px 0px rgba(0 0 0 / 0.35)",
  ],
  xl: [
    "0px 0.5px 0px 0px rgba(255 255 255 / 0.08) inset",
    "0px 0px 0.5px 0px rgba(255 255 255 / 0.35) inset",
    "0px 3px 5px 0px rgba(0 0 0 / 0.35)",
    "0px 10px 24px 0px rgba(0 0 0 / 0.45)",
  ],

  focus: [
    "0px 0px 0px 1px rgb(44 44 44 / 1)",
    "0px 0px 0px 2px rgb(12 140 233 / 1)",
  ],
  line: ["inset 0 0 0 1px rgba(255 255 255 / 0.1)"],
  "border-default": ["0 0 0 1px rgb(68 68 68 / 1)"],
  "border-default-inset": ["0 0 0 1px rgb(68 68 68 / 1) inset"],
};

const semanticShadows = {
  light: "xxs",
  shapes: "xs",
  stickies: "sm",
  tooltip: "md",
  menu: "lg",
  modals: "xl",
};

module.exports = {
  shadowsLight,
  shadowsDark,
  semanticShadows,
};
