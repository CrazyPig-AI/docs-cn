<script setup lang="ts">
import { ref } from 'vue'
import HeroDiagram from './HeroDiagram.vue'

const openPopupWindow = (url, windowName, windowFeatures) => {
  // 使用实际的public目录下的HTML文件路径
  const actualUrl = '/pig-text/index.html';
  window.open(actualUrl, windowName, windowFeatures);
}
</script>

<template>
  <div class="hero">
    <div class="container">
      <!-- ViteConf 2025 Button -->
      <a
        href="JavaScript:void(0)"
        class="hero__pill"
        target="_top"
      >
        <img
          src="../../../../../images/viteconf.svg"
          alt="Viteconf logo"
          width="20"
          height="20"
        />
        <span>CRAZY PIG AI</span>
      </a>

      <!-- Heading -->
      <h1 class="golden-ai">要想富 先发疯</h1>
      <!-- Tagline -->
      <h3 class="golden-ai">
        疯猪AI
      </h3>

      <!-- CTA Buttons -->
      <div class="hero__actions">
        <a href="/deploy/" class="btn btn--primary">疯力文档</a>
        <a
          href="#"
          class="btn btn--outline"
          @click.prevent="openPopupWindow('/pig-text/index.html', 'pig-text-window', 'width=800,height=600,scrollbars=yes,resizable=yes')"
        >
          <img src="./github.svg" alt="GitHub logo" width="20" height="20" />
          疯力娱乐
        </a>
      </div>
    </div>

    <!-- Animated Diagram -->
    <HeroDiagram />
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  z-index: 2;
  margin-bottom: 0;
  background-color: #101010;

  @media (min-width: 768px) {
    margin-bottom: 60px;
  }
}

.container {
  display: flex;
  flex-direction: column;
  max-width: 902px;
  margin: 60px auto 0;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (min-width: 768px) {
    margin: 95px auto 0;
  }
}

.hero__pill {
  color: #fff;
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.3px;
  display: inline-flex;
  padding: 6px 16px;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  border: 1px solid rgba(189, 52, 254, 0.5);
  background: radial-gradient(
    1686.42% 113.39% at 83.25% 2.56%,
    rgba(189, 52, 254, 0.1) 0%,
    rgba(189, 52, 254, 0) 100%
  );
  box-shadow: none;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    margin-bottom: 25px;
  }

  span {
    color: #fff;
    font-family: Inter, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.28px;
  }

  &:hover {
    animation: hero-pill-glow 1600ms ease-out infinite alternate;
  }
}

@keyframes hero-pill-glow {
  0% {
    border-color: rgba(189, 52, 254, 0.5);
    box-shadow:
      0 0 5px rgba(189, 52, 254, 0.01),
      inset 0 0 5px rgba(189, 52, 254, 0.1);
  }
  100% {
    border-color: rgba(189, 52, 254, 0.6);
    box-shadow:
      0 0 20px rgba(189, 52, 254, 0.2),
      inset 0 0 10px rgba(189, 52, 254, 0.2);
  }
}

.hero__actions {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;

  @media (min-width: 768px) {
    margin-top: 0;
  }
}

.golden-ai {
  font-weight: bold;
  background: linear-gradient(45deg, #FFD700, #FFEC8B, #FFD700, #DAA520, #FFD700);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
  animation: shine 2s linear infinite;
}
@keyframes shine {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}
</style>
