import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'

/** @type {import('rollup').RollupOptions} */
const config = {
  input: './out/connector.js',
  output: {
    name: 'main',
    format: 'iife',
    file: './cheats/connector.js'
  },
  plugins: [
    commonjs(),
    resolve(),
    copy({
      targets: [
        { src: 'src/assets', dest: 'cheats' }
      ]
    })
  ]
}
export default config