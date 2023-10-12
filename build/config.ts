import { resolve } from 'path'
import { defineConfig } from 'vite'
import type { BuildOptions } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Jsx from '@vitejs/plugin-vue-jsx'
import Eslint from 'vite-plugin-eslint'
// import { nodeExternals } from 'rollup-plugin-node-externals'
// import typescript from '@rollup/plugin-typescript'

import { libraryName } from './env'

export const baseConfig = defineConfig({
  plugins: [Jsx(), Vue(), Eslint()]
})

export const createRollupOptions = ( name?: string ) => {
  return {
    input: resolve(__dirname, `../packages/${name}/src/index.ts`),
    externals: ['vue'],
    plugins: [
      // {
      //   ...nodeExternals(),
      //   apply: 'build'
      // }
      // typescript({
      //   tsconfigOverride: {
      //     compilerOptions: {
      //       declarationDir: `../packages/${name}/dist`
      //     }
      //   }
      // })
    ]
  }
}

export const createBuildOptions = ( name?: string ) : BuildOptions => {
  return {
    
    lib: {
      entry: resolve(__dirname, `../packages/${name}/src/index.ts`),
      name: `${libraryName + name}`,
      formats: ['es', 'cjs', 'iife'],
      fileName: 'index'
    },
    outDir: resolve(__dirname, `../packages/${name}/dist`),

  }
}
