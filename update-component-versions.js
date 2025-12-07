import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const componentsDir = "packages/core/app/components";

// 获取所有组件目录
const components = execSync(
  `find ${componentsDir} -maxdepth 1 -type d ! -path ${componentsDir}`,
  {
    encoding: "utf-8",
    cwd: process.cwd(),
  }
)
  .trim()
  .split("\n")
  .filter(Boolean);

// 根据提交次数计算版本号
function calculateVersion(commitCount) {
  if (commitCount <= 5) {
    return "0.0.1";
  } else if (commitCount <= 10) {
    return "0.0.2";
  } else if (commitCount <= 15) {
    return "0.0.3";
  } else if (commitCount <= 20) {
    return "0.0.4";
  } else if (commitCount <= 25) {
    return "0.0.5";
  } else if (commitCount <= 30) {
    return "0.0.6";
  } else if (commitCount <= 35) {
    return "0.0.7";
  } else if (commitCount <= 40) {
    return "0.0.8";
  } else if (commitCount <= 45) {
    return "0.0.9";
  } else if (commitCount <= 50) {
    return "0.1.0";
  } else if (commitCount <= 60) {
    return "0.1.1";
  } else if (commitCount <= 70) {
    return "0.1.2";
  } else if (commitCount <= 80) {
    return "0.1.3";
  } else if (commitCount <= 90) {
    return "0.1.4";
  } else if (commitCount <= 100) {
    return "0.1.5";
  } else if (commitCount <= 120) {
    return "0.2.0";
  } else if (commitCount <= 150) {
    return "0.3.0";
  } else if (commitCount <= 200) {
    return "0.4.0";
  } else if (commitCount <= 300) {
    return "0.5.0";
  } else if (commitCount <= 400) {
    return "0.6.0";
  } else if (commitCount <= 500) {
    return "0.7.0";
  } else if (commitCount <= 600) {
    return "0.8.0";
  } else {
    return "0.9.0";
  }
}

const results = [];

for (const componentPath of components) {
  const componentName = componentPath.split("/").pop();
  const packageJsonPath = join(componentPath, "package.json");

  try {
    // 检查 package.json 是否存在
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

    // 获取 git 提交次数
    const commitCount = parseInt(
      execSync(`git log --oneline --all -- ${componentPath}/ | wc -l`, {
        encoding: "utf-8",
        cwd: process.cwd(),
      }).trim()
    );

    const newVersion = calculateVersion(commitCount);
    const oldVersion = packageJson.version;

    if (oldVersion !== newVersion) {
      packageJson.version = newVersion;
      writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2) + "\n"
      );
      results.push({
        component: componentName,
        oldVersion,
        newVersion,
        commitCount,
      });
      console.log(
        `✓ ${componentName}: ${oldVersion} → ${newVersion} (${commitCount} commits)`
      );
    } else {
      console.log(
        `- ${componentName}: ${oldVersion} (${commitCount} commits, no change)`
      );
    }
  } catch (error) {
    console.error(`✗ ${componentName}: Error - ${error.message}`);
  }
}

console.log("\n=== 更新摘要 ===");
console.log(`总共检查了 ${components.length} 个组件`);
console.log(`更新了 ${results.length} 个组件的版本号\n`);

if (results.length > 0) {
  console.log("更新的组件:");
  results.forEach((r) => {
    console.log(
      `  ${r.component}: ${r.oldVersion} → ${r.newVersion} (${r.commitCount} commits)`
    );
  });
}
