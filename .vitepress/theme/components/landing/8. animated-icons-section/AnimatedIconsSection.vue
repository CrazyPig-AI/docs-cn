<template>
  <section class="animated-icons-section">
    <div class="container">
      <h2 class="section-title">为什么选择疯猪AI?</h2>
      <div class="icons-grid">
        <div v-for="(icon, index) in icons" :key="index" class="icon-card">
          <div :ref="el => iconRefs[index] = el" class="icon-wrapper"></div>
          <h3 class="icon-title">{{ icon.title }}</h3>
          <p class="icon-desc" v-html="icon.desc"></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import lottie from 'lottie-web'
import pako from 'pako'

const iconRefs = ref([])

const icons = ref([
  { title: '简单易用', desc: '<b>疯猪AI</b>界面简洁，零门槛快速上手', animation: '/animations/simple.tgs' },
  { title: '数据安全', desc: '<b>疯猪AI</b>采用端到端加密，保护您的隐私', animation: '/animations/private.tgs' },
  { title: '多端同步', desc: '<b>疯猪AI</b>支持手机、电脑、网页多设备同步', animation: '/animations/synced.tgs' },
  { title: '极速响应', desc: '<b>疯猪AI</b>毫秒级响应，告别等待', animation: '/animations/fast.tgs' },
  { title: '强大能力', desc: '<b>疯猪AI</b>支持无限对话长度和多模态输入', animation: '/animations/powerful.tgs' },
  { title: '开放生态', desc: '<b>疯猪AI</b>开放API接口，自由集成到您的应用', animation: '/animations/open.tgs' },
  { title: '模型安全', desc: '<b>疯猪AI</b>内置安全防护，过滤有害内容', animation: '/animations/secure.tgs' },
  { title: '协作共享', desc: '<b>疯猪AI</b>支持团队协作和对话共享', animation: '/animations/social.tgs' },
  { title: '个性定制', desc: '<b>疯猪AI</b>可自定义提示词和知识库', animation: '/animations/expressive.tgs' }
])

onMounted(async () => {
  for (let index = 0; index < icons.value.length; index++) {
    if (iconRefs.value[index]) {
      try {
        const response = await fetch(icons.value[index].animation)
        const buffer = await response.arrayBuffer()
        const decompressed = pako.ungzip(new Uint8Array(buffer))
        const json = new TextDecoder().decode(decompressed)
        const animationData = JSON.parse(json)

        lottie.loadAnimation({
          container: iconRefs.value[index],
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData
        })
      } catch (e) {
        console.error('Failed:', icons.value[index].animation, e)
      }
    }
  }
})
</script>

<style scoped>
.animated-icons-section {
  padding: 80px 24px;
  background: var(--vp-c-bg);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
  color: var(--vp-c-text-1);
}

.icons-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px 40px;
}

.icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.icon-card:hover {
  transform: translateY(-8px);
}

.icon-wrapper {
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.icon-wrapper :deep(svg) {
  width: 100%;
  height: 100%;
}

.icon-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
}

.icon-desc {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  max-width: 280px;
}

.icon-desc :deep(b) {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

@media (max-width: 960px) {
  .icons-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .section-title {
    font-size: 2rem;
  }

  .icons-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .icon-wrapper {
    width: 120px;
    height: 120px;
  }
}
</style>
