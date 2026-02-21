<template>
  <div class="msg" :class="role">
    <div class="avatar">{{ role === 'user' ? 'You' : 'eS' }}</div>

    <!-- Typing indicator -->
    <div v-if="!text" class="bubble typing-bubble">
      <span class="dot" />
      <span class="dot" />
      <span class="dot" />
    </div>

    <!-- Message text -->
    <div v-else class="bubble">{{ text }}</div>
  </div>
</template>

<script setup>
defineProps({
  role: { type: String, required: true },
  text: { type: String, default: '' },
})
</script>

<style scoped>
.msg {
  display: flex;
  gap: 10px;
}

/* Directional slide-in per role */
.msg.user {
  flex-direction: row-reverse;
  animation: slideFromRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.msg.echo {
  animation: slideFromLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes slideFromRight {
  from {
    opacity: 0;
    transform: translateX(20px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes slideFromLeft {
  from {
    opacity: 0;
    transform: translateX(-20px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

/* Avatar */
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  flex-shrink: 0;
  letter-spacing: -0.3px;
}

.msg.user .avatar {
  background: var(--avatar-user-bg);
  color: var(--avatar-user-text);
}

.msg.echo .avatar {
  background: var(--avatar-echo-bg);
  color: var(--avatar-echo-text);
  border: 1px solid var(--avatar-echo-border);
}

/* Bubble */
.bubble {
  max-width: 76%;
  padding: 11px 15px;
  border-radius: 18px;
  font-size: 0.94rem;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  box-shadow: var(--shadow-bubble);
  /* override global color transition so we don't fight with the animation */
  transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease !important;
}

.msg.user .bubble {
  background: var(--user-bubble-bg);
  color: var(--user-bubble-text);
  border-bottom-right-radius: 4px;
}

.msg.echo .bubble {
  background: var(--echo-bubble-bg);
  color: var(--echo-bubble-text);
  border: 1px solid var(--echo-bubble-border);
  border-bottom-left-radius: 4px;
}

/* Typing dots */
.typing-bubble {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 14px 18px;
}

.dot {
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--dot-color);
  animation: bounce 1s infinite ease-in-out;
  /* override global transition */
  transition: background-color 0.25s ease !important;
}

.dot:nth-child(2) { animation-delay: 0.16s; }
.dot:nth-child(3) { animation-delay: 0.32s; }

@keyframes bounce {
  0%, 75%, 100% { transform: translateY(0);    opacity: 0.6; }
  35%            { transform: translateY(-7px); opacity: 1;   }
}
</style>
