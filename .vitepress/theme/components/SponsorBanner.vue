<script setup lang="ts">
/**
 * Adding a new banner:
 * 1. uncomment the banner slot in ../index.ts
 * 2. uncomment and update BANNER_ID in ../../inlined-scripts/restorePreferences.ts
 * 3. update --vp-layout-top-height if necessary
 */
import { ref } from 'vue'

const open = ref(true)

/**
 * Call this if the banner is dismissible
 */
function dismiss() {
  open.value = false
  document.documentElement.classList.add('banner-dismissed')
  localStorage.setItem(`vite-docs-banner-${window.__VITE_BANNER_ID__}`, 'true')
}
</script>

<template>
  <div class="banner" v-if="open">
    <svg width="100" height="20" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="50" y="15" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#6254FE">
        CRAZY PIG +
      </text>
    </svg>
    <div class="vt-banner-text">
      <p style="display: inline-block">要想富 | 先发疯 | ai</p>
      <a
        target="_top"
        class="vt-primary-action"
        href="JavaScript:void(0)"
      >
        Learn more
      </a>
    </div>
    <button aria-label="close" @click="dismiss">
      <svg
        class="close"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
      >
        <path
          d="M18.9,10.9h-6v-6c0-0.6-0.4-1-1-1s-1,0.4-1,1v6h-6c-0.6,0-1,0.4-1,1s0.4,1,1,1h6v6c0,0.6,0.4,1,1,1s1-0.4,1-1v-6h6c0.6,0,1-0.4,1-1S19.5,10.9,18.9,10.9z"
        />
      </svg>
    </button>
    <div class="glow glow--purple"></div>
    <div class="glow glow--blue"></div>
  </div>
</template>

<style>
html:not(.banner-dismissed) {
  --vp-layout-top-height: 30px;
}
</style>

<style scoped>
.banner {
  position: fixed;
  z-index: 10;
  box-sizing: border-box;
  top: 0;
  left: 0;
  right: 0;
  height: var(--vp-layout-top-height);
  line-height: var(--vp-layout-top-height);
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: #262626;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.glow.glow--purple {
  position: absolute;
  bottom: -15%;
  left: -75%;
  width: 80%;
  aspect-ratio: 1.5;
  pointer-events: none;
  border-radius: 100%;
  background: linear-gradient(270deg, #7a23a1, #715ebde6 60% 80%, #bd34fe00);
  filter: blur(15vw);
  transform: none;
  opacity: 0.6;
}

.glow.glow--blue {
  position: absolute;
  bottom: -15%;
  right: -40%;
  width: 80%;
  aspect-ratio: 1.5;
  pointer-events: none;
  border-radius: 100%;
  background: linear-gradient(180deg, #61d9ff, #0000);
  filter: blur(15vw);
  transform: none;
  opacity: 0.3;
}

@media (min-width: 768px) {
  .glow.glow--blue {
    top: -15%;
    right: -40%;
    width: 80%;
  }

  .glow.glow--purple {
    bottom: -15%;
    left: -40%;
    width: 80%;
  }
}

@media (min-width: 1025px) {
  .glow.glow--blue {
    top: -15%;
    right: -40%;
    width: 80%;
  }

  .glow.glow--purple {
    bottom: -15%;
    left: -40%;
    width: 80%;
  }
}

.banner-dismissed .banner {
  display: none;
}

button {
  position: absolute;
  right: 0;
  top: 0;
  padding: 5px 5px;
}

.close {
  width: 20px;
  height: 20px;
  fill: #fff;
  transform: rotate(45deg);
}

.vt-banner-text {
  color: #fff;
  font-size: 14px;
  margin-left: 0.75rem;
}

.vt-main {
  color: transparent;
  background-image: linear-gradient(120deg, #858487 16%, #9499ff, #9499ff);
  background-clip: text;
}

.vt-primary-action {
  background:
    radial-gradient(140.35% 140.35% at 175% 94.74%, #2bfdd2, #bd34fe00),
    radial-gradient(89.94% 89.94% at 18.42% 15.79%, #603cff, #41d1ff00);
  color: #fff;
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 12px;
  text-decoration: none;
  margin: 0 0.75rem;
  transition: all 0.2s ease-in-out;
}

@media (max-width: 1280px) {
  .banner .vt-banner-text,
  .banner .vt-primary-action {
    font-size: 10px;
  }

  .vt-tagline {
    display: none;
  }
}

@media (max-width: 780px) {
  .vt-tagline {
    display: none;
  }

  .vt-coupon {
    display: none;
  }

  .vt-primary-action {
    margin: 0 10px;
    padding: 4px 8px;
  }

  .vt-time-now {
    display: none;
  }
}

@media (max-width: 560px) {
  .vt-place {
    display: none;
  }
}
</style>
