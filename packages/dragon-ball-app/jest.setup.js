import '@testing-library/jest-dom' // Extiende los matchers de Jest
import { TextEncoder, TextDecoder } from 'util'

// Solución para posibles errores con TextEncoder/TextDecoder en JSDOM
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
