<template>
  <div class="diary-view">
    <div class="page-header">
      <i class="bi bi-journal-richtext header-icon"></i>
      <h1>情绪日记 / 告白信笺</h1>
    </div>

    <div class="diary-container">
      <div class="diary-form">
        <h2><i class="bi bi-pencil-fill"></i> 新建日记</h2>

        <div class="form-group">
          <label for="title"><i class="bi bi-type"></i> 标题</label>
          <input
            type="text"
            id="title"
            v-model="newEntry.title"
            placeholder="给你的日记起个标题..."
          />
        </div>

        <div class="form-group">
          <label><i class="bi bi-emoji-smile"></i> 情绪标签</label>
          <div class="emotion-tags">
            <div
              v-for="emotion in emotions"
              :key="emotion.value"
              class="emotion-tag"
              :class="{ active: newEntry.emotion === emotion.value }"
              @click="newEntry.emotion = emotion.value"
            >
              <i :class="getEmotionIcon(emotion.value)"></i>
              {{ emotion.label }}
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="content"><i class="bi bi-card-text"></i> 内容</label>
          <textarea
            id="content"
            v-model="newEntry.content"
            placeholder="写下你的想法、感受或告白..."
            rows="6"
          ></textarea>
        </div>

        <button class="submit-btn" @click="saveDiaryEntry">
          <i class="bi bi-journal-plus"></i> 保存日记
        </button>
      </div>

      <div class="diary-entries">
        <h2><i class="bi bi-journals"></i> 我的日记</h2>

        <div v-if="diaryEntries.length === 0" class="empty-state">
          <i class="bi bi-journal"></i>
          <p>还没有日记，开始记录你的第一篇吧！</p>
        </div>

        <div v-else class="entries-list">
          <div
            v-for="(entry, index) in diaryEntries"
            :key="index"
            class="entry-card"
          >
            <div class="entry-header">
              <div class="entry-title">
                <i :class="getEmotionIcon(entry.emotion)"></i>
                <h3>{{ entry.title }}</h3>
              </div>
              <div class="entry-meta">
                <span class="emotion-badge">{{ getEmotionLabel(entry.emotion) }}</span>
                <span class="date"><i class="bi bi-calendar3"></i> {{ formatDate(entry.date) }}</span>
              </div>
            </div>
            <div class="entry-content">{{ entry.content }}</div>
            <div class="entry-actions">
              <button class="delete-btn" @click="deleteDiaryEntry(index)">
                <i class="bi bi-trash"></i> 删除
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
  name: 'DiaryView',
  data() {
    return {
      newEntry: {
        title: '',
        content: '',
        emotion: '',
        date: null
      },
      emotions: [
        { label: '坚定', value: 'determined' },
        { label: '愉快', value: 'happy' },
        { label: '期待', value: 'excited' },
        { label: '纠结', value: 'confused' },
        { label: '痛并快乐着', value: 'bittersweet' },
        { label: '思念', value: 'missing' },
        { label: '感动', value: 'touched' },
        { label: '平静', value: 'calm' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      diaryEntries: 'getDiaryEntries'
    })
  },
  methods: {
    saveDiaryEntry() {
      if (!this.newEntry.title || !this.newEntry.content || !this.newEntry.emotion) {
        alert('请填写完整的日记内容和情绪标签')
        return
      }

      const entry = {
        ...this.newEntry,
        date: new Date()
      }

      this.$store.commit('addDiaryEntry', entry)

      // Reset form
      this.newEntry = {
        title: '',
        content: '',
        emotion: '',
        date: null
      }
    },
    getEmotionLabel(value) {
      const emotion = this.emotions.find(e => e.value === value)
      return emotion ? emotion.label : value
    },
    getEmotionIcon(value) {
      // 为每种情绪分配一个图标
      const iconMap = {
        determined: 'bi bi-lightning-charge',
        happy: 'bi bi-emoji-smile',
        excited: 'bi bi-stars',
        confused: 'bi bi-question-circle',
        bittersweet: 'bi bi-emoji-expressionless',
        missing: 'bi bi-heart',
        touched: 'bi bi-emoji-smile-upside-down',
        calm: 'bi bi-peace'
      }
      return iconMap[value] || 'bi bi-emoji-neutral'
    },
    formatDate(date) {
      if (!date) return ''
      const d = new Date(date)
      return d.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    deleteDiaryEntry(index) {
      if (confirm('确定要删除这条日记吗？')) {
        this.$store.commit('deleteDiaryEntry', index)
      }
    }
  },
  created() {
    this.$store.dispatch('initializeStore')
  }
}
</script>

<style scoped>
.diary-view {
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

.diary-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.diary-form {
  flex: 1;
  min-width: 300px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  padding: 25px;
  border: 1px solid rgba(0,0,0,0.05);
}

.diary-entries {
  flex: 1;
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

.emotion-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.emotion-tag {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid transparent;
}

.emotion-tag i {
  margin-right: 6px;
  font-size: 1rem;
}

.emotion-tag:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
}

.emotion-tag.active {
  background: linear-gradient(135deg, #ff4081 0%, #7e57c2 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 10px rgba(255, 64, 129, 0.2);
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

.entries-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.entry-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 20px;
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.05);
}

.entry-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.entry-header {
  margin-bottom: 15px;
}

.entry-title {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.entry-title i {
  font-size: 1.2rem;
  margin-right: 10px;
  color: #ff4081;
}

.entry-title h3 {
  margin: 0;
  color: #333;
  font-weight: 600;
}

.entry-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.emotion-badge {
  background: linear-gradient(135deg, #ff4081 0%, #7e57c2 100%);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.date {
  display: flex;
  align-items: center;
  color: #777;
  font-size: 0.9rem;
}

.date i {
  margin-right: 5px;
}

.entry-content {
  color: #555;
  line-height: 1.6;
  white-space: pre-line;
  font-size: 1rem;
  padding: 5px 0;
  margin-bottom: 15px;
}

.entry-actions {
  display: flex;
  justify-content: flex-end;
}

.delete-btn {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  color: #ef5350;
  border: 1px solid #e0e0e0;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
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
  .diary-container {
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
