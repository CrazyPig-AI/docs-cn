<template>
  <section class="contact-section">
    <div class="contact-container">
      <h2>联系我</h2>
      <h3>有任何问题或建议？欢迎联系我</h3>

      <div class="contact-cards">
        <!-- 邮箱卡片 -->
        <div class="contact-card">
          <div class="contact-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </div>
          <h4>邮箱</h4>
          <a href="mailto:shenpeiheng0823@gmail.com" class="contact-link">
            shenpeiheng0823@gmail.com
          </a>
          <br/>
          <a href="mailto:shen.pei.heng@foxmail.com" class="contact-link">
            shen.pei.heng@foxmail.com
          </a>
        </div>

        <!-- 微信卡片 -->
        <div class="contact-card">
          <div class="wechat-qr-container">
            <div class="qr-placeholder">
              <img src="/wechat-qr.png" alt="微信二维码" class="qr-code" v-if="hasQrCode" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const hasQrCode = ref(false)

onMounted(() => {
  // 检查二维码图片是否存在
  const img = new Image()
  img.onload = () => {
    hasQrCode.value = true
  }
  img.onerror = () => {
    hasQrCode.value = false
  }
  img.src = '/wechat-qr.png'
})
</script>

<style scoped>
.contact-section {
  margin-top: 140px;
  padding: 80px 20px;
  position: relative;

  @media (min-width: 768px) {
    padding: 100px 40px;
  }

  h2 {
    background: linear-gradient(0deg, #fff 0%, rgba(255, 255, 255, 0.76) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0 auto 10px;
    text-align: center;
    font-size: 40px;
    font-weight: 600;
    line-height: 120%;
    letter-spacing: -1px;

    @media (min-width: 768px) {
      font-size: 48px;
    }
  }

  h3 {
    color: #d4d4d8;
    text-align: center;
    margin: 0 auto 60px;
    font-size: 18px;
    font-weight: 400;
  }
}

.contact-container {
  max-width: 900px;
  margin: 0 auto;
}

.contact-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
}

.contact-card {
  background: rgba(30, 30, 30, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }

  h4 {
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    margin: 20px 0 15px;
  }
}

.contact-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(97, 217, 255, 0.1), rgba(122, 35, 161, 0.1));
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0 auto;

  svg {
    color: #61d9ff;
  }
}

.contact-link {
  display: inline-block;
  color: #61d9ff;
  font-size: 16px;
  text-decoration: none;
  padding: 8px 0;
  transition: all 0.2s ease;
  word-break: break-all;

  &:hover {
    color: #7dd3fc;
    text-decoration: underline;
  }
}

.wechat-qr-container {
  margin-top: 10px;
}

.qr-placeholder {
  width: 180px;
  height: 180px;
  margin: 0 auto 15px;
  background: rgba(0, 0, 0, 0.3);
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.qr-code {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.qr-placeholder-text {
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  padding: 20px;

  p {
    margin: 0 0 8px 0;
    font-size: 14px;
  }

  small {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.3);
  }
}

.qr-hint {
  color: #d4d4d8;
  font-size: 14px;
  margin: 0;
}
</style>
