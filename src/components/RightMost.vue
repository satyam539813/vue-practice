<template>
  <!-- Main container: Added transparency to the background color to enable the backdrop-blur effect -->
  <div
      ref="terminalElement"
      class="absolute w-[38%] h-[60%] right-[12%] top-[45%] bg-[#0d1117]/80 border border-gray-800 rounded-xl shadow-2xl font-mono text-sm text-gray-100 flex flex-col overflow-hidden backdrop-blur-lg"
      @click="handleTerminalClick"
  >

    <div class="bg-[#161b22] flex items-center justify-between px-4 py-3 rounded-t-xl flex-shrink-0 border-b border-gray-800">
      <div class="flex items-center space-x-4">
        <div class="flex space-x-2">
          <div class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer transition-all duration-200 hover:scale-110"></div>
          <div class="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-400 cursor-pointer transition-all duration-200 hover:scale-110"></div>
          <div class="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-400 cursor-pointer transition-all duration-200 hover:scale-110"></div>
        </div>
        <span class="text-gray-400 text-xs font-medium">devterm</span>
      </div>
      <span class="text-gray-500 text-xs font-mono">root@portfolio:/home/dev#</span>
      <div class="flex items-center space-x-2">
        <button @click="minimizeTerminal" class="text-gray-600 hover:text-gray-300 transition-colors p-1">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 10h10v2H5v-2z"/>
          </svg>
        </button>
        <button @click="closeTerminal" class="text-gray-600 hover:text-red-400 transition-colors p-1">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    </div>

    <div ref="terminalBody" class="px-4 py-3 overflow-y-auto flex-grow bg-gradient-to-br from-[#0d1117]/50 via-[#161b22]/50 to-[#0d1117]/50">

      <div class="mb-3 text-blue-400 text-xs">
        <p class="flex items-center gap-2">
          <span class="text-emerald-400">●</span>
          DevShell v3.2.1 initialized successfully
        </p>
        <p class="text-gray-600 ml-4">Session started at {{ currentTime }}</p>
      </div>

      <div v-if="animationStarted">
        <div class="flex items-start gap-2 mb-1">
          <span class="text-cyan-400 font-bold">→</span>
          <p class="type-command text-gray-100 font-medium">whoami --detailed</p>
        </div>
        <div v-if="showProfileContent" class="mt-2 mb-4 ml-4 border-l-2 border-cyan-500 pl-3">
          <div class="text-gray-200 leading-relaxed">
            <p class="mb-2">
              <span class="text-purple-400 font-semibold">◉ Identity:</span>
              <span class="typing-text ml-2">{{ profileTextContent }}</span>
              <span v-if="profileTextContent.length < fullProfileText.length" class="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse"></span>
            </p>
            <div v-if="profileTextContent.length === fullProfileText.length" class="mt-3 space-y-1 text-xs">
              <p class="flex items-center gap-2"><span class="text-green-400">▲</span> Experience: 5+ years</p>
              <p class="flex items-center gap-2"><span class="text-blue-400">◆</span> Focus: Full-stack development</p>
              <p class="flex items-center gap-2"><span class="text-yellow-400">✦</span> Available: Remote opportunities</p>
            </div>
          </div>
        </div>

        <div v-if="showTechCommand" class="flex items-start gap-2 mb-1">
          <span class="text-cyan-400 font-bold">→</span>
          <p class="type-command text-gray-100 font-medium" :key="techCommandKey">grep -r "expertise" ./tech-stack/</p>
        </div>
        <div v-if="showTechContent" class="mt-2 mb-4 ml-4">
          <div class="text-gray-500 text-xs mb-3">Found {{ totalSkills }} matches in {{ techStack.length }} directories</div>
          <div v-for="stack in techStack" :key="stack.category" class="mb-4">
            <div class="text-amber-400 font-semibold mb-2 flex items-center gap-2">
              <span>{{ stack.icon }}</span>
              <span>./{{ stack.category }}/</span>
            </div>
            <div class="ml-6 space-y-2">
              <div
                  v-for="(tech) in stack.displayedTech"
                  :key="tech.name"
                  class="flex items-center justify-between tech-item bg-gray-900 bg-opacity-40 px-3 py-2 rounded border-l-2 border-gray-700 hover:border-cyan-500 transition-all"
                  :class="tech.color"
              >
                <div class="flex items-center gap-3">
                  <span class="text-lg">{{ tech.icon }}</span>
                  <span class="font-medium">{{ tech.name }}</span>
                  <span class="text-xs text-gray-500">{{ tech.years }}y</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="flex">
                    <div v-for="i in tech.proficiency" :key="i" class="w-2 h-2 bg-emerald-400 rounded-full mr-1"></div>
                    <div v-for="i in (5 - tech.proficiency)" :key="i" class="w-2 h-2 bg-gray-700 rounded-full mr-1"></div>
                  </div>
                  <span class="text-xs text-gray-400">{{ tech.status }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="showBuildCommand" class="flex items-start gap-2 mb-1">
          <span class="text-cyan-400 font-bold">→</span>
          <p class="type-command text-gray-100 font-medium" :key="buildCommandKey">docker ps --filter "status=running" --format "table"</p>
        </div>
        <div v-if="showBuildContent" class="mt-2 mb-4 ml-4">
          <div class="bg-gray-900 bg-opacity-60 p-4 rounded-lg border border-gray-800">
            <div class="text-xs text-gray-400 mb-3 font-mono">CONTAINER ID    IMAGE               STATUS          PORTS           PROJECT</div>
            <div v-for="project in displayedBuilds" :key="project.id" class="mb-2 text-sm font-mono">
              <div class="flex items-center justify-between p-2 bg-gray-800 bg-opacity-50 rounded border-l-3" :class="project.borderColor">
                <div class="flex items-center gap-4">
                  <span class="text-gray-400">{{ project.id }}</span>
                  <span :class="project.nameColor" class="font-semibold cursor-pointer hover:underline" @click="showProjectDetails(project)">{{ project.name }}</span>
                  <span class="flex items-center gap-1 text-xs" :class="project.statusColor">
                    <span class="w-2 h-2 rounded-full" :class="project.dotColor"></span>
                    {{ project.status }}
                  </span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-xs text-gray-500">{{ project.port }}</span>
                  <div class="flex gap-1">
                    <span v-for="tech in project.stack" :key="tech" class="text-xs px-2 py-1 bg-gray-700 text-cyan-300 rounded-full">
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="showNetworkCommand" class="flex items-start gap-2 mb-1">
          <span class="text-cyan-400 font-bold">→</span>
          <p class="type-command text-gray-100 font-medium" :key="networkCommandKey">curl -s https://api.github.com/users/developer/social</p>
        </div>
        <div v-if="showNetworkContent" class="mt-2 mb-4 ml-4">
          <div class="bg-gray-900 bg-opacity-60 p-4 rounded-lg border border-gray-800 font-mono text-sm">
            <div class="text-cyan-400 mb-2">HTTP/1.1 200 OK</div>
            <div class="text-gray-400 mb-3">Content-Type: application/json</div>
            <div class="text-gray-300">
              <div class="text-yellow-400">{</div>
              <div v-for="social in displayedSocials" :key="social.platform" class="pl-4">
                <span class="text-blue-400">"{{ social.platform }}"</span>:
                <span class="text-green-400">"{{ social.handle }}"</span><span v-if="social.platform !== 'portfolio'" class="text-gray-400">,</span>
              </div>
              <div class="text-yellow-400">}</div>
            </div>
          </div>
        </div>

        <div v-if="showInteractivePrompt" class="mt-4">
          <div class="flex items-start gap-2">
            <span class="text-cyan-400 font-bold">→</span>
            <div class="flex items-center gap-2">
              <span class="text-gray-300 font-medium">Interactive mode enabled. Try:</span>
              <span class="text-blue-400 cursor-pointer hover:underline" @click="executeCommand('/projects')">/projects</span>
              <span class="text-green-400 cursor-pointer hover:underline" @click="executeCommand('/contact')">/contact</span>
              <span class="text-purple-400 cursor-pointer hover:underline" @click="executeCommand('/skills')">/skills</span>
            </div>
          </div>
        </div>

        <div v-for="(command, index) in executedCommands" :key="index" class="mt-3">
          <div class="flex items-start gap-2 mb-2">
            <span class="text-cyan-400 font-bold">→</span>
            <span class="text-gray-100 font-medium">{{ command.input }}</span>
          </div>
          <div class="ml-4 pl-3 border-l-2 border-gray-600">
            <component :is="command.component" :data="command.data" />
          </div>
        </div>

        <div v-if="showFinalCommand" class="flex items-start gap-2 mt-4">
          <span class="text-cyan-400 font-bold">→</span>
          <div class="flex items-center gap-2">
            <input
                v-model="userInput"
                @keyup.enter="executeUserCommand"
                class="bg-transparent border-none outline-none text-gray-300 font-medium flex-grow"
                placeholder="Type a command..."
                :disabled="!interactiveMode"
            />
            <div v-if="!userInput" class="bg-cyan-400 w-2 h-5 animate-pulse rounded-sm"></div>
          </div>
        </div>
      </div>

      <div v-else class="flex items-center justify-center h-full">
        <div class="text-gray-500 text-center">
          <div class="animate-pulse mb-2">●</div>
          <p class="text-sm">Terminal ready - Click anywhere to start</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue';

const terminalElement = ref(null);
const terminalBody = ref(null);
const animationStarted = ref(false);
const interactiveMode = ref(false);
const userInput = ref('');
const executedCommands = ref([]);

const showProfileContent = ref(false);
const showTechCommand = ref(false);
const showTechContent = ref(false);
const showBuildCommand = ref(false);
const showBuildContent = ref(false);
const showNetworkCommand = ref(false);
const showNetworkContent = ref(false);
const showInteractivePrompt = ref(false);
const showFinalCommand = ref(false);

const profileTextContent = ref('');
const displayedBuilds = ref([]);
const displayedSocials = ref([]);

const techCommandKey = ref(0);
const buildCommandKey = ref(0);
const networkCommandKey = ref(0);

const currentTime = new Date().toLocaleTimeString();

const fullProfileText = "Senior Full-Stack Developer specializing in scalable web applications, cloud architecture, and modern JavaScript frameworks. Passionate about clean code, performance optimization, and delivering exceptional user experiences.";

const techStack = ref([
  {
    category: 'frontend',
    icon: '🎨',
    technologies: [
      { name: 'Vue.js', icon: '💚', proficiency: 5, years: 4, color: 'text-emerald-400', status: 'expert' },
      { name: 'React', icon: '⚛️', proficiency: 4, years: 3, color: 'text-blue-400', status: 'advanced' },
      { name: 'TypeScript', icon: '📘', proficiency: 5, years: 3, color: 'text-blue-500', status: 'expert' },
      { name: 'Nuxt.js', icon: '🚀', proficiency: 4, years: 2, color: 'text-green-500', status: 'advanced' }
    ],
    displayedTech: []
  },
  {
    category: 'backend',
    icon: '⚙️',
    technologies: [
      { name: 'Node.js', icon: '🟢', proficiency: 5, years: 5, color: 'text-green-400', status: 'expert' },
      { name: 'Golang', icon: '🔵', proficiency: 4, years: 2, color: 'text-cyan-400', status: 'advanced' },
      { name: 'Python', icon: '🐍', proficiency: 4, years: 3, color: 'text-yellow-400', status: 'advanced' },
      { name: 'PostgreSQL', icon: '🐘', proficiency: 4, years: 4, color: 'text-blue-300', status: 'advanced' }
    ],
    displayedTech: []
  },
  {
    category: 'devops',
    icon: '☁️',
    technologies: [
      { name: 'Docker', icon: '🐳', proficiency: 4, years: 3, color: 'text-blue-400', status: 'advanced' },
      { name: 'Kubernetes', icon: '⚓', proficiency: 3, years: 2, color: 'text-purple-400', status: 'intermediate' },
      { name: 'AWS', icon: '🧡', proficiency: 4, years: 3, color: 'text-orange-400', status: 'advanced' },
      { name: 'GitHub Actions', icon: '🔄', proficiency: 4, years: 2, color: 'text-gray-300', status: 'advanced' }
    ],
    displayedTech: []
  }
]);

const builds = [
  {
    id: 'a8f3e9d2',
    name: 'ecommerce-platform',
    status: 'healthy',
    port: ':3000',
    stack: ['Vue', 'Node', 'Redis'],
    statusColor: 'text-green-400',
    dotColor: 'bg-green-400',
    nameColor: 'text-purple-400',
    borderColor: 'border-green-500',
    description: 'Full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.',
    features: ['Real-time inventory', 'Payment gateway integration', 'Admin dashboard', 'User authentication', 'Order tracking'],
    github: 'https://github.com/dev/ecommerce-platform',
    demo: 'https://ecommerce-demo.dev'
  },
  {
    id: 'b7c4f1a8',
    name: 'analytics-api',
    status: 'running',
    port: ':8080',
    stack: ['Go', 'Postgres', 'Docker'],
    statusColor: 'text-blue-400',
    dotColor: 'bg-blue-400',
    nameColor: 'text-cyan-400',
    borderColor: 'border-blue-500',
    description: 'High-performance analytics API built with Go, handling millions of events per day with real-time processing.',
    features: ['Real-time processing', 'High throughput', 'Data visualization', 'Custom metrics', 'API rate limiting'],
    github: 'https://github.com/dev/analytics-api',
    demo: 'https://analytics-demo.dev'
  },
  {
    id: 'c9d6e2b5',
    name: 'chat-service',
    status: 'deployed',
    port: ':4000',
    stack: ['Node', 'Socket.io', 'MongoDB'],
    statusColor: 'text-amber-400',
    dotColor: 'bg-amber-400',
    nameColor: 'text-yellow-400',
    borderColor: 'border-amber-500',
    description: 'Real-time chat application with room management, file sharing, and message encryption.',
    features: ['Real-time messaging', 'Room management', 'File sharing', 'Message encryption', 'User presence'],
    github: 'https://github.com/dev/chat-service',
    demo: 'https://chat-demo.dev'
  },
  {
    id: 'd4e7f3c1',
    name: 'portfolio-cms',
    status: 'active',
    port: ':5000',
    stack: ['Next.js', 'Strapi', 'PostgreSQL'],
    statusColor: 'text-purple-400',
    dotColor: 'bg-purple-400',
    nameColor: 'text-indigo-400',
    borderColor: 'border-purple-500',
    description: 'Content management system for portfolio websites with drag-and-drop interface and SEO optimization.',
    features: ['Drag & drop builder', 'SEO optimization', 'Multi-language support', 'Image optimization', 'Analytics integration'],
    github: 'https://github.com/dev/portfolio-cms',
    demo: 'https://portfolio-cms-demo.dev'
  },
  {
    id: 'e8a2b9f6',
    name: 'task-scheduler',
    status: 'beta',
    port: ':6000',
    stack: ['Python', 'Redis', 'FastAPI'],
    statusColor: 'text-orange-400',
    dotColor: 'bg-orange-400',
    nameColor: 'text-red-400',
    borderColor: 'border-orange-500',
    description: 'Distributed task scheduler with priority queues, retry mechanisms, and monitoring dashboard.',
    features: ['Priority queues', 'Retry mechanisms', 'Monitoring dashboard', 'Distributed processing', 'Task dependencies'],
    github: 'https://github.com/dev/task-scheduler',
    demo: 'https://scheduler-demo.dev'
  }
];

const allProjects = builds;

const socials = [
  { platform: 'github', handle: 'github.com/developer-portfolio' },
  { platform: 'linkedin', handle: 'linkedin.com/in/dev-portfolio' },
  { platform: 'twitter', handle: '@portfolio_dev' },
  { platform: 'email', handle: 'hello@devportfolio.tech' },
  { platform: 'portfolio', handle: 'devportfolio.tech' }
];

const totalSkills = computed(() => {
  return techStack.value.reduce((acc, stack) => acc + stack.technologies.length, 0);
});

const ProjectsComponent = {
  props: ['data'],
  template: `
    <div class="space-y-4">
      <div class="text-cyan-400 font-semibold mb-3">📁 Found {{ data.length }} projects</div>
      <div v-for="project in data" :key="project.id" class="bg-gray-900 bg-opacity-50 p-4 rounded-lg border border-gray-700">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-3">
            <span class="text-lg">🚀</span>
            <span class="font-semibold text-purple-400">{{ project.name }}</span>
            <span class="flex items-center gap-1 text-xs" :class="project.statusColor">
              <span class="w-2 h-2 rounded-full" :class="project.dotColor"></span>
              {{ project.status }}
            </span>
          </div>
          <div class="flex gap-1">
            <span v-for="tech in project.stack" :key="tech" class="text-xs px-2 py-1 bg-gray-700 text-cyan-300 rounded-full">
              {{ tech }}
            </span>
          </div>
        </div>
        <p class="text-gray-300 text-sm mb-3">{{ project.description }}</p>
        <div class="mb-3">
          <div class="text-yellow-400 text-sm font-medium mb-1">Features:</div>
          <div class="flex flex-wrap gap-1">
            <span v-for="feature in project.features" :key="feature" class="text-xs px-2 py-1 bg-blue-900 bg-opacity-50 text-blue-300 rounded">
              {{ feature }}
            </span>
          </div>
        </div>
        <div class="flex gap-4 text-sm">
          <span class="text-green-400 cursor-pointer hover:underline">📂 {{ project.github }}</span>
          <span class="text-blue-400 cursor-pointer hover:underline">🌐 {{ project.demo }}</span>
        </div>
      </div>
    </div>
  `
};

const ContactComponent = {
  props: ['data'],
  template: `
    <div class="space-y-3">
      <div class="text-cyan-400 font-semibold mb-3">📞 Contact Information</div>
      <div v-for="contact in data" :key="contact.platform" class="flex items-center gap-3 p-3 bg-gray-900 bg-opacity-40 rounded">
        <span class="capitalize text-purple-400 font-medium w-20">{{ contact.platform }}:</span>
        <span class="text-green-400">{{ contact.handle }}</span>
      </div>
    </div>
  `
};

const SkillsComponent = {
  props: ['data'],
  template: `
    <div class="space-y-4">
      <div class="text-cyan-400 font-semibold mb-3">⚡ Technical Skills</div>
      <div v-for="stack in data" :key="stack.category" class="mb-4">
        <div class="text-amber-400 font-semibold mb-2 flex items-center gap-2">
          <span>{{ stack.icon }}</span>
          <span>{{ stack.category }}</span>
        </div>
        <div class="ml-4 space-y-2">
          <div v-for="tech in stack.technologies" :key="tech.name" class="flex items-center justify-between bg-gray-900 bg-opacity-40 px-3 py-2 rounded">
            <div class="flex items-center gap-3">
              <span class="text-lg">{{ tech.icon }}</span>
              <span class="font-medium" :class="tech.color">{{ tech.name }}</span>
              <span class="text-xs text-gray-500">{{ tech.years }}y</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex">
                <div v-for="i in tech.proficiency" :key="i" class="w-2 h-2 bg-emerald-400 rounded-full mr-1"></div>
                <div v-for="i in (5 - tech.proficiency)" :key="i" class="w-2 h-2 bg-gray-700 rounded-full mr-1"></div>
              </div>
              <span class="text-xs text-gray-400">{{ tech.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

const isElementInViewport = (el) => {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const handleTerminalClick = () => {
  if (!animationStarted.value) {
    animationStarted.value = true;
    startMainAnimation();
  }
};

const executeCommand = (command) => {
  userInput.value = command;
  executeUserCommand();
};

const executeUserCommand = () => {
  const command = userInput.value.trim();
  if (!command) return;

  const commandData = {
    input: command,
    component: null,
    data: null
  };

  switch (command) {
    case '/projects':
      commandData.component = ProjectsComponent;
      commandData.data = allProjects;
      break;
    case '/contact':
      commandData.component = ContactComponent;
      commandData.data = socials;
      break;
    case '/skills':
      commandData.component = SkillsComponent;
      commandData.data = techStack.value;
      break;
    default:
      // FIXED: Correctly display the invalid command in the error message.
      commandData.component = {
        template: `<div class="text-red-400">Command not found: ${command}. Available commands: /projects, /contact, /skills</div>`,
      };
      break;
  }

  executedCommands.value.push(commandData);
  userInput.value = '';
  scrollToBottom();
};

const showProjectDetails = (project) => {
  const commandData = {
    input: `details ${project.name}`,
    component: {
      props: ['data'],
      template: `
        <div class="bg-gray-900 bg-opacity-60 p-4 rounded-lg border border-gray-700">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-lg">🚀</span>
            <span class="font-semibold text-purple-400">{{ data.name }}</span>
            <span class="flex items-center gap-1 text-xs" :class="data.statusColor">
              <span class="w-2 h-2 rounded-full" :class="data.dotColor"></span>
              {{ data.status }}
            </span>
          </div>
          <p class="text-gray-300 mb-3">{{ data.description }}</p>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-cyan-400 font-medium">Port:</span>
              <span class="ml-2 text-gray-300">{{ data.port }}</span>
            </div>
            <div>
              <span class="text-cyan-400 font-medium">Container ID:</span>
              <span class="ml-2 text-gray-400">{{ data.id }}</span>
            </div>
          </div>
          <div class="mt-3">
            <div class="text-yellow-400 font-medium mb-1">Tech Stack:</div>
            <div class="flex gap-1">
              <span v-for="tech in data.stack" :key="tech" class="text-xs px-2 py-1 bg-gray-700 text-cyan-300 rounded-full">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      `
    },
    data: project
  };

  executedCommands.value.push(commandData);
  scrollToBottom();
};

const minimizeTerminal = () => {
  console.log('Terminal minimized');
};

const closeTerminal = () => {
  console.log('Terminal closed');
};

const scrollToBottom = async () => {
  await nextTick();
  if (terminalBody.value) {
    terminalBody.value.scrollTop = terminalBody.value.scrollHeight;
  }
};

const typeText = (elementRef, text, onComplete, speed = 40) => {
  let index = 0;
  const interval = setInterval(() => {
    if (index < text.length) {
      elementRef.value += text.charAt(index);
      index++;
      scrollToBottom();
    } else {
      clearInterval(interval);
      if (onComplete) onComplete();
    }
  }, speed);
};

const displayTechStack = (onComplete) => {
  let stackIndex = 0;
  const displayNextStack = () => {
    if (stackIndex < techStack.value.length) {
      const stack = techStack.value[stackIndex];
      let techIndex = 0;
      const displayNextTech = () => {
        if (techIndex < stack.technologies.length) {
          stack.displayedTech.push(stack.technologies[techIndex]);
          techIndex++;
          scrollToBottom();
          setTimeout(displayNextTech, 250);
        } else {
          stackIndex++;
          setTimeout(displayNextStack, 400);
        }
      };
      displayNextTech();
    } else {
      if (onComplete) onComplete();
    }
  };
  displayNextStack();
};

const displayBuilds = (onComplete) => {
  let index = 0;
  const interval = setInterval(() => {
    if (index < builds.length) {
      displayedBuilds.value.push(builds[index]);
      index++;
      scrollToBottom();
    } else {
      clearInterval(interval);
      if (onComplete) onComplete();
    }
  }, 500);
};

const displaySocials = (onComplete) => {
  let index = 0;
  const interval = setInterval(() => {
    if (index < socials.length) {
      displayedSocials.value.push(socials[index]);
      index++;
      scrollToBottom();
    } else {
      clearInterval(interval);
      if (onComplete) onComplete();
    }
  }, 150);
};

const startMainAnimation = () => {
  setTimeout(() => {
    showProfileContent.value = true;
    scrollToBottom();

    typeText(profileTextContent, fullProfileText, () => {
      setTimeout(() => {
        showTechCommand.value = true;
        techCommandKey.value++;
        scrollToBottom();

        setTimeout(() => {
          showTechContent.value = true;
          displayTechStack(() => {
            setTimeout(() => {
              showBuildCommand.value = true;
              buildCommandKey.value++;
              scrollToBottom();

              setTimeout(() => {
                showBuildContent.value = true;
                displayBuilds(() => {
                  setTimeout(() => {
                    showNetworkCommand.value = true;
                    networkCommandKey.value++;
                    scrollToBottom();

                    setTimeout(() => {
                      showNetworkContent.value = true;
                      displaySocials(() => {
                        setTimeout(() => {
                          showInteractivePrompt.value = true;
                          setTimeout(() => {
                            showFinalCommand.value = true;
                            interactiveMode.value = true;
                            scrollToBottom();
                          }, 1000);
                        }, 600);
                      });
                    }, 2200);
                  }, 800);
                });
              }, 2200);
            }, 800);
          });
        }, 2200);
      }, 1200);
    });
  }, 1800);
};

const checkVisibility = () => {
  if (terminalElement.value && !animationStarted.value) {
    if (isElementInViewport(terminalElement.value)) {
      animationStarted.value = true;
      startMainAnimation();
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('resize', checkVisibility);
  checkVisibility();
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkVisibility);
  window.removeEventListener('resize', checkVisibility);
});
</script>

<style>
/* This is a general style for the tech items, specific colors come from Tailwind classes */
.tech-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 255, 255, 0.1);
}

.type-command {
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  border-right: .15em solid #22d3ee; /* Tailwind cyan-400 */
  animation: typing 2s steps(60, end), blink-caret .75s step-end infinite;
  animation-fill-mode: forwards;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #22d3ee; } /* Tailwind cyan-400 */
}
</style>

