<template>
  <div class="goals-view">
    <div class="page-header">
      <i class="bi bi-trophy header-icon"></i>
      <h1>决心印记 / 目标追踪</h1>
    </div>

    <div class="goals-container">
      <div class="goals-form">
        <h2><i class="bi bi-bullseye"></i> 设定新目标</h2>

        <div class="form-group">
          <label for="title"><i class="bi bi-bookmark-star"></i> 目标名称</label>
          <input
            type="text"
            id="title"
            v-model="newGoal.title"
            placeholder="你想要达成什么..."
          />
        </div>

        <div class="form-group">
          <label for="description"><i class="bi bi-card-text"></i> 描述</label>
          <textarea
            id="description"
            v-model="newGoal.description"
            placeholder="详细描述你的目标..."
            rows="3"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="target"><i class="bi bi-123"></i> 目标次数</label>
          <input
            type="number"
            id="target"
            v-model.number="newGoal.target"
            min="1"
            placeholder="需要完成的次数"
          />
        </div>

        <button class="submit-btn" @click="saveGoal">
          <i class="bi bi-plus-circle"></i> 保存目标
        </button>
      </div>

      <div class="goals-list">
        <h2><i class="bi bi-list-check"></i> 我的目标</h2>

        <div v-if="goals.length === 0" class="empty-state">
          <i class="bi bi-flag"></i>
          <p>还没有设定目标，开始你的第一个目标吧！</p>
        </div>

        <div v-else class="goals-grid">
          <div
            v-for="(goal, index) in goals"
            :key="index"
            class="goal-card"
            :class="{ 'completed': goal.progress >= goal.target }"
          >
            <div class="goal-header">
              <h3><i class="bi bi-star"></i> {{ goal.title }}</h3>
              <div class="progress-text">
                <i class="bi bi-bar-chart-steps"></i>
                {{ goal.progress }} / {{ goal.target }}
              </div>
            </div>

            <div class="goal-description">{{ goal.description }}</div>

            <div class="progress-container">
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{ width: `${(goal.progress / goal.target) * 100}%` }"
                ></div>
              </div>
              <div class="progress-percentage">{{ Math.round((goal.progress / goal.target) * 100) }}%</div>
            </div>

            <div class="goal-actions">
              <button
                class="delete-btn"
                @click="deleteGoal(index)"
              >
                <i class="bi bi-trash"></i> 删除
              </button>
              <button
                class="check-in-btn"
                @click="checkIn(index)"
                :disabled="goal.progress >= goal.target"
              >
                <i :class="goal.progress >= goal.target ? 'bi bi-check-circle-fill' : 'bi bi-plus-circle'"></i>
                {{ goal.progress >= goal.target ? '已完成' : '打卡' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GoalsView',
  data() {
    return {
      newGoal: {
        title: '',
        description: '',
        target: 21,
        progress: 0,
        checkIns: []
      }
    }
  },
  computed: {
    ...mapGetters({
      goals: 'getGoals'
    })
  },
  methods: {
    saveGoal() {
      if (!this.newGoal.title || !this.newGoal.target) {
        alert('请填写目标名称和目标次数')
        return
      }

      const goal = {
        ...this.newGoal,
        progress: 0,
        checkIns: [],
        createdAt: new Date()
      }

      this.$store.commit('addGoal', goal)

      // Reset form
      this.newGoal = {
        title: '',
        description: '',
        target: 21,
        progress: 0,
        checkIns: []
      }
    },
    checkIn(index) {
      const goal = {...this.goals[index]}

      if (goal.progress < goal.target) {
        goal.progress++
        goal.checkIns.push(new Date())

        this.$store.commit('updateGoal', { index, goal })
      }
    },
    deleteGoal(index) {
      if (confirm('确定要删除这个目标吗？')) {
        this.$store.commit('deleteGoal', index)
      }
    }
  },
  created() {
    this.$store.dispatch('initializeStore')
  }
}
</script>

<style scoped>
.goals-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.header-icon {
  font-size: 2.5rem;
  color: #ff4081;
  margin-right: 15px;
}

h1 {
  color: #ff4081;
  margin: 0;
  font-weight: 600;
}

h2 {
  display: flex;
  align-items: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 600;
}

h2 i {
  margin-right: 10px;
  color: #7e57c2;
}

.goals-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.goals-form {
  flex: 1;
  min-width: 300px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  padding: 25px;
  border: 1px solid rgba(0,0,0,0.05);
}

.goals-list {
  flex: 2;
  min-width: 300px;
}

.form-group {
  margin-bottom: 25px;
}

label {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-weight: 600;
  color: #333;
  font-size: 1rem;
}

label i {
  margin-right: 8px;
  color: #7e57c2;
}

input, textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #7e57c2;
  box-shadow: 0 0 0 3px rgba(126, 87, 194, 0.1);
  background-color: #fff;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff4081 0%, #7e57c2 100%);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(255, 64, 129, 0.2);
}

.submit-btn i {
  margin-right: 8px;
  font-size: 1.1rem;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(255, 64, 129, 0.3);
}

.goals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
}

.goal-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 25px;
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.05);
  position: relative;
  overflow: hidden;
}

.goal-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background: linear-gradient(to bottom, #ff4081, #7e57c2);
  opacity: 0.7;
}

.goal-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.goal-card.completed {
  background-color: #f8f9ff;
}

.goal-card.completed::before {
  background: linear-gradient(to bottom, #66bb6a, #43a047);
}

.goal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
}

.goal-header h3 {
  margin: 0;
  color: #333;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.goal-header h3 i {
  color: #ff4081;
  margin-right: 8px;
  font-size: 1rem;
}

.progress-text {
  font-weight: 600;
  color: #7e57c2;
  display: flex;
  align-items: center;
  gap: 5px;
}

.goal-description {
  color: #555;
  margin-bottom: 20px;
  line-height: 1.6;
  font-size: 0.95rem;
}

.progress-container {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.progress-bar {
  flex: 1;
  height: 10px;
  background-color: #f0f0f0;
  border-radius: 20px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, #ff4081, #7e57c2);
  border-radius: 20px;
  transition: width 0.5s ease;
}

.goal-card.completed .progress-fill {
  background: linear-gradient(to right, #66bb6a, #43a047);
}

.progress-percentage {
  font-weight: 600;
  color: #7e57c2;
  font-size: 0.9rem;
  min-width: 45px;
  text-align: right;
}

.goal-card.completed .progress-percentage {
  color: #43a047;
}

.goal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.delete-btn {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  color: #ef5350;
  border: 1px solid #e0e0e0;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.delete-btn i {
  margin-right: 5px;
  font-size: 1rem;
}

.delete-btn:hover {
  background-color: #ffebee;
  border-color: #ef5350;
}

.check-in-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff4081 0%, #7e57c2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(255, 64, 129, 0.15);
}

.check-in-btn i {
  margin-right: 6px;
}

.check-in-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(255, 64, 129, 0.25);
}

.check-in-btn:disabled {
  background: linear-gradient(135deg, #66bb6a, #43a047);
  cursor: default;
  opacity: 0.9;
}

.empty-state {
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 40px 30px;
  text-align: center;
  color: #888;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.empty-state i {
  font-size: 3rem;
  color: #ccc;
}

.empty-state p {
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .goals-container {
    flex-direction: column;
  }

  .page-header {
    flex-direction: column;
    text-align: center;
    padding: 15px;
  }

  .header-icon {
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>
