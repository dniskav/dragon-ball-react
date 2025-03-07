const os = require('os')
const { execSync } = require('child_process')

const platform = os.platform()
console.log(`🛠️ Detectando sistema operativo: ${platform}`)

try {
  if (platform === 'win32') {
    console.log('⚡ Instalando dependencias para Windows...')
    execSync('yarn add --dev @rollup/rollup-win32-x64', { stdio: 'inherit' })
  } else if (platform === 'linux') {
    console.log('⚡ Instalando dependencias para Linux...')
    execSync('yarn add --dev @rollup/rollup-linux-x64-gnu', {
      stdio: 'inherit',
    })
  } else if (platform === 'darwin') {
    console.log('⚡ Instalando dependencias para macOS...')
    execSync('yarn add --dev @rollup/rollup-darwin-arm64', { stdio: 'inherit' })
  } else {
    console.log("⚠️ Plataforma no reconocida. Usa 'yarn install' y revisa.")
  }
} catch (error) {
  console.error('❌ Error configurando dependencias:', error)
  process.exit(1)
}
