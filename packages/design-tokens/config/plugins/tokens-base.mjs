import { readFileSync } from "fs";
import { join } from "path";

// 直接从 colors-w3c.json 文件读取透明度信息
function getAlphaMapFromW3CFile() {
  const alphaMap = {};

  try {
    // 读取 W3C 颜色文件
    const colorsW3CPath = join(process.cwd(), "output/colors-w3c.json");
    const colorsData = JSON.parse(readFileSync(colorsW3CPath, "utf-8"));

    function processToken(tokenKey, tokenValue, pathPrefix = "") {
      const fullPath = pathPrefix ? `${pathPrefix}.${tokenKey}` : tokenKey;

      if (tokenValue.$extensions?.alpha) {
        const alpha = tokenValue.$extensions.alpha;
        if (typeof alpha === "number") {
          alphaMap[fullPath] = alpha;
        } else if (typeof alpha === "object") {
          if (alpha.light !== undefined) {
            alphaMap[fullPath] = alpha.light;
            alphaMap[`${fullPath}-light`] = alpha.light;
          }
          if (alpha.dark !== undefined) {
            alphaMap[`${fullPath}-dark`] = alpha.dark;
          }
        }
      }

      // 递归处理嵌套对象
      if (typeof tokenValue === "object" && !tokenValue.$type) {
        for (const [subKey, subValue] of Object.entries(tokenValue)) {
          if (typeof subValue === "object") {
            processToken(subKey, subValue, fullPath);
          }
        }
      }
    }

    if (colorsData.color) {
      for (const [key, value] of Object.entries(colorsData.color)) {
        processToken(key, value, "color");
      }
    }
  } catch (error) {
    console.warn("[tokens-base] 无法读取 colors-w3c.json 文件:", error.message);
  }

  return alphaMap;
}

// 从 W3C 文件中获取所有 tokens，包括引用类型的
function getW3CTokens() {
  try {
    const colorsW3CPath = join(process.cwd(), "output/colors-w3c.json");
    const colorsData = JSON.parse(readFileSync(colorsW3CPath, "utf-8"));
    return colorsData;
  } catch (error) {
    console.warn("[tokens-base] 无法读取 colors-w3c.json:", error.message);
    return {};
  }
}

// 解析引用字符串 "{color.blue.500}" 为路径数组 ["color", "blue", "500"]
function parseReference(ref) {
  if (typeof ref !== "string" || !ref.startsWith("{") || !ref.endsWith("}")) {
    return null;
  }
  return ref.slice(1, -1).split(".");
}

// 根据路径获取嵌套对象的值
function getNestedValue(obj, path) {
  return path.reduce((current, key) => {
    return current && current[key];
  }, obj);
}

