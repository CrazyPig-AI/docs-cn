<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

/**
 * 能力卡片（彻底重做版）。
 *
 * 自包含、与旧的特性卡片无关：内置 6 套原创霓虹微动效（variant），
 * 鼠标悬停时做 3D 视差倾斜 + 光泽跟随，进入视口时滚动渐显。
 * 颜色统一由 --accent 驱动（SVG 用 currentColor）。
 */
type Variant = 'neural' | 'bolt' | 'orbit' | 'wave' | 'shield' | 'spark'

const props = withDefaults(
  defineProps<{
    title: string
    description: string
    variant: Variant
    accent?: string
    wide?: boolean
    index?: number
  }>(),
  {
    accent: '#41d1ff',
    wide: false,
    index: 0,
  },
)

const el = ref<HTMLElement | null>(null)
const revealed = ref(false)
const hovering = ref(false)
const rotX = ref(0)
const rotY = ref(0)
const px = ref(50)
const py = ref(50)

let observer: IntersectionObserver | null = null
let reduceMotion = false

const onMove = (e: MouseEvent) => {
  if (reduceMotion || !el.value) return
  const r = el.value.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width
  const y = (e.clientY - r.top) / r.height
  rotY.value = (x - 0.5) * 10
  rotX.value = (0.5 - y) * 10
  px.value = x * 100
  py.value = y * 100
  hovering.value = true
}

const onLeave = () => {
  rotX.value = 0
  rotY.value = 0
  hovering.value = false
}

const innerStyle = computed(() => ({
  transform: `perspective(900px) rotateX(${rotX.value}deg) rotateY(${rotY.value}deg)`,
}))

const shineStyle = computed(() => ({
  background: `radial-gradient(420px circle at ${px.value}% ${py.value}%, color-mix(in srgb, var(--accent) 28%, transparent), transparent 60%)`,
  opacity: hovering.value ? 1 : 0,
}))

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!el.value) return
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealed.value = true
          observer?.disconnect()
        }
      })
    },
    { threshold: 0.15 },
  )
  observer.observe(el.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <article
    ref="el"
    class="cap"
    :class="{ 'cap--wide': wide, 'is-in': revealed, 'is-hover': hovering }"
    :style="{ '--accent': accent, '--delay': `${(index % 6) * 90}ms` }"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <div class="cap__inner" :style="innerStyle">
      <div class="cap__shine" :style="shineStyle" aria-hidden="true"></div>
      <div class="cap__border" aria-hidden="true"></div>

      <!-- 微动效 -->
      <div class="cap__visual" aria-hidden="true">
        <!-- 神经网络 -->
        <svg v-if="variant === 'neural'" viewBox="0 0 120 90" class="v-neural">
          <g class="links" stroke="currentColor" fill="none" stroke-width="1">
            <line x1="20" y1="45" x2="60" y2="20" />
            <line x1="20" y1="45" x2="60" y2="70" />
            <line x1="60" y1="20" x2="100" y2="45" />
            <line x1="60" y1="70" x2="100" y2="45" />
            <line x1="60" y1="20" x2="60" y2="70" />
          </g>
          <g class="nodes" fill="currentColor">
            <circle cx="20" cy="45" r="5" style="--n: 0" />
            <circle cx="60" cy="20" r="5" style="--n: 1" />
            <circle cx="60" cy="70" r="5" style="--n: 2" />
            <circle cx="100" cy="45" r="5" style="--n: 3" />
          </g>
        </svg>

        <!-- 闪电 -->
        <svg v-else-if="variant === 'bolt'" viewBox="0 0 120 90" class="v-bolt">
          <circle class="ring" cx="60" cy="45" r="18" stroke="currentColor" fill="none" stroke-width="1.5" />
          <circle class="ring ring--2" cx="60" cy="45" r="18" stroke="currentColor" fill="none" stroke-width="1.5" />
          <path
            class="bolt"
            d="M66 18 L48 50 L60 50 L54 72 L74 40 L62 40 Z"
            fill="currentColor"
          />
        </svg>

        <!-- 轨道 -->
        <svg v-else-if="variant === 'orbit'" viewBox="0 0 120 90" class="v-orbit">
          <ellipse class="track" cx="60" cy="45" rx="44" ry="18" stroke="currentColor" fill="none" stroke-width="1" />
          <ellipse class="track track--b" cx="60" cy="45" rx="30" ry="40" stroke="currentColor" fill="none" stroke-width="1" />
          <circle class="sun" cx="60" cy="45" r="7" fill="currentColor" />
          <g class="planet planet--a"><circle cx="104" cy="45" r="3.5" fill="currentColor" /></g>
          <g class="planet planet--b"><circle cx="60" cy="5" r="3" fill="currentColor" /></g>
        </svg>

        <!-- 声波 -->
        <div v-else-if="variant === 'wave'" class="v-wave">
          <span v-for="b in 7" :key="b" class="bar" :style="{ '--b': b }"></span>
        </div>

        <!-- 护盾 -->
        <svg v-else-if="variant === 'shield'" viewBox="0 0 120 90" class="v-shield">
          <path
            class="shield"
            d="M60 14 L88 26 V46 C88 64 76 74 60 80 C44 74 32 64 32 46 V26 Z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
          />
          <path class="check" d="M49 46 L57 55 L73 36" stroke="currentColor" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          <line class="scan" x1="32" y1="34" x2="88" y2="34" stroke="currentColor" stroke-width="2" />
        </svg>

        <!-- 星火 -->
        <div v-else class="v-spark">
          <span v-for="d in 16" :key="d" class="dot" :style="{ '--d': d }"></span>
          <svg viewBox="0 0 40 40" class="star">
            <path d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      <div class="cap__body">
        <h3 class="cap__title">{{ title }}</h3>
        <p class="cap__desc">{{ description }}</p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.cap {
  --accent: #41d1ff;
  position: relative;
  border-radius: 20px;
  opacity: 0;
  transform: translateY(34px);
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay);
}

