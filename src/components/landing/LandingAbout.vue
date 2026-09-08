<template>
  <section id="sobre" class="about-section">
    <div class="about-inner">
      <div class="about-text">
        <span class="section-label">Sobre nós</span>
        <h2>Criado para quem quer resultados reais</h2>
        <p>
          Nascemos da necessidade de simplificar a presença digital de negócios e profissionais.
          Nossa missão é oferecer uma solução acessível, bonita e fácil de usar — sem abrir mão
          da qualidade.
        </p>
        <p>
          Acreditamos que todo projeto merece uma boa vitrine. Por isso, desenvolvemos uma
          plataforma que une design moderno com tecnologia robusta, para que você possa focar
          no que realmente importa: o seu negócio.
        </p>
        <div class="about-stats">
          <div class="stat">
            <strong>+500</strong>
            <span>Projetos entregues</span>
          </div>
          <div class="stat">
            <strong>98%</strong>
            <span>Clientes satisfeitos</span>
          </div>
          <div class="stat">
            <strong>24h</strong>
            <span>Tempo de resposta</span>
          </div>
        </div>
      </div>

<div class="about-visuals">
        <div class="about-highlight">
          <div class="highlight-card">
            <v-icon class="highlight-icon" icon="mdi-target" />
            <h3>Foco no essencial</h3>
            <p>Sem complexidade desnecessária. Entregamos o que realmente gera resultado.</p>
          </div>
          <div class="highlight-card">
            <v-icon class="highlight-icon" icon="mdi-lightbulb-outline" />
            <h3>Inovação constante</h3>
            <p>Sempre evoluindo para acompanhar as tendências e as necessidades do mercado.</p>
          </div>
        </div>

        <div class="meme-container">
          <img 
            src="@/assets/meme.webp" 
            alt="Meme do projeto" 
            class="meme-image"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 72px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.about-inner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 56px;
  align-items: center;
}

.section-label {
  display: inline-block;
  margin-bottom: 12px;
  color: #93c5fd;
  font-size: 0.9rem;
  font-weight: 600;
}

.about-text h2 {
  margin: 0 0 20px;
  font-size: 2rem;
  line-height: 1.2;
}

.about-text p {
  color: #cbd5e1;
  line-height: 1.7;
  margin-bottom: 16px;
}

.about-stats {
  display: flex;
  gap: 32px;
  margin-top: 32px;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat strong {
  font-size: 1.75rem;
  font-weight: 700;
  color: #93c5fd;
}

.stat span {
  font-size: 0.85rem;
  color: #94a3b8;
}

.about-highlight {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.about-visuals {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.meme-container {
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.meme-container:hover {
  transform: translateY(-5px);
}

.meme-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.highlight-card {
  padding: 24px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.highlight-icon {
  font-size: 1.75rem !important;
  display: block;
  margin-bottom: 12px;
  color: #93c5fd !important;
}

.highlight-card h3 {
  margin: 0 0 8px;
  font-size: 1rem;
  font-weight: 600;
}

.highlight-card p {
  margin: 0;
  color: #cbd5e1;
  font-size: 0.92rem;
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .about-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .about-highlight {
    flex-direction: row;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .about-highlight {
    flex-direction: column;
  }
  
  .about-stats {
    gap: 20px;
  }

  .about-text h2 {
    font-size: 1.6rem;
  }
}
</style>
