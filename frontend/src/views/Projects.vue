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
  margin-bottom: 0.75rem;
  color: #e8eaf0;
}

.projects-subtitle {
  font-size: 1.05rem;
  color: #a0a8b8;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.project-card {
  display: flex;
  align-items: stretch;
  gap: 0;
  background: #2a2d35;
  border: 1px solid #3a3d46;
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
  border-color: #505664;
  box-shadow: 0 6px 32px rgba(0, 0, 0, 0.25);
}

.project-card.card-reversed {
  flex-direction: row-reverse;
}

.card-image {
  flex: 0 0 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #323848, #2e3440);
}

.placeholder-icon {
  font-size: 2.5rem;
  font-weight: 700;
  color: #6878a8;
  opacity: 0.5;
  letter-spacing: 0.05em;
  user-select: none;
}

.card-content {
  flex: 1;
  padding: 2rem 2.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

.card-reversed .card-content {
  text-align: right;
}

.card-title {
  font-size: 1.35rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
  color: #e0e4ec;
}

.card-description {
  font-size: 0.92rem;
  line-height: 1.65;
  color: #9aa0b0;
  margin-bottom: 1.25rem;
}

.card-actions {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.card-reversed .card-actions {
  justify-content: flex-end;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
}

.btn-primary {
  background-color: #5568b4;
  color: #fff;
  border: 1px solid transparent;
}

.btn-primary:hover {
  background-color: #6478c4;
}

.btn-outline {
  background: transparent;
  color: #b0b8c8;
  border: 1px solid #484e5c;
}

.btn-outline:hover {
  border-color: #6a7288;
  background: rgba(255, 255, 255, 0.04);
  color: #d0d4dc;
}

@media (prefers-color-scheme: light) {
  .projects-header h1 {
    color: #1a2030;
  }

  .projects-subtitle {
    color: #5a6270;
  }

  .project-card {
    background: #f5f6f8;
    border-color: #dde0e6;
  }

  .project-card:hover {
    border-color: #c0c6d0;
    box-shadow: 0 6px 32px rgba(0, 0, 0, 0.08);
  }

  .image-placeholder {
    background: linear-gradient(135deg, #e4e8f0, #eaecf2);
  }

  .placeholder-icon {
    color: #8090b8;
  }

  .card-title {
    color: #1e2636;
  }

  .card-description {
    color: #5a6470;
  }

  .btn-primary {
    background-color: #4a5ca0;
  }

  .btn-primary:hover {
    background-color: #5568b4;
  }

  .btn-outline {
    border-color: #c0c6d0;
    color: #4a5060;
  }

  .btn-outline:hover {
    border-color: #8a90a0;
    background: rgba(0, 0, 0, 0.03);
    color: #2a3040;
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
    min-height: 150px;
  }

  .card-content,
  .card-reversed .card-content {
    text-align: left;
    padding: 1.5rem;
  }

  .card-reversed .card-actions {
    justify-content: flex-start;
  }
}
</style>