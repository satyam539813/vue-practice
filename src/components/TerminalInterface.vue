<template>
  <div class="terminal-container relative min-h-screen bg-black text-green-400 p-4 scanlines">
    <!-- Matrix Background -->
    <canvas ref="matrixCanvas" class="matrix-bg"></canvas>
    
    <!-- Terminal Header -->
    <div class="terminal-header mb-4 border-b border-green-400 pb-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-red-500 rounded-full"></div>
          <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div class="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div class="text-sm">{{ currentTime }}</div>
      </div>
      <div class="text-center mt-2">
        <span class="neon text-xl">HACKER_PORTFOLIO.EXE</span>
      </div>
    </div>

    <!-- Terminal Content -->
    <div class="terminal-content">
      <!-- Boot sequence -->
      <div v-if="showBootSequence" class="boot-sequence">
        <div v-for="(line, index) in bootLines" :key="index" 
             :class="{ 'opacity-100': index <= currentBootLine, 'opacity-0': index > currentBootLine }"
             class="transition-opacity duration-100">
          <span class="text-red-400">[{{ formatTime() }}]</span> {{ line }}
        </div>
      </div>

      <!-- Main Interface -->
      <div v-else class="main-interface">
        <!-- Command History -->
        <div class="command-history mb-4">
          <div v-for="(cmd, index) in commandHistory" :key="index" class="mb-2">
            <div class="text-green-400">
              <span class="text-red-400">root@portfolio:~$</span> {{ cmd.command }}
            </div>
            <div v-html="cmd.output" class="ml-4 text-green-300"></div>
          </div>
        </div>

        <!-- Current Command Line -->
        <div class="current-command flex items-center">
          <span class="text-red-400">root@portfolio:~$</span>
          <input 
            ref="commandInput"
            v-model="currentCommand" 
            @keyup.enter="executeCommand"
            @keyup.tab.prevent="autoComplete"
            class="bg-transparent border-none outline-none text-green-400 ml-2 flex-1 font-mono"
            :class="{ 'typing': isTyping }"
            placeholder="Type 'help' to start..."
            autofocus
          />
        </div>

        <!-- Help Panel -->
        <div v-if="showHelp" class="help-panel mt-4 border border-green-400 p-4 bg-green-900/10">
          <div class="text-green-400 font-bold mb-2">AVAILABLE COMMANDS:</div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div v-for="cmd in availableCommands" :key="cmd.name" class="flex">
              <span class="text-yellow-400 w-20">{{ cmd.name }}</span>
              <span class="text-gray-400">- {{ cmd.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Code Particles -->
    <div class="code-particles">
      <div v-for="i in 20" :key="i" 
           :class="`particle-${i}`"
           class="absolute text-green-400/20 text-xs animate-pulse"
           :style="getParticleStyle(i)">
        {{ getRandomCode() }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'

const matrixCanvas = ref(null)
const commandInput = ref(null)
const currentCommand = ref('')
const commandHistory = ref([])
const showBootSequence = ref(true)
const currentBootLine = ref(-1)
const showHelp = ref(false)
const isTyping = ref(false)
const currentTime = ref('')

const bootLines = [
  'INITIALIZING HACKER PORTFOLIO...',
  'Loading neural networks... OK',
  'Establishing secure connection... OK',
  'Decrypting personal data... OK',
  'Bypassing firewall... OK',
  'Accessing mainframe... OK',
  'Loading skills database... OK',
  'Initializing project archives... OK',
  'System ready. Welcome to the matrix.',
  'Type "help" to begin exploration...'
]

const availableCommands = [
  { name: 'help', description: 'Show available commands' },
  { name: 'about', description: 'Display personal information' },
  { name: 'skills', description: 'List technical abilities' },
  { name: 'projects', description: 'Show project portfolio' },
  { name: 'contact', description: 'Get contact information' },
  { name: 'hack', description: 'Initialize hacking sequence' },
  { name: 'matrix', description: 'Enter the matrix' },
  { name: 'clear', description: 'Clear terminal' },
  { name: 'whoami', description: 'Display current user' },
  { name: 'ls', description: 'List directory contents' },
  { name: 'cat', description: 'Display file contents' },
  { name: 'sudo', description: 'Execute with admin privileges' }
]

const codeSnippets = [
  'function()', '{ }', 'const x =', 'if (true)', 'return false;', 
  'async/await', '=> {}', 'console.log', 'npm install', 'git commit',
  '0x1337', 'while(1)', 'try/catch', 'import *', 'export default'
]

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
  initMatrixEffect()
  startBootSequence()
})

const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString()
}

