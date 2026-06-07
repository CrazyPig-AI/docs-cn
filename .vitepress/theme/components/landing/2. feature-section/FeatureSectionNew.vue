<script setup lang="ts">
/**
 * 核心能力展示区（彻底重做版）。
 *
 * 自包含：不再依赖旧的 8 个特性卡片组件，改用 FeatureCardNew 渲染一组
 * bento 错落网格。背景克制（仅一层缓慢漂移柔光 + 极淡点阵），把视觉重心
 * 交给卡片本身的 3D 视差与微动效。文案全部重写。
 */
import FeatureCardNew from './FeatureCardNew.vue'

const features = [
  {
    variant: 'neural',
    accent: '#41d1ff',
    wide: true,
    title: '深度语义理解',
    description:
      '意图、语气、上下文一把抓，连弦外之音都读得懂——疯猪 AI 比你更清楚你想说什么。',
  },
  {
    variant: 'bolt',
    accent: '#bd34fe',
    wide: false,
    title: '毫秒级响应',
    description: '话音未落，答案已到。极速推理引擎，让灵感永不排队。',
  },
  {
    variant: 'orbit',
    accent: '#ffd700',
    wide: false,
    title: '越用越懂你',
    description: '每一次对话都是养料，模型持续进化，越聊越默契。',
  },
  {
    variant: 'wave',
    accent: '#41d1ff',
    wide: false,
    title: '多模态交互',
    description: '文字、语音、图像随心切换，用最自然的方式开口。',
  },
  {
    variant: 'shield',
    accent: '#bd34fe',
    wide: false,
    title: '安全可靠',
    description: '端到端加密与隐私护栏，你的数据只属于你。',
  },
  {
    variant: 'spark',
    accent: '#ffd700',
    wide: true,
    title: '创意无界',
    description:
      '一句话，长成一整套方案。灵感被无限放大，创作从此没有边界。',
  },
] as const
</script>

<template>
  <section class="feat">
    <div class="feat__bg" aria-hidden="true">
      <div class="feat__glow"></div>
      <div class="feat__dots"></div>
    </div>

    <header class="feat__head">
      <span class="feat__eyebrow">CORE&nbsp;POWER · 核心能力</span>
      <h2 class="feat__title">
        把复杂留给 AI，<span class="feat__title-grad">把灵感留给你</span>
      </h2>
      <p class="feat__sub">六项硬核能力，让每一次发疯都恰到好处</p>
    </header>

    <div class="feat__grid">
      <FeatureCardNew
        v-for="(f, i) in features"
        :key="f.title"
        :variant="f.variant"
        :accent="f.accent"
        :wide="f.wide"
        :index="i"
        :title="f.title"
        :description="f.description"
        :class="{ 'feat__cell--wide': f.wide }"
      />
    </div>
  </section>
</template>

<style scoped>
.feat {
  position: relative;
  padding: 120px 24px 130px;
  overflow: hidden;
}

/* ////////////////////// 背景（克制） ////////////////////// */
.feat__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.feat__glow {
  position: absolute;
  top: 8%;
  left: 50%;
  width: 900px;
  height: 600px;
  max-width: 120vw;
  transform: translateX(-50%);
  background:
    radial-gradient(closest-side, rgba(189, 52, 254, 0.16), transparent 70%),
    radial-gradient(closest-side, rgba(65, 209, 255, 0.14), transparent 70%);
  background-position: 30% 40%, 70% 60%;
  background-repeat: no-repeat;
  background-size: 70% 80%, 70% 80%;
  filter: blur(20px);
  animation: feat-drift 26s ease-in-out infinite;
}

@keyframes feat-drift {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-46%) translateY(26px); }
}

.feat__dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
  -webkit-mask-image: radial-gradient(ellipse 75% 65% at 50% 42%, #000 35%, transparent 100%);
  mask-image: radial-gradient(ellipse 75% 65% at 50% 42%, #000 35%, transparent 100%);
}

/* ////////////////////// 标题 ////////////////////// */
.feat__head {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 760px;
  margin: 0 auto 64px;
}

.feat__eyebrow {
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

.feat__title {
  font-family: Manrope, sans-serif;
  font-size: clamp(30px, 5vw, 52px);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -1px;
  color: #fff;
  margin: 0 0 16px;
  text-wrap: balance;
}

.feat__title-grad {
  background: linear-gradient(110deg, #bd34fe 0%, #41d1ff 50%, #ffd700 100%);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: feat-flow 6s ease infinite;
}

@keyframes feat-flow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.feat__sub {
  font-family: Inter, sans-serif;
  font-size: clamp(15px, 2vw, 18px);
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
}

/* ////////////////////// Bento 网格 ////////////////////// */
.feat__grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;
  max-width: 1180px;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .feat__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .feat__grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .feat__cell--wide {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .feat {
    padding: 80px 18px 90px;
  }

  .feat__head {
    margin-bottom: 44px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .feat__glow,
  .feat__title-grad {
    animation: none;
  }
}
</style>
