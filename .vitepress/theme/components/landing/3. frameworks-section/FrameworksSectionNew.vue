<script setup lang="ts">
/**
 * 开放生态框架墙（收敛版）。
 *
 * 背景由原来的「漂移网格 + 三大光球 + 旋转装饰 + 三层波浪」收敛为一层
 * 缓慢漂移柔光 + 极淡点阵，与核心能力区保持一致的克制气质。
 * 框架卡片仍由 GSAP scrollTrigger 逐个 visible 错峰入场。
 */
import { onMounted, onUnmounted, type Ref, ref } from 'vue'
import FrameworkCardNew from './FrameworkCardNew.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Framework assets
import logoAstro from './images/astro.svg'
import logoNuxt from './images/nuxt.svg'
import logoVue from './images/vue.svg'
import logoAnalog from './images/analog.svg'
import logoPlaywright from './images/playwright.svg'
import logoMarko from './images/marko.svg'
import logoStorybook from './images/storybook.svg'
import logoQwik from './images/qwik.svg'
import logoVitest from './images/vitest.svg'
import logoRedwood from './images/redwood.svg'
import logoSolid from './images/solid.svg'
import logoAngular from './images/angular.svg'
import logoReact from './images/react.svg'
import logoRemix from './images/remix.svg'
import logoSvelte from './images/svelte.svg'
import logoLaravel from './images/laravel.svg'
import logoAdonis from './images/adonis.svg'
import logoEmber from './images/ember.svg'
import logoPreact from './images/preact.svg'
import logoHono from './images/hono.svg'
import idea from './images/intellij-idea.svg'
import ai from './images/ai.svg'
import datagrip from './images/datagrip.svg'
import pycharm from './images/pycharm.svg'
import resharper from './images/resharper.svg'
import cpp from './images/resharper-cpp.svg'
import scala from './images/scala.svg'
import toolbox from './images/toolbox.svg'
import webstorm from './images/webstorm.svg'
import vscode from './images/favicon.ico'
import cursor from './images/cursor.ico'
import claude from './images/claude.png'
import chatgpt from './images/ChatGPT.ico'
import gemini from './images/gemini.svg'
import opencode from './images/opencode.png'
import openclaw from './images/openclaw.svg'
import hermes from './images/hermes.png'
import grok from './images/grok.svg'

interface Framework {
  name: string
  logo: string
  color: string
  url: string
  visible: Ref<boolean>
  isHighlighted: Ref<boolean>
}