// 处理引用类型的 tokens，从被引用的 token 继承模式信息
function processReferencedTokens(tokens, w3cData) {
  const processedTokens = {};

  function processNestedTokens(obj, pathPrefix = "") {
    console.log(`[processReferencedTokens] 处理路径: ${pathPrefix || "root"}`);
    console.log(
      `[processReferencedTokens] 对象键: [${Object.keys(obj).join(", ")}]`
    );

    for (const [key, value] of Object.entries(obj)) {
      const currentPath = pathPrefix ? `${pathPrefix}.${key}` : key;

      console.log(
        `[processReferencedTokens] 检查 ${currentPath}:`,
        value?.$type,
        typeof value?.$value
      );

      if (value && typeof value === "object") {
        if (
          value.$type === "color" &&
          typeof value.$value === "string" &&
          value.$value.includes("{")
        ) {
          // 这是一个引用类型的颜色 token
          const tokenId = `color.${currentPath}`;

          console.log(
            `[processReferencedTokens] 发现引用类型 token: ${tokenId}, 引用: ${value.$value}`
          );

          // 检查是否已经在 tokens 中存在（已被 Terrazzo 处理）
          if (!tokens[tokenId]) {
            console.log(
              `[processReferencedTokens] ${tokenId} 不存在于 tokens 中，尝试添加`
            );

            // 解析引用
            const referencePath = parseReference(value.$value);
            console.log(
              `[processReferencedTokens] 解析引用路径:`,
              referencePath
            );

            if (referencePath) {
              // 获取被引用的 token 数据
              const referencedToken = getNestedValue(w3cData, referencePath);
              console.log(
                `[processReferencedTokens] 被引用的 token:`,
                !!referencedToken,
                !!referencedToken?.$extensions?.mode
              );

              if (referencedToken && referencedToken.$extensions?.mode) {
                // 被引用的 token 有模式信息，创建引用 token 的模式数据
                console.log(
                  `[tokens-base] 为引用 token ${tokenId} 添加模式信息，引用自 ${referencePath.join(
                    "."
                  )}`
                );

                processedTokens[tokenId] = {
                  $type: "color",
                  mode: {},
                };

                // 复制被引用 token 的所有模式
                for (const [mode, modeValue] of Object.entries(
                  referencedToken.$extensions.mode
                )) {
                  processedTokens[tokenId].mode[mode] = {
                    $value: modeValue,
                  };
                }

                // 也添加默认的 "." 模式
                if (referencedToken.$value) {
                  processedTokens[tokenId].mode["."] = {
                    $value: referencedToken.$value,
                  };
                }
              }
            }
          } else {
            console.log(
              `[processReferencedTokens] ${tokenId} 已存在于 tokens 中，跳过`
            );
          }
        } else if (!value.$type) {
          // 递归处理嵌套对象
          processNestedTokens(value, currentPath);
        }
      }
    }
  }

  // 处理 color 分组下的所有 tokens
  if (w3cData.color) {
    processNestedTokens(w3cData.color);
  }

  return processedTokens;
}

// 修复引用类型 tokens 的缺失模式
function fixReferencedTokenModes(tokens, w3cData) {
  console.log("[tokens-base] 修复引用 tokens 的缺失模式...");

  let fixedCount = 0;

  // 遍历所有已存在的 tokens，检查哪些是引用类型且缺少模式
  for (const [tokenId, token] of Object.entries(tokens)) {
    if (token.$type === "color" && token.aliasOf) {
      // 检查是否缺少 light/dark 模式
      const hasLightMode = token.mode?.light;
      const hasDarkMode = token.mode?.dark;

      if (!hasLightMode || !hasDarkMode) {
        // 找到被引用的 token
        const referencedTokenId = token.aliasOf;
        const referencedToken = tokens[referencedTokenId];

        if (referencedToken) {
          // 复制被引用 token 的模式到当前 token
          if (referencedToken.mode?.light && !hasLightMode) {
            token.mode.light = {
              $value: referencedToken.mode.light.$value,
              originalValue: `{${referencedTokenId}}`,
              aliasOf: referencedTokenId,
              aliasChain: [referencedTokenId],
            };
            fixedCount++;
          }

          if (referencedToken.mode?.dark && !hasDarkMode) {
            token.mode.dark = {
              $value: referencedToken.mode.dark.$value,
              originalValue: `{${referencedTokenId}}`,
              aliasOf: referencedTokenId,
              aliasChain: [referencedTokenId],
            };
            fixedCount++;
          }
        }
      }
    }
  }

  console.log(`[tokens-base] 修复完成，共添加了 ${fixedCount} 个缺失的模式`);
}

