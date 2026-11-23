<script setup lang="ts">
import LandingHeader from '@/components/landing/LandingHeader.vue'
import Hero from '@/components/landing/Hero.vue'
import LandingAbout from '@/components/landing/LandingAbout.vue'
import ProjectsSection from '@/components/landing/ProjectsSection.vue'
import TechStack from '@/components/landing/TechStack.vue'
import ApproachSteps from '@/components/landing/ApproachSteps.vue'
import ContactForm from '@/components/landing/ContactForm.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-deep-blue text-ice">
    <LandingHeader />

    <main>
      <Hero />
      <LandingAbout />
      <ProjectsSection />
      <TechStack />
      <ApproachSteps />
      <ContactForm />
    </main>

    <LandingFooter />
  </div>
</template>