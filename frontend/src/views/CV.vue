<template>
  <div class="cv-page">
    <!-- Download button – hidden when printing -->
    <div class="cv-actions no-print">
      <button class="btn btn-primary" @click="downloadPdf">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 3v13M7 11l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5 20h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        {{ t('cv.download_pdf') }}
      </button>
    </div>

    <!-- A4 CV Document -->
    <div class="cv-document" ref="cvDocument">
      <!-- Header -->
      <header class="cv-header">
        <h1 class="cv-name">Jarno Mets</h1>
        <div class="cv-job-title">Software Developer</div>
      </header>

      <!-- Two-column body -->
      <div class="cv-body">
        <!-- Left column -->
        <aside class="cv-sidebar">
          <!-- Profile -->
          <section class="cv-section">
            <h2 class="section-title">{{ t('cv.profile_title') }}</h2>
            <p class="profile-text">{{ t('cv.profile_text') }}</p>
          </section>

          <!-- Education -->
          <section class="cv-section">
            <h2 class="section-title">{{ t('cv.education_title') }}</h2>
            <div class="education-entry">
              <strong>{{ t('cv.education_school') }}</strong>
              <p>{{ t('cv.education_degree') }}</p>
              <span class="period">{{ t('cv.education_period') }}</span>
            </div>
          </section>

          <!-- Skills -->
          <section class="cv-section">
            <h2 class="section-title">{{ t('cv.skills_title') }}</h2>
            <ul class="skills-list">
              <li v-for="skill in skills" :key="skill">{{ skill }}</li>
            </ul>
          </section>

          <!-- Projects -->
          <section class="cv-section">
            <h2 class="section-title">{{ t('cv.projects_title') }}</h2>
            <div v-for="project in tm('cv.projects') as CvProject[]" :key="project.name" class="timeline-entry">
              <div class="entry-header">
                <span class="entry-period">{{ project.year }}</span>
                <span class="entry-company">{{ project.name }}</span>
              </div>
              <ul class="entry-bullets">
                <li v-for="bullet in project.bullets" :key="bullet">{{ bullet }}</li>
              </ul>
            </div>
          </section>
        </aside>

        <!-- Right column -->
        <main class="cv-main">
          <!-- Current position -->
          <section class="cv-section">
            <h2 class="section-title">{{ t('cv.current_title') }}</h2>
            <div v-for="job in tm('cv.current') as CvJob[]" :key="job.company" class="timeline-entry">
              <div class="entry-header">
                <span class="entry-period">{{ job.period }}</span>
                <span class="entry-company">{{ job.company }}</span>
              </div>
              <div class="entry-role">{{ job.role }}</div>
              <ul class="entry-bullets">
                <li v-for="bullet in job.bullets" :key="bullet">{{ bullet }}</li>
              </ul>
            </div>
          </section>

          <!-- Past experience -->
          <section class="cv-section">
            <h2 class="section-title">{{ t('cv.experience_title') }}</h2>
            <div v-for="job in tm('cv.experience') as CvJob[]" :key="job.company" class="timeline-entry">
              <div class="entry-header">
                <span class="entry-period">{{ job.period }}</span>
                <span class="entry-company">{{ job.company }}</span>
              </div>
              <div class="entry-role">{{ job.role }}</div>
              <ul class="entry-bullets">
                <li v-for="bullet in job.bullets" :key="bullet">{{ bullet }}</li>
              </ul>
            </div>
          </section>

          <!-- Contact -->
          <section class="cv-section">
            <h2 class="section-title">{{ t('cv.contact_title') }}</h2>
            <ul class="contact-list">
              <li>
                <!-- Globe icon -->
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9M3 12h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                <a href="https://jarnomets.com" target="_blank" rel="noopener">{{ t('cv.contact_website') }}</a>
              </li>
              <li>
                <!-- Phone icon -->
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6.6 10.8a15.05 15.05 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1.1-.24 11.36 11.36 0 0 0 3.56.56 1 1 0 0 1 1 1V19a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .56 3.56 1 1 0 0 1-.25 1.1Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <a href="tel:+32491554649">{{ t('cv.contact_phone') }}</a>
              </li>
              <li>
                <!-- Mail icon -->
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 8.5V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 6H3v2.5l9 6 9-6V6z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <a href="mailto:info@jarnomets.com">{{ t('cv.contact_email') }}</a>
              </li>
              <li>
                <!-- GitHub icon -->
                <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.111.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.415-4.042-1.415C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.522.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.654.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.62-5.475 5.92.429.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.575C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                <a href="https://github.com/JarnoMets" target="_blank" rel="noopener">{{ t('cv.contact_github') }}</a>
              </li>
              <li>
                <!-- LinkedIn icon -->
                <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.942v5.664H9.352V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.602 0 4.268 2.372 4.268 5.455v6.288zM5.337 7.433c-1.144 0-2.069-.927-2.069-2.069 0-1.144.925-2.069 2.069-2.069 1.143 0 2.069.925 2.069 2.069 0 1.142-.926 2.069-2.069 2.069zM7.119 20.452H3.554V9H7.12v11.452z"/></svg>
                <a href="https://linkedin.com/in/jarno-mets-763525242/" target="_blank" rel="noopener">{{ t('cv.contact_linkedin') }}</a>
              </li>
              <li>
                <!-- Location icon -->
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" fill="currentColor"/></svg>
                <span>{{ t('cv.contact_location') }}</span>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, tm } = useI18n();