export default function tokensBase(userOptions = {}) {
  return {
    name: "tokens-base",
    enforce: "post", // 在其他插件之后运行

    async transform({ tokens, setTransform }) {
      // 从 W3C 文件中提取透明度配置和所有 token 数据
      const alphaMap = getAlphaMapFromW3CFile();
      const w3cData = getW3CTokens();

      // 修复引用类型 tokens 的缺失模式
      fixReferencedTokenModes(tokens, w3cData);

      // 为每个颜色 token 添加透明度信息
      for (const [id, token] of Object.entries(tokens)) {
        if (token.$type === "color") {
          // 获取透明度信息 - 先尝试精确匹配，再尝试不同格式
          const tokenId = id; // color.text.secondary
          const semanticName = id.replace(/^color\./, "").replace(/\./g, "-"); // text-secondary
          const dotName = id.replace(/^color\./, ""); // text.secondary

          const lightAlpha =
            alphaMap[tokenId] ??
            alphaMap[`${tokenId}-light`] ??
            alphaMap[semanticName] ??
            alphaMap[`${semanticName}-light`] ??
            alphaMap[dotName] ??
            alphaMap[`${dotName}-light`] ??
            1;

          const darkAlpha =
            alphaMap[`${tokenId}-dark`] ??
            alphaMap[`${semanticName}-dark`] ??
            alphaMap[`${dotName}-dark`] ??
            lightAlpha;

          // 添加透明度到 token 的各个模式
          for (const [mode, modeValue] of Object.entries(token.mode)) {
            const alpha = mode === "dark" ? darkAlpha : lightAlpha;

            // 将颜色信息转换为 JSON 字符串
            const colorData = {
              ...modeValue.$value,
              alpha: alpha,
              originalAlpha: modeValue.$value.alpha, // 保留原始 alpha
            };

            setTransform(id, {
              format: "js-with-alpha",
              mode: mode,
              localID: id,
              value: JSON.stringify(colorData),
            });
          }
        }
      }
    },

    async build({ tokens, getTransforms, outputFile }) {
      const output = [];

      // 生成文件头
      output.push("/** ------------------------------------------");
      output.push(" *  Autogenerated by ⛋ Terrazzo. DO NOT EDIT!");
      output.push(" * ------------------------------------------- */");
      output.push("");

      // 生成 tokens 对象
      output.push("export const tokens = {");

      // 获取所有带透明度的颜色 transforms
      const colorTransforms = getTransforms({ format: "js-with-alpha" });
      const groupedTokens = {};

      // 按 token ID 分组 - 颜色 tokens
      for (const transform of colorTransforms) {
        if (!groupedTokens[transform.localID]) {
          groupedTokens[transform.localID] = {};
        }
        // 解析 JSON 字符串回对象
        groupedTokens[transform.localID][transform.mode] = JSON.parse(
          transform.value
        );
      }

      // 添加其他类型的 tokens（breakpoints、spacing、typography 等）
      for (const [tokenId, token] of Object.entries(tokens)) {
        // 跳过已处理的颜色 tokens
        if (token.$type === "color") {
          continue;
        }

        // 处理其他类型的 tokens
        if (!groupedTokens[tokenId]) {
          groupedTokens[tokenId] = {};
        }

        // 添加到 tokens 对象中
        for (const [mode, modeData] of Object.entries(token.mode)) {
          groupedTokens[tokenId][mode] = modeData.$value;
        }
      }

      // 生成 tokens 对象
      for (const [tokenId, modes] of Object.entries(groupedTokens)) {
        output.push(`  "${tokenId}": {`);
        for (const [mode, value] of Object.entries(modes)) {
          if (typeof value === "object" && value.colorSpace) {
            // 颜色 token
            output.push(`    "${mode}": {`);
            output.push(`      "colorSpace": "${value.colorSpace}",`);
            output.push(
              `      "components": [${value.components.join(", ")}],`
            );
            output.push(`      "alpha": ${value.alpha},`);
            if (value.hex) {
              output.push(`      "hex": "${value.hex}"`);
            }
            output.push(`    },`);
          } else {
            // 其他类型的 token
            output.push(`    "${mode}": ${JSON.stringify(value)},`);
          }
        }
        output.push(`  },`);
      }

      output.push("};");
      output.push("");

      // 添加基础 token 函数
      output.push("/** Get individual token */");
      output.push('export function token(tokenID, modeName = ".") {');
      output.push("  return tokens[tokenID]?.[modeName];");
      output.push("}");
      output.push("");

      // 将基础内容存储到全局状态中，供 tokens-merger 使用
      if (!global.designTokensHelpers) {
        global.designTokensHelpers = {};
      }
      global.designTokensHelpers.base = output.join("\n");

      // 保存分组数据供其他插件使用
      this.groupedTokens = groupedTokens;
    },
  };
}
