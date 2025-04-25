<template>
  <div class="home">
    <div class="hero-section">
      <h1>偏爱 <span class="subtitle-inline">(Pian Ai)</span></h1>
      <p class="subtitle">记录你的情感、目标和灵感</p>
    </div>

    <div class="feature-cards">
      <div class="feature-card" @click="$router.push('/diary')">
        <div class="card-icon">
          <i class="bi bi-journal-richtext"></i>
        </div>
        <div class="card-content">
          <h2>情绪日记 / 告白信笺</h2>
          <p>记录每日的心情波动、想法或写下如同歌词般强烈情感的"告白信件"</p>
        </div>
      </div>

      <div class="feature-card" @click="$router.push('/goals')">
        <div class="card-icon">
          <i class="bi bi-trophy"></i>
        </div>
        <div class="card-content">
          <h2>决心印记 / 目标追踪</h2>
          <p>设定与这份"偏爱"相关的个人目标或决心，并打卡记录</p>
        </div>
      </div>

      <div class="feature-card" @click="$router.push('/visual-board')">
        <div class="card-icon">
          <i class="bi bi-grid-3x3-gap"></i>
        </div>
        <div class="card-content">
          <h2>"我的答案" 视觉板</h2>
          <p>一个个性化的展示板，集中展示所有关于这份"偏爱"的核心信念和感受</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

h1 {
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  color: #ff4081;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.subtitle-inline {
  font-size: 2.5rem;
  font-weight: 400;
  color: #7e57c2;
}

.subtitle {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #555;
  font-weight: 400;
}

.feature-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
}

.feature-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  padding: 0;
  width: 320px;
  cursor: pointer;
  transition: all 0.4s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0,0,0,0.05);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.card-icon {
  background: linear-gradient(135deg, #ff4081 0%, #7e57c2 100%);
  color: white;
  padding: 25px 0;
  text-align: center;
}

.card-icon i {
  font-size: 3rem;
}

.card-content {
  padding: 25px;
}

.feature-card h2 {
  color: #333;
  margin-bottom: 12px;
  font-size: 1.4rem;
  font-weight: 600;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .feature-card {
    width: 100%;
  }

  h1 {
    font-size: 2.5rem;
  }

  .subtitle-inline {
    font-size: 1.8rem;
  }
}
</style>
