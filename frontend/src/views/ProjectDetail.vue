<template>
  <div class="project-detail" v-if="project">
    <router-link to="/projects" class="back-link">
      &larr; {{ t('projects.backToProjects') }}
    </router-link>

    <header class="detail-header">
      <div class="header-image">
        <div class="image-placeholder">
          <span class="placeholder-icon">{{ project.icon }}</span>
        </div>
      </div>
      <div class="header-info">
        <h1>{{ t(`projects.${project.id}.name`) }}</h1>
        <p class="header-description">{{ t(`projects.${project.id}.description`) }}</p>
        <div class="header-actions">
          <a
            v-if="project.url"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary"
          >
            {{ t('projects.visitSite') }}
          </a>
          <a
            v-if="project.github"
            :href="project.github"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-outline"
          >
            {{ t('projects.sourceCode') }}
          </a>
        </div>
      </div>
    </header>

    <section class="detail-section">
      <h2>{{ t('projects.features') }}</h2>
      <ul class="features-list">
        <li
          v-for="(_, key) in featureKeys"
          :key="key"
        >
          {{ t(`projects.${project.id}.features.${key}`) }}
        </li>
      </ul>
    </section>

    <section class="detail-section">
      <h2>{{ t('projects.techStack') }}</h2>
      <div class="stack-grid">
        <div
          v-for="(value, key) in stackEntries"
          :key="key"
          class="stack-item"
        >
          <span class="stack-label">{{ formatStackLabel(String(key)) }}</span>
          <span class="stack-value">{{ value }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const { t, tm } = useI18n();

interface Project {
  id: string;
  icon: string;
  url?: string;
  github?: string;
}

const projectsData: Project[] = [
  {
    id: 'homelab',
    icon: 'H',
    github: 'https://github.com/JarnoMets'
  },
  {
    id: 'cards',
    icon: 'C',
    url: 'https://cards.jarnomets.com',
    github: 'https://github.com/JarnoMets/Cards'
  },
  {
    id: 'cardsApp',
    icon: 'CA',
    github: 'https://github.com/JarnoMets/AndroidCardsViewer'
  },
  {
    id: 'notes',
    icon: 'N',
    url: 'https://notes.jarnomets.com',
    github: 'https://github.com/JarnoMets/Notes'
  },
  {
    id: 'notesApp',
    icon: 'NA',
    github: 'https://github.com/JarnoMets/AndroidNotesApp'
  },
  {
    id: 'music',
    icon: 'M',
    url: 'https://music.jarnomets.com',
    github: 'https://github.com/JarnoMets/MusicServer'
  },
  {
    id: 'musicApp',
    icon: 'MA',
    github: 'https://github.com/JarnoMets/AndroidMusicViewer'
  }
];

const project = computed(() => {
  const id = route.params.id as string;
  return projectsData.find(p => p.id === id);
});

const featureKeys = computed(() => {
  if (!project.value) return {};
  const raw = tm(`projects.${project.value.id}.features`);
  return typeof raw === 'object' && raw !== null ? raw as Record<string, string> : {};
});

const stackEntries = computed(() => {
  if (!project.value) return {};
  const raw = tm(`projects.${project.value.id}.stack`);
  return typeof raw === 'object' && raw !== null ? raw as Record<string, string> : {};
});

function formatStackLabel(key: string): string {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
}
</script>

<style scoped>
.project-detail {
  max-width: 860px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: inherit;
  opacity: 0.6;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.back-link:hover {
  opacity: 1;
}

.detail-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  align-items: flex-start;
}

.header-image {
  flex: 0 0 200px;
}

.image-placeholder {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(100, 120, 200, 0.12), rgba(100, 200, 180, 0.08));
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.placeholder-icon {
  font-size: 3rem;
  font-weight: 700;
  opacity: 0.3;
  letter-spacing: 0.05em;
  user-select: none;
}

.header-info {
  flex: 1;
  text-align: left;
}

.header-info h1 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.header-description {
  font-size: 0.95rem;
  line-height: 1.7;
  opacity: 0.75;
  margin-bottom: 1.5rem;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 0.55rem 1.2rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
}

.btn-primary {
  background-color: rgba(100, 120, 200, 0.85);
  color: #fff;
  border: 1px solid transparent;
}

.btn-primary:hover {
  background-color: rgba(100, 120, 200, 1);
}

.btn-outline {
  background: transparent;
  color: inherit;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-outline:hover {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.04);
}

.detail-section {
  margin-bottom: 2.5rem;
}

.detail-section h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  text-align: left;
}

.features-list {
  list-style: none;
  padding: 0;
}

.features-list li {
  padding: 0.6rem 0;
  font-size: 0.92rem;
  line-height: 1.5;
  opacity: 0.8;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  text-align: left;
  padding-left: 1rem;
  position: relative;
}

.features-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(100, 120, 200, 0.6);
}

.features-list li:last-child {
  border-bottom: none;
}

.stack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.stack-item {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  text-align: left;
}

.stack-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.5;
  margin-bottom: 0.35rem;
}

.stack-value {
  font-size: 0.9rem;
  opacity: 0.85;
}

@media (prefers-color-scheme: light) {
  .image-placeholder {
    background: linear-gradient(135deg, rgba(100, 120, 200, 0.08), rgba(100, 200, 180, 0.06));
    border-color: rgba(0, 0, 0, 0.08);
  }

  .detail-section h2 {
    border-bottom-color: rgba(0, 0, 0, 0.08);
  }

  .features-list li {
    border-bottom-color: rgba(0, 0, 0, 0.04);
  }

  .features-list li::before {
    background: rgba(70, 90, 170, 0.6);
  }

  .stack-item {
    background: rgba(0, 0, 0, 0.02);
    border-color: rgba(0, 0, 0, 0.06);
  }

  .btn-primary {
    background-color: rgba(70, 90, 170, 0.9);
  }

  .btn-primary:hover {
    background-color: rgba(70, 90, 170, 1);
  }

  .btn-outline {
    border-color: rgba(0, 0, 0, 0.2);
  }

  .btn-outline:hover {
    border-color: rgba(0, 0, 0, 0.4);
    background: rgba(0, 0, 0, 0.03);
  }
}

@media (max-width: 600px) {
  .detail-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .header-info {
    text-align: center;
  }

  .header-actions {
    justify-content: center;
  }

  .header-image {
    flex: 0 0 auto;
  }

  .image-placeholder {
    width: 140px;
    height: 140px;
  }
}
</style>
