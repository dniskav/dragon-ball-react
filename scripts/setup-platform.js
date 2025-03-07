const { execSync } = require('child_process')
const fs = require('fs')

console.log('🛠️ Detectando sistema operativo...')

// Evitar ejecución en CI (GitHub Actions)
if (process.env.CI) {
  console.log('🚀 Skipping setup-platform.js in CI (GitHub Actions)')
  process.exit(0)
}

const platform = process.platform
const arch = process.arch

const supportedPlatforms = ['darwin', 'linux', 'win32']
const supportedArchitectures = ['x64', 'arm64']

// Verifica si la plataforma y arquitectura están soportadas
if (
  !supportedPlatforms.includes(platform) ||
  !supportedArchitectures.includes(arch)
) {
  console.log(
    `❌ Plataforma o arquitectura no soportada: ${platform} (${arch})`
  )
  process.exit(1)
}

// Mapeo de paquetes según plataforma y arquitectura
const packageMap = {
  darwin: {
    arm64: '@rollup/rollup-darwin-arm64',
    x64: '@rollup/rollup-darwin-x64',
  },
  linux: {
    arm64: '@rollup/rollup-linux-arm64-gnu',
    x64: '@rollup/rollup-linux-x64-gnu',
  },
  win32: {
    arm64: '@rollup/rollup-win32-arm64-msvc',
    x64: '@rollup/rollup-win32-x64-msvc',
  },
}

// Determina qué paquete instalar
const packageName = packageMap[platform][arch]

console.log(`🔍 Verificando si ${packageName} ya está instalado...`)

// Revisa si el paquete ya está en node_modules
const packagePath = `node_modules/${packageName}`
try {
  if (fs.existsSync(packagePath)) {
    console.log(`✅ ${packageName} ya está instalado. Omitiendo instalación.`)
    process.exit(0)
  }
} catch (err) {
  console.error(`⚠️ Error verificando el paquete: ${err.message}`)
}

// Si no está instalado, lo agrega
console.log(`⚡ Instalando ${packageName} para ${platform} (${arch})...`)
try {
  execSync(`yarn add -D -W ${packageName}`, { stdio: 'inherit' })
  console.log(`✅ ${packageName} instalado con éxito.`)
} catch (err) {
  console.error(`❌ Error instalando ${packageName}: ${err.message}`)
  process.exit(1)
}
