#!/usr/bin/env node
/**
 * Genera la estructura .amplify-hosting requerida por AWS Amplify Hosting.
 * Soluciona el error "Failed to find the deploy-manifest.json file"
 */
import { mkdirSync, cpSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const root = join(__dirname, '..')
const distDir = join(root, 'dist')
const amplifyDir = join(root, '.amplify-hosting')
const staticDir = join(amplifyDir, 'static')

mkdirSync(staticDir, { recursive: true })
cpSync(distDir, staticDir, { recursive: true })

const manifest = {
  version: 1,
  routes: [{ path: '/*', target: { kind: 'Static' } }],
  framework: { name: 'vite', version: '5.0.0' }
}
writeFileSync(join(amplifyDir, 'deploy-manifest.json'), JSON.stringify(manifest, null, 2))
console.log('Amplify output: .amplify-hosting/ created with deploy-manifest.json')
