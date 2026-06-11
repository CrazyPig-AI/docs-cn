<script setup lang="ts">
import { type Ref } from 'vue'

/**
 * 框架/工具磁贴（发光网格版）。
 *
 * 玻璃拟态磁贴，显示 logo + 名称。入场由 `framework.visible` 驱动
 * （由 FrameworksSectionNew 的 GSAP 时间线逐个置 true），并按 index 做
 * 轻微错峰；hover 时上浮、描边发光、logo 放大。
 */
interface Framework {
  name: string
  logo: string
  color: string
  url: string
  visible: Ref<boolean>
  isHighlighted: Ref<boolean>
}

const props = defineProps<{
  framework: Framework
  index: number
}>()
</script>

<template>
  <component
    :is="props.framework.url ? 'a' : 'div'"
    :href="props.framework.url || undefined"
    :target="props.framework.url ? '_blank' : undefined"
    rel="noopener"
    class="framework-card-new"
    :class="{
      'is-visible': props.framework.visible.value === true,
      'is-highlighted': props.framework.isHighlighted.value === true
    }"
    :style="{
      '--glow-color': props.framework.color,
      '--enter-delay': `${(props.index % 8) * 0.05}s`,
    }"
  >
    <div class="fcn__glow" aria-hidden="true"></div>
    <div class="fcn__logo">
      <img
        v-if="props.framework.logo"
        :src="props.framework.logo"
        :alt="props.framework.name"
        loading="lazy"
      />
    </div>
    <span class="fcn__name">{{ props.framework.name }}</span>
  </component>
</template>

<style scoped>
.framework-card-new {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 22px 14px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(20, 20, 24, 0.45);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  --glow-color: #41d1ff;

  /* 入场前状态 */
  opacity: 0;
  transform: translateY(22px) scale(0.96);
  transition:
    opacity 0.6s ease,
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.35s ease,
    box-shadow 0.35s ease,
    background 0.35s ease;
}

.framework-card-new.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition-delay: var(--enter-delay), var(--enter-delay), 0s, 0s, 0s;
}

/* 背景发光晕（hover 显现） */
.fcn__glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 30%,
    color-mix(in srgb, var(--glow-color) 35%, transparent) 0%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
}

.fcn__logo {
  position: relative;
  z-index: 1;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fcn__logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.35s ease;
  filter: drop-shadow(
    0 0 0.5rem color-mix(in srgb, var(--glow-color) 25%, transparent)
  );
}

.fcn__name {
  position: relative;
  z-index: 1;
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.2px;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
  transition: color 0.35s ease;
}

/* hover */
.framework-card-new:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: color-mix(in srgb, var(--glow-color) 55%, transparent);
  background: rgba(26, 26, 32, 0.6);
  box-shadow:
    0 18px 50px -18px color-mix(in srgb, var(--glow-color) 65%, transparent),
    0 0 0 1px color-mix(in srgb, var(--glow-color) 40%, transparent) inset;
}

.framework-card-new:hover .fcn__glow {
  opacity: 0.8;
}

.framework-card-new:hover .fcn__logo img {
  transform: scale(1.12);
  filter: drop-shadow(
    0 0 0.9rem color-mix(in srgb, var(--glow-color) 60%, transparent)
  );
}

.framework-card-new:hover .fcn__name {
  color: #fff;
}

/* 高亮状态 */
.framework-card-new.is-highlighted {
  transform: translateY(-8px) scale(1.05);
  border-color: color-mix(in srgb, var(--glow-color) 70%, transparent);
  background: rgba(26, 26, 32, 0.7);
  box-shadow:
    0 20px 60px -20px color-mix(in srgb, var(--glow-color) 80%, transparent),
    0 0 0 2px color-mix(in srgb, var(--glow-color) 50%, transparent) inset;
}

.framework-card-new.is-highlighted .fcn__glow {
  opacity: 1;
}

.framework-card-new.is-highlighted .fcn__logo img {
  transform: scale(1.15);
  filter: drop-shadow(
    0 0 1rem color-mix(in srgb, var(--glow-color) 80%, transparent)
  );
}

.framework-card-new.is-highlighted .fcn__name {
  color: #fff;
}

@media (max-width: 768px) {
  .framework-card-new {
    padding: 18px 10px;
    gap: 10px;
  }

  .fcn__logo {
    width: 38px;
    height: 38px;
  }

  .fcn__name {
    font-size: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .framework-card-new {
    opacity: 1;
    transform: none;
    transition: border-color 0.35s ease, box-shadow 0.35s ease;
  }

  .framework-card-new:hover {
    transform: none;
  }

  .framework-card-new:hover .fcn__logo img {
    transform: none;
  }
}
</style>
