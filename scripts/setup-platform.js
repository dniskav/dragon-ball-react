const { execSync } = require('child_process')
const fs = require('fs')

console.log('🛠️ Detectando sistema operativo...')
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
const packagePath = `node_modules/${packageName}`

// 🔍 Si ya está instalado, omitir instalación
if (fs.existsSync(packagePath)) {
  console.log(`✅ ${packageName} ya está instalado. Omitiendo instalación.`)
  process.exit(0)
}

// 🔄 Si está en CI (GitHub Actions), instalar el paquete
if (process.env.CI) {
  console.log(`🚀 Ejecutando en CI, instalando ${packageName}...`)
  try {
    execSync(`yarn add -D -W ${packageName} --ignore-scripts`, {
      stdio: 'inherit',
    })
    console.log(`✅ ${packageName} instalado con éxito en CI.`)
  } catch (err) {
    console.error(`❌ Error instalando ${packageName} en CI: ${err.message}`)
    process.exit(1)
  }
} else {
  // 🔧 Instalación normal en entornos locales
  console.log(`⚡ Instalando ${packageName} para ${platform} (${arch})...`)
  try {
    execSync(`yarn add -D -W ${packageName}`, { stdio: 'inherit' })
    console.log(`✅ ${packageName} instalado con éxito.`)
  } catch (err) {
    console.error(`❌ Error instalando ${packageName}: ${err.message}`)
    process.exit(1)
  }
}
