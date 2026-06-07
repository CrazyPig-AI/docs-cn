<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ParticleBackground from './ParticleBackground.vue'
import AIOrb from './AIOrb.vue'
import GlitchText from './GlitchText.vue'

const openPopupWindow = (url: string, windowName: string, windowFeatures: string) => {
  const actualUrl = '/pig-text/index.html'
  window.open(actualUrl, windowName, windowFeatures)
}

// 鼠标跟随效果
const mouseX = ref(0)
const mouseY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div class="hero-new">
    <!-- 粒子背景 -->
    <ParticleBackground />

    <!-- 渐变光效背景 -->
    <div class="gradient-orbs">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>

    <!-- 鼠标跟随光效 -->
    <div
      class="mouse-glow"
      :style="{
        left: mouseX + 'px',
        top: mouseY + 'px'
      }"
    ></div>

    <!-- 网格背景 -->
    <div class="grid-background"></div>

    <div class="container">
      <!-- AI Badge -->
      <div class="ai-badge">
        <div class="badge-glow"></div>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L12.5 7.5L18 10L12.5 12.5L10 18L7.5 12.5L2 10L7.5 7.5L10 2Z"
                fill="url(#star-gradient)"
                stroke="currentColor"
                stroke-width="1"/>
          <defs>
            <linearGradient id="star-gradient" x1="2" y1="2" x2="18" y2="18">
              <stop offset="0%" stop-color="#BD34FE"/>
              <stop offset="100%" stop-color="#41D1FF"/>
            </linearGradient>
          </defs>
        </svg>
        <span class="badge-text">CRAZY PIG AI · 疯猪智能</span>
        <div class="badge-pulse"></div>
      </div>

      <!-- 主标题 - 使用故障艺术效果 -->
      <GlitchText text="要想富 先发疯" class="main-title" />

      <!-- AI 核心球体 -->
      <AIOrb />

      <!-- 副标题 -->
      <div class="subtitle-container">
        <h2 class="subtitle">
          <span class="text-line">
            <span class="char" style="--char-index: 0">疯</span>
            <span class="char" style="--char-index: 1">猪</span>
            <span class="char" style="--char-index: 2">A</span>
            <span class="char" style="--char-index: 3">I</span>
          </span>
          <span class="cursor">_</span>
        </h2>
        <p class="tagline">
          <span class="tagline-icon">⚡</span>
          让 AI 成为你的超能力
          <span class="tagline-icon">✨</span>
        </p>
      </div>

      <!-- CTA 按钮 -->
      <div class="hero__actions">
        <a href="/deploy/" class="btn btn--primary">
          <span class="btn-bg"></span>
          <span class="btn-text">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2V14M2 8H14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            释放疯力
          </span>
          <span class="btn-glow"></span>
        </a>
        <a
          href="#"
          class="btn btn--outline"
          @click.prevent="openPopupWindow('/pig-text/index.html', 'pig-text-window', 'width=800,height=600,scrollbars=yes,resizable=yes')"
        >
          <span class="btn-bg"></span>
          <span class="btn-text">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1C11.866 1 15 4.134 15 8C15 11.866 11.866 15 8 15C6.5 15 5.2 14.5 4 13.7L1 15L2.3 12C1.5 10.8 1 9.5 1 8C1 4.134 4.134 1 8 1Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            加入猪群
          </span>
          <span class="btn-particles"></span>
        </a>
      </div>

      <!-- 特性标签云 -->
      <div class="feature-tags">
        <span class="tag" style="--tag-delay: 0s">🚀 极速响应</span>
        <span class="tag" style="--tag-delay: 0.2s">🧠 智能学习</span>
        <span class="tag" style="--tag-delay: 0.4s">💡 创意无限</span>
        <span class="tag" style="--tag-delay: 0.6s">🎯 精准理解</span>
      </div>
    </div>

    <!-- 底部装饰线 -->
    <div class="hero-divider">
      <svg width="100%" height="2" preserveAspectRatio="none">
        <defs>
          <linearGradient id="divider-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#BD34FE" stop-opacity="0"/>
            <stop offset="50%" stop-color="#41D1FF" stop-opacity="1"/>
            <stop offset="100%" stop-color="#BD34FE" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <line x1="0" y1="1" x2="100%" y2="1" stroke="url(#divider-gradient)" stroke-width="2"/>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.hero-new {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
  overflow: hidden;
  padding: 60px 20px;
}