const frameworks: Framework[] = [
  { name: 'ChatGPT', logo: chatgpt, color: '#FFD700', url: 'https://chatgpt.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Claude', logo: claude, color: '#BD34FE', url: 'https://claude.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Gemini', logo: gemini, color: '#be4622', url: 'https://gemini.google.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Grok', logo: grok, color: '#fd4684', url: 'https://grok.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Cursor', logo: cursor, color: '#BD34FE', url: 'https://cursor.com/cn', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Hermes', logo: hermes, color: '#00d6fd', url: 'https://hermes-agent.nousresearch.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'OpenClaw', logo: openclaw, color: '#BD34FE', url: 'https://openclaw.ai/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'OpenCode', logo: opencode, color: '#be4622', url: 'https://opencode.ai/', visible: ref(false), isHighlighted: ref(false) },

  { name: 'VsCode', logo: vscode, color: '#41D1FF', url: 'https://code.visualstudio.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Toolbox', logo: toolbox, color: '#41D1FF', url: 'https://www.jetbrains.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'IntelliJ IDEA', logo: idea, color: '#00d6fd', url: 'https://www.jetbrains.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'AI', logo: ai, color: '#BD34FE', url: 'https://www.jetbrains.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'DataGrip', logo: datagrip, color: '#FFD700', url: 'https://www.jetbrains.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'PyCharm', logo: pycharm, color: '#41D1FF', url: 'https://www.jetbrains.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'ReSharper', logo: resharper, color: '#00d6fd', url: 'https://www.jetbrains.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'C++', logo: cpp, color: '#BD34FE', url: 'https://www.jetbrains.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Scala', logo: scala, color: '#FFD700', url: 'https://www.jetbrains.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'WebStorm', logo: webstorm, color: '#00d6fd', url: 'https://www.jetbrains.com/', visible: ref(false), isHighlighted: ref(false) },

  { name: 'Vitest', logo: logoVitest, color: '#fac52b', url: 'https://vitest.dev/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'React', logo: logoReact, color: '#00d6fd', url: 'https://react.dev/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Angular', logo: logoAngular, color: '#e03237', url: 'https://angular.dev/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Vue', logo: logoVue, color: '#40b782', url: 'https://vuejs.org/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Solid', logo: logoSolid, color: '#75b2df', url: 'https://www.solidjs.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Svelte', logo: logoSvelte, color: '#fd3e00', url: 'https://svelte.dev/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Preact', logo: logoPreact, color: '#673ab8', url: 'https://preactjs.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Astro', logo: logoAstro, color: '#ffffff', url: 'https://astro.build', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Remix', logo: logoRemix, color: '#3991fd', url: 'https://remix.run/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Nuxt', logo: logoNuxt, color: '#00da81', url: 'https://nuxt.com', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Qwik', logo: logoQwik, color: '#18b5f4', url: 'https://qwik.dev/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Redwood', logo: logoRedwood, color: '#be4622', url: 'https://redwoodjs.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Analog', logo: logoAnalog, color: '#c10f2e', url: 'https://analogjs.org/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Playwright', logo: logoPlaywright, color: '#d45247', url: 'https://playwright.dev/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Storybook', logo: logoStorybook, color: '#fd4684', url: 'https://storybook.js.org/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Marko', logo: logoMarko, color: '#de2a87', url: 'https://markojs.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Laravel', logo: logoLaravel, color: '#eb4432', url: 'https://laravel.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'AdonisJS', logo: logoAdonis, color: '#5a45ff', url: 'https://adonisjs.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'EmberJS', logo: logoEmber, color: '#e04e39', url: 'https://emberjs.com/', visible: ref(false), isHighlighted: ref(false) },
  { name: 'Hono', logo: logoHono, color: '#ff5c13', url: 'https://hono.dev/', visible: ref(false), isHighlighted: ref(false) },
]

let timeline: gsap.core.Timeline | null = null
let highlightInterval: number | null = null

onMounted(() => {
  timeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#frameworks-section-new',
      start: 'top 75%',
      once: true,
    },
  })

  frameworks.forEach((framework, index) => {
    timeline!.set(framework.visible, { value: true }, index * 0.04)
  })

  // 自动轮询高亮
  let currentIndex = 0
  highlightInterval = window.setInterval(() => {
    frameworks[currentIndex].isHighlighted.value = false
    currentIndex = (currentIndex + 1) % frameworks.length
    frameworks[currentIndex].isHighlighted.value = true
  }, 800)
})

onUnmounted(() => {
  if (timeline) {
    timeline.kill()
    timeline = null
  }
  if (highlightInterval) {
    clearInterval(highlightInterval)
    highlightInterval = null
  }
})
</script>

<template>
  <section class="fw" id="frameworks-section-new">
    <div class="fw__bg" aria-hidden="true">
      <div class="fw__glow"></div>
      <div class="fw__dots"></div>
    </div>

    <header class="fw__head">
      <span class="fw__eyebrow">OPEN&nbsp;ECOSYSTEM · 开放生态</span>
      <h2 class="fw__title">连接你惯用的<span class="fw__grad">一切</span></h2>
      <p class="fw__sub">主流框架、编辑器与工具开箱即连，让 AI 渗进你的每一行代码。</p>
    </header>

    <div class="fw__grid">
      <FrameworkCardNew
        v-for="(framework, index) in frameworks"
        :key="framework.name"
        :framework="framework"
        :index="index"
      />
    </div>

    <div class="fw__line" aria-hidden="true"></div>
  </section>
