<template>
  <div id="app">
    <header>
      <div class="logo">
        <h1><i class="bi bi-heart-fill logo-icon"></i> 偏爱</h1>
      </div>
      <nav class="desktop-nav">
        <router-link to="/">
          <i class="bi bi-house-door"></i>
          <span>首页</span>
        </router-link>
        <router-link to="/diary">
          <i class="bi bi-journal-richtext"></i>
          <span>情绪日记</span>
        </router-link>
        <router-link to="/goals">
          <i class="bi bi-trophy"></i>
          <span>目标追踪</span>
        </router-link>
        <router-link to="/visual-board">
          <i class="bi bi-grid-3x3-gap"></i>
          <span>视觉板</span>
        </router-link>
      </nav>
    </header>

    <main>
      <router-view/>
    </main>

    <MobileNavBar class="mobile-only" />

    <footer>
      <p><i class="bi bi-heart"></i> 偏爱 (Pian Ai) - 记录你的情感、目标和灵感</p>
    </footer>
  </div>
</template>

<script>
import MobileNavBar from './components/MobileNavBar.vue'

export default {
  name: 'App',
  components: {
    MobileNavBar
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #f5f7fa;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background-color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo h1 {
  color: #ff4081;
  margin: 0;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  font-weight: 600;
}

.logo-icon {
  margin-right: 8px;
  font-size: 1.4rem;
}

nav {
  display: flex;
  gap: 25px;
}

nav a {
  color: #555;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 0;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

nav a i {
  font-size: 1.2rem;
}

nav a:hover {
  color: #ff4081;
  transform: translateY(-2px);
}

nav a.router-link-active {
  color: #ff4081;
}

nav a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(to right, #ff4081, #7e57c2);
  border-radius: 3px;
}

main {
  flex: 1;
  padding: 30px 20px;
  background-image: linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.5));
}

footer {
  background-color: #fff;
  padding: 18px;
  text-align: center;
  color: #777;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.05);
  font-size: 0.9rem;
}

footer i {
  color: #ff4081;
  margin-right: 5px;
}

.mobile-only {
  display: none;
}

.desktop-nav {
  display: flex;
}

@media (max-width: 600px) {
  header {
    flex-direction: column;
    gap: 15px;
    padding: 12px;
  }

  .desktop-nav {
    display: none;
  }

  .mobile-only {
    display: block;
  }

  main {
    padding-bottom: 70px; /* Add space for the mobile navigation bar */
  }
}
</style>
