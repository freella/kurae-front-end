<script setup lang="ts">
import pineappleImage from '@/assets/pinaple.webp'

// Importando os novos componentes modulares
import LandingHeader from './landing/LandingHeader.vue'
import LandingHero from './landing/LandingHero.vue'
import LandingAbout from './landing/LandingAbout.vue'
import ProjectsSection from './landing/ProjectsSection.vue'
import TechStack from './landing/TechStack.vue'
import LandingFeatures from './landing/LandingFeatures.vue'
import LandingFaq from './landing/LandingFaq.vue'
import LandingContact from './landing/ContactForm.vue'
import LandingFooter from './landing/LandingFooter.vue'
</script>

<template>
  <div class="landing-page">
    <LandingHeader />
    
    <main>
      <LandingHero :image="pineappleImage" />
      <LandingAbout />
      <ProjectsSection />
      <TechStack />
      <LandingFeatures />
      <LandingFaq />
      <LandingContact />
    </main>

    <LandingFooter />
  </div>
</template>

<style scoped>
.landing-page {
  min-height: 100vh;
  padding: 0 24px;
  color: #f8fafc;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  overflow-x: hidden;
}

@media (max-width: 480px) {
  .landing-page {
    padding: 0 16px;
  }
}
</style>