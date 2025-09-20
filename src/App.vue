<template>
  <div id="app" class="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
    <TerminalInterface />
  </div>
</template>

<script setup>
import TerminalInterface from '@/components/TerminalInterface.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap');

* {
  font-family: 'JetBrains Mono', monospace !important;
}

body {
  margin: 0;
  padding: 0;
  background: #000;
  overflow: hidden;
}

/* Matrix rain effect */
.matrix-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

/* Glitch effects */
.glitch {
  animation: glitch 2s infinite;
}

@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

/* Typing animation */
.typing {
  border-right: 2px solid #00ff00;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { border-color: #00ff00; }
  51%, 100% { border-color: transparent; }
}

/* Neon glow */
.neon {
  text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00;
}

/* Scanlines */
.scanlines::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(transparent 50%, rgba(0, 255, 0, 0.03) 50%);
  background-size: 100% 4px;
  pointer-events: none;
}
</style>