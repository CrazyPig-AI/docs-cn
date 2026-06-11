<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  text: string
  class?: string
}>()

const glitchRef = ref<HTMLDivElement | null>(null)
const chars = computed(() => props.text.split(''))
</script>

<template>
  <div ref="glitchRef" :class="['glitch-text', props.class]">
    <span
      v-for="(char, index) in chars"
      :key="index"
      class="glitch-char"
      :style="{ '--char-index': index }"
    >
      <span class="glitch-char__main">{{ char }}</span>
      <span class="glitch-char__layer glitch-char__layer--1">{{ char }}</span>
      <span class="glitch-char__layer glitch-char__layer--2">{{ char }}</span>
    </span>
  </div>
</template>

<style scoped>
.glitch-text {
  position: relative;
  display: inline-flex;
  font-weight: 900;
  font-size: clamp(3rem, 10vw, 8rem);
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.glitch-char {
  position: relative;
  display: inline-block;
  opacity: 0;
  animation: char-bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  animation-delay: calc(var(--char-index) * 0.2s);
}

@keyframes char-bounce-in {
  0% {
    opacity: 0;
    transform: scale(0) translateY(-100px) rotate(-180deg);
  }
  60% {
    opacity: 1;
    transform: scale(1.2) translateY(0) rotate(10deg);
  }
  80% {
    transform: scale(0.9) rotate(-5deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0) rotate(0);
  }
}

.glitch-char__main {
  position: relative;
  z-index: 3;
  display: inline-block;
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

.glitch-char__layer {
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

.glitch-char__layer--1 {
  z-index: 1;
  animation: glitch-1 3s infinite;
}

.glitch-char__layer--2 {
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

/* 响应式 */
@media (max-width: 768px) {
  .glitch-text {
    font-size: clamp(2rem, 8vw, 4rem);
  }
}
</style>
