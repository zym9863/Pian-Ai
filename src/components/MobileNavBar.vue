<template>
  <div class="mobile-nav-bar">
    <router-link to="/" class="nav-item">
      <i class="bi bi-house-door"></i>
      <span>首页</span>
    </router-link>
    <router-link to="/diary" class="nav-item">
      <i class="bi bi-journal-richtext"></i>
      <span>情绪日记</span>
    </router-link>
    <router-link to="/goals" class="nav-item">
      <i class="bi bi-trophy"></i>
      <span>目标追踪</span>
    </router-link>
    <router-link to="/visual-board" class="nav-item">
      <i class="bi bi-grid-3x3-gap"></i>
      <span>视觉板</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MobileNavBar'
}
</script>

<style scoped>
.mobile-nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  z-index: 100;
  border-top: 1px solid #f0f0f0;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #555;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.8rem;
  padding: 8px 0;
  transition: all 0.3s ease;
  width: 25%;
  justify-content: center;
}

.nav-item i {
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.nav-item:hover {
  color: #ff4081;
}

.nav-item.router-link-active {
  color: #ff4081;
  position: relative;
}

.nav-item.router-link-active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #ff4081;
}

@media (min-width: 601px) {
  .mobile-nav-bar {
    display: none;
  }
}
</style>
