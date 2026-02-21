<template>
  <div class="thread" ref="el">
    <MessageBubble
      v-for="(msg, i) in messages"
      :key="i"
      :role="msg.role"
      :text="msg.text"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MessageBubble from './MessageBubble.vue'

defineProps({
  messages: {
    type: Array,
    required: true,
  },
})

const el = ref(null)

function scrollToBottom() {
  if (el.value) el.value.scrollTop = el.value.scrollHeight
}

defineExpose({ scrollToBottom })
</script>

<style scoped>
.thread {
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  max-height: 60vh;
  padding: 4px 0;
}
</style>