</template>

<style scoped>
.fw {
  position: relative;
  padding: 40px 24px 140px;
  overflow: hidden;
}

/* ////////////////////// 背景（克制） ////////////////////// */
.fw__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.fw__glow {
  position: absolute;
  top: 0;
  left: 50%;
  width: 1000px;
  height: 560px;
  max-width: 120vw;
  transform: translateX(-50%);
  background:
    radial-gradient(closest-side, rgba(65, 209, 255, 0.14), transparent 70%),
    radial-gradient(closest-side, rgba(189, 52, 254, 0.13), transparent 70%);
  background-position: 32% 30%, 68% 50%;
  background-repeat: no-repeat;
  background-size: 65% 80%, 65% 80%;
  filter: blur(22px);
  animation: fw-drift 30s ease-in-out infinite;
}

@keyframes fw-drift {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-54%) translateY(22px); }
}

.fw__dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 30px 30px;
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, #000 30%, transparent 100%);
  mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, #000 30%, transparent 100%);
}

/* ////////////////////// 标题 ////////////////////// */
.fw__head {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 760px;
  margin: 0 auto 60px;
}

.fw__eyebrow {
  display: inline-block;
  font-family: Inter, sans-serif;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.55);
  padding: 7px 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.03);
  margin-bottom: 24px;
}

.fw__title {
  font-family: Manrope, sans-serif;
  font-size: clamp(30px, 5vw, 52px);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -1px;
  color: #fff;
  margin: 0 0 16px;
  text-wrap: balance;
}

.fw__grad {
  background: linear-gradient(110deg, #bd34fe 0%, #41d1ff 50%, #ffd700 100%);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fw-flow 6s ease infinite;
}

@keyframes fw-flow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.fw__sub {
  font-family: Inter, sans-serif;
  font-size: clamp(15px, 2vw, 18px);
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
}

/* ////////////////////// 网格 ////////////////////// */
.fw__grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 18px;
  max-width: 1180px;
  margin: 0 auto;
}

.fw__grid > :nth-child(8n+1) { animation: float-1 4s ease-in-out infinite; }
.fw__grid > :nth-child(8n+2) { animation: float-2 4.2s ease-in-out infinite; }
.fw__grid > :nth-child(8n+3) { animation: float-3 4.4s ease-in-out infinite; }
.fw__grid > :nth-child(8n+4) { animation: float-4 4.6s ease-in-out infinite; }
.fw__grid > :nth-child(8n+5) { animation: float-5 4.8s ease-in-out infinite; }
.fw__grid > :nth-child(8n+6) { animation: float-6 5s ease-in-out infinite; }
.fw__grid > :nth-child(8n+7) { animation: float-7 5.2s ease-in-out infinite; }
.fw__grid > :nth-child(8n+8) { animation: float-8 5.4s ease-in-out infinite; }

@keyframes float-1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
@keyframes float-2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
@keyframes float-3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }
@keyframes float-4 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes float-5 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
@keyframes float-6 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
@keyframes float-7 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
@keyframes float-8 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-13px); } }

@media (min-width: 1024px) {
  .fw__grid {
    grid-template-columns: repeat(8, 1fr);
  }
}

/* ////////////////////// 底部渐变线 ////////////////////// */
.fw__line {
  position: relative;
  z-index: 2;
  width: min(900px, 80%);
  height: 1px;
  margin: 90px auto 0;
  background: linear-gradient(90deg, transparent, rgba(65, 209, 255, 0.5), rgba(189, 52, 254, 0.5), transparent);
  background-size: 200% auto;
  opacity: 0.6;
  animation: fw-flow 7s linear infinite;
}

@media (max-width: 768px) {
  .fw {
    padding: 20px 18px 100px;
  }

  .fw__head {
    margin-bottom: 44px;
  }

  .fw__grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fw__glow,
  .fw__grad,
  .fw__line {
    animation: none;
  }
}
</style>