const formatTime = () => {
  return new Date().toLocaleTimeString()
}

const startBootSequence = async () => {
  for (let i = 0; i < bootLines.length; i++) {
    currentBootLine.value = i
    await new Promise(resolve => setTimeout(resolve, 300))
  }
  
  setTimeout(() => {
    showBootSequence.value = false
    nextTick(() => {
      commandInput.value?.focus()
    })
  }, 1000)
}

const executeCommand = () => {
  const cmd = currentCommand.value.trim().toLowerCase()
  if (!cmd) return

  const output = processCommand(cmd)
  commandHistory.value.push({
    command: currentCommand.value,
    output: output
  })

  currentCommand.value = ''
  
  // Scroll to bottom
  nextTick(() => {
    window.scrollTo(0, document.body.scrollHeight)
  })
}

const processCommand = (cmd) => {
  const [command, ...args] = cmd.split(' ')
  
  switch (command) {
    case 'help':
      showHelp.value = true
      return '<span class="text-yellow-400">Command reference displayed above. Try any command!</span>'
    
    case 'about':
      return `
        <div class="text-green-400">
          <div class="text-red-400 font-bold">CLASSIFIED PROFILE ACCESSED</div>
          <div class="mt-2">
            <div><span class="text-yellow-400">Name:</span> Elite Developer</div>
            <div><span class="text-yellow-400">Status:</span> Active</div>
            <div><span class="text-yellow-400">Specialization:</span> Full-Stack Hacking</div>
            <div><span class="text-yellow-400">Years Active:</span> 5+</div>
            <div><span class="text-yellow-400">Threat Level:</span> Maximum</div>
          </div>
          <div class="mt-2 text-gray-400">
            A mysterious figure in the digital underground, known for crafting
            elegant code and breaking through impossible challenges.
          </div>
        </div>
      `
    
    case 'skills':
      return `
        <div class="text-green-400">
          <div class="text-red-400 font-bold">SKILL MATRIX ACCESSED</div>
          <div class="mt-2 grid grid-cols-2 gap-2">
            <div><span class="text-yellow-400">JavaScript:</span> ████████████ 95%</div>
            <div><span class="text-yellow-400">Vue.js:</span> ███████████░ 90%</div>
            <div><span class="text-yellow-400">React:</span> ██████████░░ 85%</div>
            <div><span class="text-yellow-400">Node.js:</span> █████████░░░ 80%</div>
            <div><span class="text-yellow-400">Python:</span> ████████░░░░ 75%</div>
            <div><span class="text-yellow-400">Hacking:</span> ████████████ 99%</div>
          </div>
        </div>
      `
    
    case 'projects':
      return `
        <div class="text-green-400">
          <div class="text-red-400 font-bold">PROJECT ARCHIVES DECRYPTED</div>
          <div class="mt-2 space-y-2">
            <div class="border-l-2 border-yellow-400 pl-2">
              <div class="text-yellow-400">Project: NEURAL_NETWORK_V2</div>
              <div class="text-gray-400">AI-powered web application with real-time learning</div>
              <div class="text-xs text-green-300">Status: CLASSIFIED</div>
            </div>
            <div class="border-l-2 border-yellow-400 pl-2">
              <div class="text-yellow-400">Project: QUANTUM_DASHBOARD</div>
              <div class="text-gray-400">Next-gen analytics platform with quantum computing</div>
              <div class="text-xs text-green-300">Status: ACTIVE</div>
            </div>
            <div class="border-l-2 border-yellow-400 pl-2">
              <div class="text-yellow-400">Project: CRYPTO_FORTRESS</div>
              <div class="text-gray-400">Unbreakable cryptocurrency trading platform</div>
              <div class="text-xs text-green-300">Status: DEPLOYED</div>
            </div>
          </div>
        </div>
      `
    
    case 'contact':
      return `
        <div class="text-green-400">
          <div class="text-red-400 font-bold">SECURE COMMUNICATION CHANNELS</div>
          <div class="mt-2">
            <div><span class="text-yellow-400">Email:</span> hacker@darkweb.onion</div>
            <div><span class="text-yellow-400">Signal:</span> +1-555-HACK-ME</div>
            <div><span class="text-yellow-400">GitHub:</span> github.com/elite-hacker</div>
            <div><span class="text-yellow-400">LinkedIn:</span> [REDACTED]</div>
            <div class="text-red-400 mt-2">⚠️ All communications are encrypted</div>
          </div>
        </div>
      `
    
    case 'hack':
      startHackingSequence()
      return '<span class="text-red-400">Initiating hacking sequence...</span>'
    
    case 'matrix':
      return '<span class="text-green-400 glitch">Welcome to the Matrix, Neo...</span>'
    
    case 'clear':
      commandHistory.value = []
      showHelp.value = false
      return ''
    
    case 'whoami':
      return '<span class="text-yellow-400">root</span>'
    
    case 'ls':
      return `
        <div class="text-green-400">
          <div>drwxr-xr-x  skills/</div>
          <div>drwxr-xr-x  projects/</div>
          <div>-rw-r--r--  about.txt</div>
          <div>-rw-r--r--  contact.enc</div>
          <div>-rwx------  hack.exe</div>
        </div>
      `
    
    case 'cat':
      if (args[0] === 'about.txt') {
        return '<span class="text-green-400">Elite hacker with 5+ years of experience in digital warfare.</span>'
      }
      return '<span class="text-red-400">File not found or access denied.</span>'
    
    case 'sudo':
      return '<span class="text-red-400">Access granted. You now have root privileges.</span>'
    
    default:
      return `<span class="text-red-400">Command not found: ${command}</span>`
  }
}

