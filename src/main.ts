import './global.css'
import LogikaGame from './LogikaGame.svelte'

const app = new LogikaGame({
  target: document.getElementById('app')
})

export default app
