<script setup lang="ts">
import { ref, onMounted } from 'vue'

const orbRef = ref<HTMLDivElement | null>(null)
</script>

<template>
  <div class="ai-orb-container">
    <div ref="orbRef" class="ai-orb">
      <!-- 核心 -->
      <div class="orb-core"></div>

      <!-- 旋转环 -->
      <div class="orb-ring ring-1"></div>
      <div class="orb-ring ring-2"></div>
      <div class="orb-ring ring-3"></div>

      <!-- 粒子 -->
      <div class="orb-particles">
        <span class="particle" style="--angle: 0deg; --delay: 0s;"></span>
        <span class="particle" style="--angle: 60deg; --delay: 0.5s;"></span>
        <span class="particle" style="--angle: 120deg; --delay: 1s;"></span>
        <span class="particle" style="--angle: 180deg; --delay: 1.5s;"></span>
        <span class="particle" style="--angle: 240deg; --delay: 2s;"></span>
        <span class="particle" style="--angle: 300deg; --delay: 2.5s;"></span>
      </div>

      <!-- 能量波 -->
      <div class="energy-wave wave-1"></div>
      <div class="energy-wave wave-2"></div>
      <div class="energy-wave wave-3"></div>
    </div>
  </div>
</template>

<style scoped>
.ai-orb-container {
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: orb-entrance 1.5s ease-out 0.5s both;
}

@keyframes orb-entrance {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.ai-orb {
  position: relative;
  width: 200px;
  height: 200px;
  animation: orb-float 6s ease-in-out infinite;
}

@keyframes orb-float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* 核心 */
.orb-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, #BD34FE 0%, #41D1FF 50%, #FFD700 100%);
  box-shadow:
    0 0 30px rgba(189, 52, 254, 0.8),
    0 0 60px rgba(65, 209, 255, 0.6),
    0 0 90px rgba(255, 215, 0, 0.4),
    inset 0 0 30px rgba(255, 255, 255, 0.3);
  animation: core-pulse 2s ease-in-out infinite;
}

@keyframes core-pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    box-shadow:
      0 0 30px rgba(189, 52, 254, 0.8),
      0 0 60px rgba(65, 209, 255, 0.6),
      0 0 90px rgba(255, 215, 0, 0.4);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow:
      0 0 50px rgba(189, 52, 254, 1),
      0 0 80px rgba(65, 209, 255, 0.8),
      0 0 120px rgba(255, 215, 0, 0.6);
  }
}

/* 旋转环 */
.orb-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: rgba(189, 52, 254, 0.6);
  border-right-color: rgba(65, 209, 255, 0.6);
}

.ring-1 {
  width: 120px;
  height: 120px;
  animation: ring-rotate 3s linear infinite;
}

.ring-2 {
  width: 160px;
  height: 160px;
  animation: ring-rotate 4s linear infinite reverse;
  border-top-color: rgba(65, 209, 255, 0.6);
  border-right-color: rgba(255, 215, 0, 0.6);
}

.ring-3 {
  width: 200px;
  height: 200px;
  animation: ring-rotate 5s linear infinite;
  border-top-color: rgba(255, 215, 0, 0.6);
  border-right-color: rgba(189, 52, 254, 0.6);
}

@keyframes ring-rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* 粒子 */
.orb-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #41D1FF;
  box-shadow: 0 0 10px #41D1FF;
  transform-origin: 0 0;
  animation: particle-orbit 4s linear infinite;
  animation-delay: var(--delay);
}

@keyframes particle-orbit {
  from {
    transform: rotate(var(--angle)) translateX(100px) rotate(calc(-1 * var(--angle)));
  }
  to {
    transform: rotate(calc(var(--angle) + 360deg)) translateX(100px) rotate(calc(-1 * (var(--angle) + 360deg)));
  }
}

/* 能量波 */
.energy-wave {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid rgba(189, 52, 254, 0.5);
  animation: wave-expand 3s ease-out infinite;
}

.wave-1 {
  animation-delay: 0s;
}

.wave-2 {
  animation-delay: 1s;
}

.wave-3 {
  animation-delay: 2s;
}

@keyframes wave-expand {
  0% {
    width: 80px;
    height: 80px;
    opacity: 1;
    border-width: 3px;
  }
  100% {
    width: 300px;
    height: 300px;
    opacity: 0;
    border-width: 0px;
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .ai-orb-container {
    width: 200px;
    height: 200px;
  }

  .ai-orb {
    width: 150px;
    height: 150px;
  }

  .orb-core {
    width: 60px;
    height: 60px;
  }

  .ring-1 {
    width: 90px;
    height: 90px;
  }

  .ring-2 {
    width: 120px;
    height: 120px;
  }

  .ring-3 {
    width: 150px;
    height: 150px;
  }
}
</style>