const startHackingSequence = () => {
  const hackingSteps = [
    'Scanning for vulnerabilities...',
    'Found 127 open ports',
    'Attempting SQL injection...',
    'Bypassing authentication...',
    'Escalating privileges...',
    'Access granted to mainframe',
    'Downloading classified files...',
    'Covering tracks...',
    'Hack complete. Welcome to the system.'
  ]
  
  let step = 0
  const interval = setInterval(() => {
    if (step < hackingSteps.length) {
      commandHistory.value.push({
        command: '',
        output: `<span class="text-red-400">[HACKING] ${hackingSteps[step]}</span>`
      })
      step++
    } else {
      clearInterval(interval)
    }
  }, 800)
}

const getParticleStyle = (index) => {
  return {
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 4}s`
  }
}

const getRandomCode = () => {
  return codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
}

const initMatrixEffect = () => {
  const canvas = matrixCanvas.value
  const ctx = canvas.getContext('2d')
  
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
  const matrixArray = matrix.split("")
  
  const fontSize = 10
  const columns = canvas.width / fontSize
  
  const drops = []
  for(let x = 0; x < columns; x++) {
    drops[x] = 1
  }
  
  const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    ctx.fillStyle = '#00ff00'
    ctx.font = fontSize + 'px monospace'
    
    for(let i = 0; i < drops.length; i++) {
      const text = matrixArray[Math.floor(Math.random() * matrixArray.length)]
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)
      
      if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
  }
  
  setInterval(draw, 35)
}
</script>

<style scoped>
.code-particles .absolute {
  animation: float 8s infinite linear;
}

@keyframes float {
  0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
}

.particle-1 { animation-delay: 0s; }
.particle-2 { animation-delay: 0.5s; }
.particle-3 { animation-delay: 1s; }
.particle-4 { animation-delay: 1.5s; }
.particle-5 { animation-delay: 2s; }
.particle-6 { animation-delay: 2.5s; }
.particle-7 { animation-delay: 3s; }
.particle-8 { animation-delay: 3.5s; }
.particle-9 { animation-delay: 4s; }
.particle-10 { animation-delay: 4.5s; }
.particle-11 { animation-delay: 5s; }
.particle-12 { animation-delay: 5.5s; }
.particle-13 { animation-delay: 6s; }
.particle-14 { animation-delay: 6.5s; }
.particle-15 { animation-delay: 7s; }
.particle-16 { animation-delay: 7.5s; }
.particle-17 { animation-delay: 8s; }
.particle-18 { animation-delay: 8.5s; }
.particle-19 { animation-delay: 9s; }
.particle-20 { animation-delay: 9.5s; }
</style>