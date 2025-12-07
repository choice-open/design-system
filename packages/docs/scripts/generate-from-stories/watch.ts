import path from "node:path"
import { storyExt, storybookStoriesDir, workspaceRoot } from "./constants"
import { buildAll, handleFileDelete, processSingleFile } from "./build"

export async function startWatch() {
  const { watch } = await import("chokidar")

  console.log("🔍 Building initial docs...")
  const startTime = Date.now()
  const cache = buildAll(false)
  const docCount = Object.keys(cache.entries).length
  console.log(`✅ Generated docs for ${docCount} components (${Date.now() - startTime}ms)`)
  console.log("👀 Watching for changes...\n")

  const watcher = watch(`${storybookStoriesDir}/**/*${storyExt}`, {
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 100,
      pollInterval: 50,
    },
  })

  watcher.on("add", (filePath) => {
    console.log(`➕ Added: ${path.relative(workspaceRoot, filePath)}`)
    if (processSingleFile(filePath, cache)) {
      console.log(`   ✅ Done\n`)
    }
  })

  watcher.on("change", (filePath) => {
    console.log(`📝 Changed: ${path.relative(workspaceRoot, filePath)}`)
    if (processSingleFile(filePath, cache)) {
      console.log(`   ✅ Done\n`)
    }
  })

  watcher.on("unlink", (filePath) => {
    handleFileDelete(filePath, cache)
  })

  process.on("SIGINT", () => {
    console.log("\n👋 Stopping watcher...")
    watcher.close()
    process.exit(0)
  })
}
