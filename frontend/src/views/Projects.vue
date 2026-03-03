<template>
  <div class="projects-page">
    <header class="projects-header">
      <h1>{{ t('projects.title') }}</h1>
      <p class="projects-subtitle">{{ t('projects.subtitle') }}</p>
    </header>

    <div class="projects-list">
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        class="project-card"
        :class="{ 'card-reversed': index % 2 !== 0 }"
      >
        <div class="card-image">
          <div class="image-placeholder">
            <span class="placeholder-icon">{{ project.icon }}</span>
          </div>
        </div>
        <div class="card-content">
          <h2 class="card-title">{{ t(`projects.${project.id}.name`) }}</h2>
          <p class="card-description">{{ t(`projects.${project.id}.shortDescription`) }}</p>
          <div class="card-actions">
            <router-link :to="`/projects/${project.id}`" class="btn btn-primary">
              {{ t('projects.viewDetails') }}
            </router-link>
            <a
              v-if="project.url"
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-outline"
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Project {
  id: string;
  icon: string;
  url?: string;
  github?: string;
}

const projects: Project[] = [
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
</script>

<style scoped>
.projects-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.projects-header {
  margin-bottom: 3rem;
  text-align: center;
}

.projects-header h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.projects-subtitle {
  font-size: 1.05rem;
  opacity: 0.7;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.project-card {
  display: flex;
  align-items: stretch;
  gap: 2rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}

.project-card.card-reversed {
  flex-direction: row-reverse;
}

.card-image {
  flex: 0 0 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
}

.image-placeholder {
  width: 100%;
  height: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(100, 120, 200, 0.12), rgba(100, 200, 180, 0.08));
}

.placeholder-icon {
  font-size: 2.5rem;
  font-weight: 700;
  opacity: 0.35;
  letter-spacing: 0.05em;
  user-select: none;
}

.card-content {
  flex: 1;
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

.card-reversed .card-content {
  text-align: right;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.card-description {
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.75;
  margin-bottom: 1.25rem;
}

.card-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.card-reversed .card-actions {
  justify-content: flex-end;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1.1rem;
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

@media (prefers-color-scheme: light) {
  .project-card {
    background: rgba(0, 0, 0, 0.02);
    border-color: rgba(0, 0, 0, 0.08);
  }

  .project-card:hover {
    border-color: rgba(0, 0, 0, 0.16);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  }

  .card-image {
    background: rgba(0, 0, 0, 0.02);
  }

  .image-placeholder {
    background: linear-gradient(135deg, rgba(100, 120, 200, 0.08), rgba(100, 200, 180, 0.06));
  }

  .btn-primary {
    background-color: rgba(70, 90, 170, 0.9);
  }

  .btn-primary:hover {
    background-color: rgba(70, 90, 170, 1);
  }

  .btn-outline {
    border-color: rgba(0, 0, 0, 0.2);
    color: inherit;
  }

  .btn-outline:hover {
    border-color: rgba(0, 0, 0, 0.4);
    background: rgba(0, 0, 0, 0.03);
  }
}

@media (max-width: 700px) {
  .project-card,
  .project-card.card-reversed {
    flex-direction: column;
  }

  .card-image {
    flex: 0 0 auto;
  }

  .image-placeholder {
    min-height: 140px;
  }

  .card-content,
  .card-reversed .card-content {
    text-align: left;
    padding: 1.25rem 1.5rem;
  }

  .card-reversed .card-actions {
    justify-content: flex-start;
  }
}
</style>