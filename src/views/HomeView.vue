<script setup lang="ts">
import Hero from '@/components/landing/Hero.vue';
import LandingAbout from '@/components/landing/LandingAbout.vue';
import ProjectsSection from '@/components/landing/ProjectsSection.vue';
import TechStack from '@/components/landing/TechStack.vue';
import ApproachSteps from '@/components/landing/ApproachSteps.vue';
import ContactForm from '@/components/landing/ContactForm.vue';
</script>

<template>
  <main class="bg-slate-950 min-h-screen">
    <Hero />
    <LandingAbout />
    <ProjectsSection />
    <TechStack />
    <ApproachSteps />
    <ContactForm />
  </main>
</template>
