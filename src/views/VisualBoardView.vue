<template>
  <div class="visual-board-view">
    <div class="page-header">
      <i class="bi bi-grid-3x3-gap header-icon"></i>
      <h1>"我的答案" 视觉板</h1>
    </div>

    <div class="visual-board-container">
      <div class="visual-board-form">
        <h2><i class="bi bi-plus-circle"></i> 添加新内容</h2>

        <div class="form-group">
          <label for="type"><i class="bi bi-list-ul"></i> 内容类型</label>
          <select id="type" v-model="newItem.type">
            <option value="image">图片</option>
            <option value="quote">歌词/引言</option>
            <option value="text">文字</option>
          </select>
        </div>

        <div class="form-group" v-if="newItem.type === 'image'">
          <label for="imageUrl"><i class="bi bi-image"></i> 图片链接</label>
          <input
            type="text"
            id="imageUrl"
            v-model="newItem.content"
            placeholder="输入图片URL..."
          />
          <p class="hint"><i class="bi bi-info-circle"></i> 提示：可以使用网络图片链接</p>
        </div>

        <div class="form-group" v-else>
          <label for="content">
            <i :class="newItem.type === 'quote' ? 'bi bi-quote' : 'bi bi-card-text'"></i>
            内容
          </label>
          <textarea
            id="content"
            v-model="newItem.content"
            :placeholder="newItem.type === 'quote' ? '输入歌词或引言...' : '输入文字内容...'"
            rows="4"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="color"><i class="bi bi-palette"></i> 颜色 (可选)</label>
          <div class="color-picker-container">
            <input
              type="color"
              id="color"
              v-model="newItem.color"
            />
            <div class="color-presets">
              <div
                v-for="color in colorPresets"
                :key="color"
                class="color-preset"
                :style="{ backgroundColor: color }"
                @click="newItem.color = color"
              ></div>
            </div>
          </div>
        </div>

        <button class="submit-btn" @click="addItem">
          <i class="bi bi-plus-lg"></i> 添加到视觉板
        </button>
      </div>

      <div class="visual-board">
        <h2><i class="bi bi-collection"></i> 我的视觉板</h2>

        <div v-if="visualBoardItems.length === 0" class="empty-state">
          <i class="bi bi-easel"></i>
          <p>视觉板还是空的，添加一些内容来展示你的"偏爱"吧！</p>
        </div>

        <div v-else class="board-grid">
          <div
            v-for="(item, index) in visualBoardItems"
            :key="index"
            class="board-item"
            :style="{ backgroundColor: item.color || '#ffffff' }"
          >
            <div v-if="item.type === 'image'" class="image-item">
              <img :src="item.content" alt="Visual board image" />
            </div>

            <div v-else-if="item.type === 'quote'" class="quote-item">
              <i class="bi bi-quote item-icon"></i>
              <blockquote>{{ item.content }}</blockquote>
            </div>

            <div v-else class="text-item">
              <i class="bi bi-card-text item-icon"></i>
              <p>{{ item.content }}</p>
            </div>

            <button class="remove-btn" @click="removeItem(index)">
              <i class="bi bi-x"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'VisualBoardView',
  data() {
    return {
      newItem: {
        type: 'text',
        content: '',
        color: '#ffffff'
      },
      colorPresets: [
        '#ffffff', // 白色
        '#f8bbd0', // 浅粉色
        '#e1bee7', // 浅紫色
        '#bbdefb', // 浅蓝色
        '#c8e6c9', // 浅绿色
        '#fff9c4', // 浅黄色
        '#ffccbc', // 浅橙色
        '#f5f5f5', // 浅灰色
        '#e3f2fd', // 天蓝色
        '#e8f5e9'  // 薄荷色
      ]
    }
  },
  computed: {
    ...mapGetters({
      visualBoardItems: 'getVisualBoardItems'
    })
  },
  methods: {
    addItem() {
      if (!this.newItem.content) {
        alert('请填写内容')
        return
      }

      const item = {
        ...this.newItem,
        createdAt: new Date()
      }

      this.$store.commit('addVisualBoardItem', item)

      // Reset form
      this.newItem = {
        type: this.newItem.type,
        content: '',
        color: '#ffffff'
      }
    },
    removeItem(index) {
      const items = [...this.visualBoardItems]
      items.splice(index, 1)
      localStorage.setItem('visualBoardItems', JSON.stringify(items))
      this.$store.commit('loadVisualBoardItems', items)
    }
  },
  created() {
    this.$store.dispatch('initializeStore')
  }
}
</script>

<style scoped>
.visual-board-view {
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

.visual-board-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.visual-board-form {
  flex: 1;
  min-width: 300px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  padding: 25px;
  border: 1px solid rgba(0,0,0,0.05);
}

.visual-board {
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

input, textarea, select {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #7e57c2;
  box-shadow: 0 0 0 3px rgba(126, 87, 194, 0.1);
  background-color: #fff;
}

input[type="color"] {
  height: 50px;
  padding: 5px;
  cursor: pointer;
}

.color-picker-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.color-presets {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.color-preset {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #ddd;
}

.color-preset:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.hint {
  font-size: 0.8rem;
  color: #777;
  margin-top: 5px;
  display: flex;
  align-items: center;
}

.hint i {
  margin-right: 5px;
  color: #7e57c2;
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

.board-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 25px;
}

.board-item {
  position: relative;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 20px;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.05);
}

.board-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.image-item {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.quote-item {
  font-style: italic;
  text-align: center;
  position: relative;
  z-index: 1;
  width: 100%;
}

.quote-item blockquote {
  margin: 0;
  padding: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}

.text-item {
  text-align: center;
  position: relative;
  z-index: 1;
  width: 100%;
}

.text-item p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}

.item-icon {
  display: block;
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #7e57c2;
  opacity: 0.7;
}

.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0;
  transition: all 0.3s;
  z-index: 2;
}

.remove-btn:hover {
  background-color: rgba(255, 64, 129, 0.8);
  transform: scale(1.1);
}

.board-item:hover .remove-btn {
  opacity: 1;
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
  .visual-board-container {
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
