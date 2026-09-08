<script setup lang="ts">
defineProps<{
  image: string
}>()
</script>

<template>
  <section id="inicio" class="hero-section">
    <div class="hero-content">
      <span class="badge">Solução simples e moderna</span>

      <h1>Organize tudo o que você precisa em um só lugar</h1>

      <p>
        Uma landing page responsiva, clara e funcional para apresentar sua solução
        em desktop, tablet e mobile.
      </p>

      <div class="hero-actions">
        <a href="#contato" class="primary-btn">Começar agora</a>
        <a href="#sobre" class="secondary-btn">Saiba mais</a>
      </div>
    </div>

    <div class="hero-visual">
      <img
        :src="image"
        alt="Ilustração principal da landing page"
        class="hero-image"
        width="460"
        height="460"
        loading="lazy"
        decoding="async"
      />
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 0;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 40px;
  align-items: center;
}

.badge {
  display: inline-block;
  margin-bottom: 16px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  font-size: 0.9rem;
}

.hero-content h1 {
  margin: 0 0 20px;
  font-size: 3rem;
  line-height: 1.1;
}

.hero-content p {
  margin: 0 0 28px;
  max-width: 560px;
  color: #cbd5e1;
  font-size: 1.05rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image {
  width: 100%;
  max-width: 460px;
  height: auto;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.primary-btn,
.secondary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 20px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.primary-btn {
  background: #ffffff;
  color: #0f172a;
}

.secondary-btn {
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #ffffff;
  background: rgba(255, 255, 255, 0.04);
}

.primary-btn:hover,
.secondary-btn:hover {
  transform: translateY(-1px);
  opacity: 0.92;
}

@media (max-width: 1024px) {
  .hero-section {
    grid-template-columns: 1fr;
    padding-top: 48px;
    padding-bottom: 48px;
    text-align: center;
  }
  
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-content p {
    margin-left: auto;
    margin-right: auto;
  }
  
  .hero-actions {
    justify-content: center;
  }

  .hero-image {
    max-width: 380px;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .primary-btn,
  .secondary-btn {
    width: 100%;
  }

  .hero-image {
    max-width: 100%;
  }
}
</style>
