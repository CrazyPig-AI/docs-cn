---
title: 疯猪
titleTemplate: AI
# add `dark` here to apply dark mode on initial load,
# since `onMounted` doesn't run during SSR
pageClass: landing dark

layout: home
aside: false
editLink: false
markdownStyles: false
---

<script setup>
import { useData } from 'vitepress'
import { onBeforeUnmount, onMounted, ref } from 'vue'

import Hero from './.vitepress/theme/components/landing/1. hero-section/HeroSectionNew.vue'
import FeatureSection from './.vitepress/theme/components/landing/2. feature-section/FeatureSectionNew.vue'
import FrameworksSection from './.vitepress/theme/components/landing/3. frameworks-section/FrameworksSectionNew.vue'
import CommunitySection from './.vitepress/theme/components/landing/4. community-section/CommunitySection.vue'
import SponsorSection from './.vitepress/theme/components/landing/5. sponsor-section/SponsorSection.vue'
import GetStartedSection from './.vitepress/theme/components/landing/6. get-started-section/GetStartedSection.vue'
import ContactSection from './.vitepress/theme/components/landing/7. contact-section/ContactSection.vue'

const { isDark } = useData()

onMounted(() => {
  document.documentElement.classList.add('dark')
})

onBeforeUnmount(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
})
</script>

<div class="VPHome">
  <Hero/>
  <FeatureSection />
  <FrameworksSection />
  <!--<CommunitySection />
  <SponsorSection />
  <GetStartedSection />-->
  <ContactSection />
</div>
