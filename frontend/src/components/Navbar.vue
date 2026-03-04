<template>
  <div class="nav-controls">
    <LanguageSelector />
    <button class="hamburger" @click="toggleMenu" :class="{ 'is-active': isOpen }">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </button>
  </div>
  <nav class="navbar" :class="{ 'is-open': isOpen }">
    <ul>
      <li><router-link to="/" @click="closeMenu">{{ $t('navbar.about') }}</router-link></li>
      <li><router-link to="/projects" @click="closeMenu">{{  $t('navbar.projects') }}</router-link></li>
      <li><router-link to="/cv" @click="closeMenu">{{ $t('navbar.cv') }}</router-link></li>
      <li><router-link to="/contact" @click="closeMenu">{{ $t('navbar.contact') }}</router-link></li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LanguageSelector from './LanguageSelector.vue';

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};
</script>

<style scoped>
.nav-controls {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1001;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.line {
  width: 2rem;
  height: 0.25rem;
  background: #333;
  border-radius: 10px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
}

@media (prefers-color-scheme: dark) {
  .line {
    background: #fff;
  }
}

.is-active .line:nth-child(1) {
  transform: rotate(45deg);
}

.is-active .line:nth-child(2) {
  opacity: 0;
}

.is-active .line:nth-child(3) {
  transform: rotate(-45deg);
}

.navbar {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 250px;
  background-color: #333;
  color: white;
  padding: 4rem 2rem;
  z-index: 1000;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
}

.navbar.is-open {
  transform: translateX(0);
}

.navbar ul {
  list-style: none;
  padding: 0;
}

.navbar li {
  /* remove padding from li so the anchor can fill the whole row */
  padding: 0;
}

/* Make the router-link (<a>) fill the full row so the whole area is clickable */
.navbar a {
  display: block;
  width: 100%;
  padding: 1.5rem 0;
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}

/* Apply hover/focus states to the link (not the li) for correct clickable area */
.navbar a:hover,
.navbar a:focus {
  background-color: #555;
  text-decoration: none;
  outline: none;
}
</style>