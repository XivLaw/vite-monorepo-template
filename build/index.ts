import { build } from 'vite'
import { baseConfig, createRollupOptions,createBuildOptions } from './config'
const packageName = process.argv[4]

build({
  ...baseConfig,
  build: {
    ...createRollupOptions(packageName),
    ...createBuildOptions(packageName)
  }
})