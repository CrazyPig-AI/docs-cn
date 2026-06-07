<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  text: string
  class?: string
}>()

const glitchRef = ref<HTMLDivElement | null>(null)
</script>

<template>
  <div ref="glitchRef" :class="['glitch-text', props.class]" :data-text="text">
    <span class="glitch-text__main">{{ text }}</span>
    <span class="glitch-text__layer glitch-text__layer--1" :data-text="text">{{ text }}</span>
    <span class="glitch-text__layer glitch-text__layer--2" :data-text="text">{{ text }}</span>
  </div>
</template>

<style scoped>
.glitch-text {
  position: relative;
  display: inline-block;
  font-weight: 900;
  font-size: clamp(3rem, 10vw, 8rem);
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.glitch-text__main {
  position: relative;
  z-index: 3;
  background: linear-gradient(135deg, #BD34FE 0%, #41D1FF 50%, #FFD700 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradient-flow 5s ease infinite;
  text-shadow:
    0 0 10px rgba(189, 52, 254, 0.5),
    0 0 20px rgba(65, 209, 255, 0.5),
    0 0 30px rgba(255, 215, 0, 0.5);
}

@keyframes gradient-flow {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.glitch-text__layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #BD34FE 0%, #41D1FF 50%, #FFD700 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0.8;
}

.glitch-text__layer--1 {
  z-index: 1;
  animation: glitch-1 3s infinite;
}

.glitch-text__layer--2 {
  z-index: 2;
  animation: glitch-2 2s infinite;
}

@keyframes glitch-1 {
  0%, 80%, 100% {
    transform: translate(0);
    opacity: 0;
  }
  81% {
    transform: translate(-2px, -2px);
    opacity: 0.8;
    filter: hue-rotate(90deg);
  }
  82% {
    transform: translate(2px, 2px);
    opacity: 0.8;
  }
  83% {
    transform: translate(-2px, 2px);
    opacity: 0.8;
  }
  84% {
    transform: translate(0);
    opacity: 0;
  }
}

@keyframes glitch-2 {
  0%, 60%, 100% {
    transform: translate(0);
    opacity: 0;
  }
  61% {
    transform: translate(3px, 0);
    opacity: 0.7;
    filter: hue-rotate(-90deg);
  }
  62% {
    transform: translate(-3px, 0);
    opacity: 0.7;
  }
  63% {
    transform: translate(0);
    opacity: 0;
  }
}

/* 添加扫描线效果 */
.glitch-text::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    transparent 0%,
    rgba(189, 52, 254, 0.1) 50%,
    transparent 100%
  );
  background-size: 100% 4px;
  pointer-events: none;
  animation: scanline 6s linear infinite;
  z-index: 4;
}

@keyframes scanline {
  from {
    background-position: 0 -100%;
  }
  to {
    background-position: 0 200%;
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .glitch-text {
    font-size: clamp(2rem, 8vw, 4rem);
  }
}
</style>
