<template>
  <div class="hero">
    <h1>What's on your mind?</h1>
    <p>Ask anything — eSearch is listening.</p>
  </div>
</template>

<style scoped>
.hero {
  text-align: center;
}

.hero h1 {
  font-size: 2.6rem;
  font-weight: 750;
  letter-spacing: -1.5px;
  color: var(--text);
  animation: slideUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.hero p {
  margin-top: 10px;
  color: var(--text-secondary);
  font-size: 1rem;
  animation: slideUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
