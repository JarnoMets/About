<template>
  <div class="contact-view">
    <div class="contact-container">
      <header class="contact-header">
        <h1>{{ $t('contact.title') }}</h1>
        <p>{{ $t('contact.description') }}</p>
      </header>

      <div class="contact-grid">
        <!-- Info Section -->
        <div class="contact-info">
          <div class="info-card">
            <div class="info-item">
              <div class="details">
                <h3>{{ $t('contact.email_label') }}</h3>
                <a href="mailto:info@jarnomets.com">info@jarnomets.com</a>
              </div>
            </div>

            <div class="info-item">
              <div class="details">
                <h3>{{ $t('contact.github_label') }}</h3>
                <a href="https://github.com/JarnoMets" target="_blank" rel="noopener">github.com/JarnoMets</a>
              </div>
            </div>

            <div class="info-item">
              <div class="details">
                <h3>{{ $t('contact.linkedin_label') }}</h3>
                <a href="https://linkedin.com/in/jarno-mets-763525242/" target="_blank" rel="noopener">linkedin.com/in/jarnomets</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Section -->
        <div class="contact-form-container">
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-group">
              <label for="name">{{ $t('contact.form_name') }}</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                required 
                :disabled="status === 'loading'"
                placeholder="John Doe"
              />
            </div>

            <div class="form-group">
              <label for="email">{{ $t('contact.form_email') }}</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                required 
                :disabled="status === 'loading'"
                placeholder="john@example.com"
              />
            </div>

            <div class="form-group">
              <label for="message">{{ $t('contact.form_message') }}</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                rows="5" 
                required 
                :disabled="status === 'loading'"
              ></textarea>
            </div>

            <button type="submit" :disabled="status === 'loading'" class="submit-btn">
              <span v-if="status === 'loading'">{{ $t('contact.form_sending') }}</span>
              <span v-else>{{ $t('contact.form_submit') }}</span>
            </button>

            <div v-if="status === 'success'" class="alert success">
              {{ $t('contact.form_success') }}
            </div>
            <div v-if="status === 'error'" class="alert error">
              {{ $t('contact.form_error') }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { api } from '../api';

const form = ref({
  name: '',
  email: '',
  message: '',
});

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle');

const handleSubmit = async () => {
  status.value = 'loading';
  try {
    await api.submitContactForm(form.value);
    status.value = 'success';
    form.value = { name: '', email: '', message: '' };
    setTimeout(() => {
      if (status.value === 'success') status.value = 'idle';
    }, 5000);
  } catch (error) {
    console.error('Submission error:', error);
    status.value = 'error';
  }
};
</script>

<style scoped>
.contact-view {
  min-height: calc(100vh - 80px);
  padding: 4rem 2rem;
  background-color: #f9fafb;
}

.contact-container {
  max-width: 1000px;
  margin: 0 auto;
}

.contact-header {
  text-align: center;
  margin-bottom: 4rem;
}

.contact-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
}

.contact-header p {
  font-size: 1.125rem;
  color: #4b5563;
  max-width: 600px;
  margin: 0 auto;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
}

.info-item:last-child {
  margin-bottom: 0;
}

.icon {
  font-size: 1.5rem;
  padding-top: 0.25rem;
}

.details h3 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.25rem 0;
}

.details a {
  font-size: 1rem;
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.15s ease-in-out;
}

.details a:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.contact-form-container {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.submit-btn {
  background-color: #2563eb;
  color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

.submit-btn:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.alert {
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-top: 1rem;
}

.alert.success {
  background-color: #ecfdf5;
  color: #065f46;
  border: 1px solid #10b981;
}

.alert.error {
  background-color: #fef2f2;
  color: #991b1b;
  border: 1px solid #ef4444;
}
</style>