.cap.is-in {
  opacity: 1;
  transform: translateY(0);
}

.cap__inner {
  position: relative;
  height: 100%;
  min-height: 260px;
  border-radius: 20px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0)) ,
    rgba(15, 16, 22, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.07);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 28px;
  transition: transform 0.35s ease;
  transform-style: preserve-3d;
  will-change: transform;
}

.cap--wide .cap__inner {
  min-height: 260px;
}

/* 光泽跟随 */
.cap__shine {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
  z-index: 1;
}

/* 渐变描边（hover 点亮） */
.cap__border {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 1px;
  background: linear-gradient(135deg, var(--accent), transparent 45%, transparent 55%, color-mix(in srgb, var(--accent) 70%, #fff 0%));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 2;
}

.cap.is-hover .cap__inner {
  border-color: color-mix(in srgb, var(--accent) 35%, transparent);
  box-shadow: 0 30px 70px -28px color-mix(in srgb, var(--accent) 70%, transparent);
}

.cap.is-hover .cap__border {
  opacity: 1;
}

/* 视觉区 */
.cap__visual {
  position: relative;
  z-index: 1;
  height: 96px;
  color: var(--accent);
  transform: translateZ(36px);
  filter: drop-shadow(0 0 10px color-mix(in srgb, var(--accent) 45%, transparent));
}

.cap__visual svg {
  width: auto;
  height: 100%;
  overflow: visible;
}

.cap__body {
  position: relative;
  z-index: 1;
  transform: translateZ(26px);
}

.cap__title {
  font-family: Manrope, sans-serif;
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -0.3px;
  color: #fff;
  margin: 0 0 8px;
}

.cap__desc {
  font-family: Inter, sans-serif;
  font-size: 14.5px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  text-wrap: pretty;
}

.cap--wide .cap__body {
  max-width: 60%;
}

/* ////////////////////////////////////////////////// */
/* 微动效                                               */
/* ////////////////////////////////////////////////// */

/* 神经网络 */
.v-neural .links line {
  stroke-dasharray: 6 6;
  opacity: 0.45;
  animation: neural-flow 2.4s linear infinite;
}
.v-neural .nodes circle {
  transform-box: fill-box;
  transform-origin: center;
  animation: node-pulse 2.2s ease-in-out infinite;
  animation-delay: calc(var(--n) * 0.3s);
}
@keyframes neural-flow {
  to { stroke-dashoffset: -24; }
}
@keyframes node-pulse {
  0%, 100% { transform: scale(0.8); opacity: 0.6; }
  50% { transform: scale(1.25); opacity: 1; }
}

/* 闪电 */
.v-bolt .bolt {
  transform-box: fill-box;
  transform-origin: center;
  animation: bolt-flash 1.8s ease-in-out infinite;
}
.v-bolt .ring {
  transform-box: fill-box;
  transform-origin: center;
  opacity: 0;
  animation: bolt-ring 1.8s ease-out infinite;
}
.v-bolt .ring--2 { animation-delay: 0.9s; }
@keyframes bolt-flash {
  0%, 100% { opacity: 0.55; transform: scale(0.94); }
  45% { opacity: 1; transform: scale(1.06); filter: brightness(1.4); }
}
@keyframes bolt-ring {
  0% { opacity: 0.7; transform: scale(0.5); }
  100% { opacity: 0; transform: scale(1.7); }
}

/* 轨道 */
.v-orbit .track { opacity: 0.35; }
.v-orbit .sun {
  transform-box: fill-box;
  transform-origin: center;
  animation: node-pulse 2.6s ease-in-out infinite;
}
.v-orbit .planet {
  transform-origin: 60px 45px;
}
.v-orbit .planet--a { animation: spin 4s linear infinite; }
.v-orbit .planet--b { animation: spin 6s linear infinite reverse; }
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 声波 */
.v-wave {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 100%;
}
.v-wave .bar {
  width: 6px;
  border-radius: 3px;
  background: currentColor;
  height: 30%;
  animation: wave-eq 1.2s ease-in-out infinite;
  animation-delay: calc(var(--b) * 0.1s);
}
@keyframes wave-eq {
  0%, 100% { height: 25%; opacity: 0.6; }
  50% { height: 92%; opacity: 1; }
}

/* 护盾 */
.v-shield .shield { opacity: 0.6; }
.v-shield .check {
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  animation: draw-check 2.6s ease-in-out infinite;
}
.v-shield .scan {
  opacity: 0.8;
  animation: shield-scan 2.6s ease-in-out infinite;
}
@keyframes draw-check {
  0%, 30% { stroke-dashoffset: 40; }
  55%, 80% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}
@keyframes shield-scan {
  0% { transform: translateY(0); opacity: 0; }
  20% { opacity: 0.8; }
  100% { transform: translateY(40px); opacity: 0; }
}

/* 星火 */
.v-spark {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 10px);
  grid-auto-rows: 10px;
  gap: 12px;
  height: 100%;
  align-content: center;
  justify-content: center;
}
.v-spark .dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.25;
  justify-self: center;
  align-self: center;
  animation: twinkle 3s ease-in-out infinite;
  animation-delay: calc(var(--d) * 0.13s);
}
.v-spark .star {
  position: absolute;
  width: 34px;
  height: 34px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: star-spin 6s linear infinite;
}
@keyframes twinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.4); }
}
@keyframes star-spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@media (max-width: 640px) {
  .cap__inner { padding: 22px; min-height: 220px; }
  .cap--wide .cap__body { max-width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .cap { opacity: 1; transform: none; transition: none; }
  .cap__inner { transform: none !important; }
  .v-neural .links line,
  .v-neural .nodes circle,
  .v-bolt .bolt,
  .v-bolt .ring,
  .v-orbit .sun,
  .v-orbit .planet,
  .v-wave .bar,
  .v-shield .check,
  .v-shield .scan,
  .v-spark .dot,
  .v-spark .star {
    animation: none !important;
  }
  .v-shield .check { stroke-dashoffset: 0; }
  .v-wave .bar { height: 60%; }
}
</style>