interface CvJob {
  period: string;
  company: string;
  role: string;
  bullets: string[];
}

interface CvProject {
  year: string;
  name: string;
  bullets: string[];
}

const skills = ['C', 'Rust', 'C++', 'DotNET (C#)', 'Python', 'Lua'];

const cvDocument = ref<HTMLElement | null>(null);

function downloadPdf(): void {
  window.print();
}
</script>

<style scoped>
/* ─── Screen wrapper ─────────────────────────────────────────────────────── */
.cv-page {
  /* Match other pages: centered content column with consistent padding */
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem;
}

/* Download button */
.cv-actions {
  width: 100%;
  max-width: 794px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.25rem;
}

.cv-actions .btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* ─── A4 Document shell (responsive inside page) ────────────────────────── */
.cv-document {
  width: 100%;
  min-height: 900px;
  /* Dark modern theme for on-screen viewing. Keep print rules intact. */
  background: linear-gradient(180deg, #0b0f14 0%, #0f1318 100%);
  color: #e6eef8;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 11px;
  line-height: 1.55;
  box-shadow: 0 8px 40px rgba(0,0,0,0.6);
  border-radius: 6px;
  overflow: hidden;
}

/* ─── Header band ────────────────────────────────────────────────────────── */
.cv-header {
  background: transparent;
  padding: 2rem 2.5rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.cv-name {
  font-size: 2.4rem;
  font-weight: 800;
  color: #eaf3ff;
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin-bottom: 0.25rem;
}

.cv-job-title {
  background: linear-gradient(90deg,#3755ff 0%, #1ed6c4 100%);
  color: #061022;
  display: inline-block;
  padding: 0.28rem 0.9rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 4px;
}

/* ─── Two-column body ────────────────────────────────────────────────────── */
.cv-body {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: calc(900px - 110px);
}

.cv-sidebar {
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  padding: 1.6rem 1.2rem 1.6rem 1.6rem;
  border-right: 1px solid rgba(255,255,255,0.03);
}

.cv-main {
  background: transparent;
  padding: 1.5rem 1.8rem 1.5rem 1.5rem;
}

/* ─── Sections ───────────────────────────────────────────────────────────── */
.cv-section {
  margin-bottom: 1.6rem;
}

.section-title {
  font-size: 0.98rem;
  font-weight: 700;
  color: #dbeafc;
  margin-bottom: 0.6rem;
  padding-bottom: 0.2rem;
  border-bottom: 2px solid rgba(255,255,255,0.03);
}

/* Profile */
.profile-text {
  font-size: 0.78rem;
  color: #cfe6ff;
  text-align: justify;
}

/* Education */
.education-entry strong {
  display: block;
  font-size: 0.82rem;
  font-weight: 700;
  color: #eaf3ff;
}
.education-entry p {
  font-size: 0.75rem;
  color: #cbdff8;
  margin: 0.1rem 0;
}
.period {
  font-size: 0.72rem;
  font-weight: 700;
  color: #6ecfff;
}

/* Skills */
.skills-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.skills-list li {
  font-size: 0.78rem;
  padding-left: 0.8rem;
  position: relative;
  color: #d6e9ff;
}
.skills-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #4ad3ff;
}

/* Timeline entries (jobs, projects) */
.timeline-entry {
  margin-bottom: 1rem;
}
.entry-header {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: baseline;
  margin-bottom: 0.15rem;
}
.entry-period {
  font-size: 0.72rem;
  font-weight: 700;
  color: #4ad3ff;
  white-space: nowrap;
}
.entry-company {
  font-size: 0.82rem;
  font-weight: 700;
  color: #eaf3ff;
}
.entry-role {
  font-size: 0.78rem;
  font-weight: 600;
  color: #cfe6ff;
  margin-bottom: 0.3rem;
}
.entry-bullets {
  padding-left: 1.1rem;
  margin: 0;
}
.entry-bullets li {
  font-size: 0.76rem;
  color: #cbdff8;
  margin-bottom: 0.2rem;
  text-align: justify;
}

/* Contact list */
.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.contact-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.77rem;
  color: #d9efff;
}
.contact-list svg {
  flex-shrink: 0;
  color: #4ad3ff;
}
.contact-list a {
  color: #d9efff;
  text-decoration: none;
}
.contact-list a:hover {
  color: #7fe6ff;
}

/* ─── Print / PDF styles ─────────────────────────────────────────────────── */
@media print {
  @page {
    size: A4;
    margin: 0;
  }

  /* Hide everything except the CV document */
  body * {
    visibility: hidden;
  }
  .cv-document,
  .cv-document * {
    visibility: visible;
  }
  .cv-document {
    position: fixed;
    top: 0;
    left: 0;
    width: 210mm;
    min-height: 297mm;
    box-shadow: none;
    border-radius: 0;
    font-size: 10.5px;
  }
  .no-print {
    display: none !important;
  }
  a {
    color: inherit !important;
    text-decoration: none !important;
  }
}

/* ─── Responsive (narrow screens) ───────────────────────────────────────── */
@media (max-width: 840px) {
  .cv-document {
    width: 100%;
    min-height: unset;
  }
  .cv-body {
    grid-template-columns: 1fr;
    min-height: unset;
  }
  .cv-sidebar {
    border-right: none;
    border-bottom: 1px solid #d0c8b8;
  }
}
</style>
