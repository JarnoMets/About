<template>
  <div class="language-select">
    <select v-model="locale" class="lang-dropdown">
      <option value="en">EN</option>
      <option value="nl">NL</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
</script>

<style scoped>
.language-select .lang-dropdown {
  background: transparent;
  border: 1px solid #333;
  color: #333;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
}

@media (prefers-color-scheme: dark) {
  .language-select .lang-dropdown {
    border-color: #fff;
    color: #fff;
  }
  .language-select .lang-dropdown option {
    background-color: #333;
    color: #fff;
  }
}
</style>