/* 渐变光球背景 */
.gradient-orbs {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: float 20s infinite ease-in-out;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #BD34FE 0%, transparent 70%);
  top: -10%;
  left: -10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #41D1FF 0%, transparent 70%);
  bottom: -15%;
  right: -15%;
  animation-delay: -7s;
}

.orb-3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #FFD700 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -14s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

/* 鼠标跟随光效 */
.mouse-glow {
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(189, 52, 254, 0.15) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1;
  transition: left 0.3s ease, top 0.3s ease;
  filter: blur(40px);
}

/* 网格背景 */
.grid-background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image:
    linear-gradient(rgba(65, 209, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(189, 52, 254, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 0;
  animation: grid-move 20s linear infinite;
}

@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

.container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

/* AI Badge */
.ai-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 24px;
  border-radius: 100px;
  border: 1px solid rgba(189, 52, 254, 0.3);
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(10px);
  animation: badge-entrance 1s ease-out;
  overflow: hidden;
}

@keyframes badge-entrance {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.badge-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(189, 52, 254, 0.3), transparent);
  animation: badge-shine 3s infinite;
}

@keyframes badge-shine {
  to {
    left: 200%;
  }
}

.badge-text {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.badge-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100px;
  border: 2px solid rgba(189, 52, 254, 0.5);
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

/* 主标题 */
.main-title {
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 900;
  line-height: 1.1;
  margin: 0;
  animation: title-entrance 1s ease-out 0.3s both;
}

@keyframes title-entrance {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 副标题 */
.subtitle-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: subtitle-entrance 1s ease-out 0.6s both;
}

.subtitle {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradient-shift 3s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.char {
  display: inline-block;
  animation: char-bounce 1s ease-in-out infinite;
  animation-delay: calc(var(--char-index) * 0.1s);
}

@keyframes char-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.cursor {
  display: inline-block;
  animation: blink 1s step-end infinite;
  color: #41D1FF;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.tagline {
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
}

.tagline-icon {
  display: inline-block;
  animation: icon-float 2s ease-in-out infinite;
}

.tagline-icon:first-child {
  animation-delay: 0s;
}

.tagline-icon:last-child {
  animation-delay: 1s;
}

@keyframes icon-float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-5px) rotate(10deg);
  }
}

@keyframes subtitle-entrance {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 按钮样式 */
.hero__actions {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  animation: actions-entrance 1s ease-out 0.9s both;
}

@keyframes actions-entrance {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.2s ease;
  cursor: pointer;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn:active {
  transform: translateY(0);
}

.btn-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  transition: opacity 0.3s ease;
}

.btn-text {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn--primary {
  background: linear-gradient(135deg, #BD34FE 0%, #41D1FF 100%);
  color: #fff;
  border: none;
  box-shadow: 0 10px 30px rgba(189, 52, 254, 0.3);
}

.btn--primary .btn-bg {
  background: linear-gradient(135deg, #41D1FF 0%, #BD34FE 100%);
  opacity: 0;
}

.btn--primary:hover .btn-bg {
  opacity: 1;
}

.btn--primary .btn-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.btn--primary:hover .btn-glow {
  width: 300px;
  height: 300px;
  opacity: 0;
}

.btn--outline {
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(10px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}

.btn--outline:hover {
  border-color: rgba(65, 209, 255, 0.5);
  box-shadow: 0 5px 30px rgba(65, 209, 255, 0.2);
}

/* 特性标签云 */
.feature-tags {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  animation: tags-entrance 1s ease-out 1.2s both;
}

@keyframes tags-entrance {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tag {
  padding: 8px 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  animation: tag-float 3s ease-in-out infinite;
  animation-delay: var(--tag-delay);
}

@keyframes tag-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* 底部装饰线 */
.hero-divider {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  z-index: 2;
}

/* 响应式 */
@media (max-width: 768px) {
  .hero-new {
    padding: 40px 16px;
    min-height: 90vh;
  }

  .container {
    gap: 30px;
  }

  .feature-tags {
    flex-direction: column;
    align-items: center;
  }

  .hero__actions {
    flex-direction: column;
    width: 100%;
  }

  .btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>
