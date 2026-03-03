<template>
  <div class="contact-page">
    <header class="contact-header">
      <h1>{{ t('contact.title') }}</h1>
      <p class="contact-subtitle">{{ t('contact.description') }}</p>
    </header>

    <div class="contact-grid">
      <!-- Info Section -->
      <div class="contact-card info-card">
        <div class="card-content">
          <div class="info-item">
            <h3 class="info-label">{{ t('contact.email_label') }}</h3>
            <a href="mailto:info@jarnomets.com" class="info-link">info@jarnomets.com</a>
          </div>

          <div class="info-item">
            <h3 class="info-label">{{ t('contact.github_label') }}</h3>
            <a href="https://github.com/JarnoMets" target="_blank" rel="noopener" class="info-link">github.com/JarnoMets</a>
          </div>

          <div class="info-item">
            <h3 class="info-label">{{ t('contact.linkedin_label') }}</h3>
            <a href="https://linkedin.com/in/jarno-mets-763525242/" target="_blank" rel="noopener" class="info-link">linkedin.com/in/jarnomets</a>
          </div>
        </div>
      </div>

      <!-- Form Section -->
      <div class="contact-card form-card">
        <div class="card-content">
          <form @submit.prevent="handleSubmit" class="contact-form" novalidate>
            <div class="form-group">
              <label for="name">{{ t('contact.form_name') }}</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                :class="{ 'input-error': errors.name }"
                @blur="validateField('name')"
                required 
                :disabled="status === 'loading'"
                placeholder="John Doe"
              />
              <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">{{ t('contact.form_email') }}</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  :class="{ 'input-error': errors.email }"
                  @blur="validateField('email')"
                  required 
                  :disabled="status === 'loading'"
                  placeholder="john@example.com"
                />
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
              </div>

              <div class="form-group">
                <label for="phone">{{ t('contact.form_phone') }}</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="form.phone" 
                  :class="{ 'input-error': errors.phone }"
                  @blur="validateField('phone')"
                  :disabled="status === 'loading'"
                  placeholder="+32 400 00 00 00"
                />
                <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
              </div>
            </div>

            <div class="form-group">
              <label for="message">{{ t('contact.form_message') }}</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                :class="{ 'input-error': errors.message }"
                @blur="validateField('message')"
                rows="5" 
                required 
                :disabled="status === 'loading'"
              ></textarea>
              <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
            </div>

            <button type="submit" :disabled="status === 'loading'" class="btn btn-primary submit-btn">
              <span v-if="status === 'loading'">{{ t('contact.form_sending') }}</span>
              <span v-else>{{ t('contact.form_submit') }}</span>
            </button>

            <div v-if="status === 'success'" class="alert success text-center">
              {{ t('contact.form_success') }}
            </div>
            <div v-if="status === 'error'" class="alert error text-center">
              {{ t('contact.form_error') }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { api } from '../api';

const { t } = useI18n();

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
});

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
});

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle');

const validateField = (field: keyof typeof form) => {
  errors[field] = '';

  if (field === 'name') {
    if (!form.name.trim()) errors.name = t('contact.validation.required');
  }

  if (field === 'email') {
    if (!form.email.trim()) {
      errors.email = t('contact.validation.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = t('contact.validation.email');
    }
  }

  if (field === 'phone' && form.phone.trim()) {
    if (!/^[+]?[\d\s-]{8,}$/.test(form.phone)) {
      errors.phone = t('contact.validation.phone');
    }
  }

  if (field === 'message') {
    if (!form.message.trim()) errors.message = t('contact.validation.required');
  }
};

const validateForm = () => {
  validateField('name');
  validateField('email');
  validateField('phone');
  validateField('message');
  return !errors.name && !errors.email && !errors.phone && !errors.message;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  status.value = 'loading';
  try {
    await api.submitContactForm(form);
    status.value = 'success';
    form.name = '';
    form.email = '';
    form.phone = '';
    form.message = '';
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
.contact-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.contact-header {
  margin-bottom: 3rem;
  text-align: center;
}

.contact-header h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #e8eaf0;
}

.contact-subtitle {
  font-size: 1.05rem;
  color: #a0a8b8;
  max-width: 700px;
  margin: 0 auto;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2.5rem;
}

.contact-card {
  background: #2a2d35;
  border: 1px solid #3a3d46;
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.contact-card:hover {
  border-color: #505664;
  box-shadow: 0 6px 32px rgba(0, 0, 0, 0.25);
}

.card-content {
  padding: 2rem;
}

.info-card .card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.info-item {
  margin-bottom: 2rem;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6878a8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.info-link {
  font-size: 1.1rem;
  color: #e0e4ec;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.info-link:hover {
  color: #6478c4;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #a0a8b8;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem 1rem;
  background: #1e2026;
  border: 1px solid #3a3d46;
  border-radius: 8px;
  color: #e0e4ec;
  font-size: 0.95rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #5568b4;
  box-shadow: 0 0 0 3px rgba(85, 104, 180, 0.15);
}

.form-group input.input-error,
.form-group textarea.input-error {
  border-color: #e53e3e;
}

.error-message {
  font-size: 0.75rem;
  color: #e53e3e;
  margin-top: 0.25rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  text-align: center;
}

.btn-primary {
  background-color: #5568b4;
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  background-color: #6478c4;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.alert {
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-top: 1rem;
}

.alert.success {
  background-color: rgba(72, 187, 120, 0.1);
  color: #48bb78;
  border: 1px solid rgba(72, 187, 120, 0.2);
}

.alert.error {
  background-color: rgba(229, 62, 62, 0.1);
  color: #e53e3e;
  border: 1px solid rgba(229, 62, 62, 0.2);
}

.text-center {
  text-align: center;
}

@media (prefers-color-scheme: light) {
  .contact-header h1 {
    color: #1a2030;
  }

  .contact-subtitle {
    color: #5a6270;
  }

  .contact-card {
    background: #f5f6f8;
    border-color: #dde0e6;
  }

  .contact-card:hover {
    border-color: #c0c6d0;
    box-shadow: 0 6px 32px rgba(0, 0, 0, 0.08);
  }

  .info-label {
    color: #8090b8;
  }

  .info-link {
    color: #1e2636;
  }

  .info-link:hover {
    color: #4a5ca0;
  }

  .form-group label {
    color: #4a5060;
  }

  .form-group input,
  .form-group textarea {
    background: #ffffff;
    border-color: #dde0e6;
    color: #1e2636;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    border-color: #4a5ca0;
  }

  .btn-primary {
    background-color: #4a5ca0;
  }

  .btn-primary:hover:not(:disabled) {
    background-color: #5568b4;
  }
}

@media (max-width: 850px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .info-card .card-content {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: space-around;
  }

  .info-item {
    margin-bottom: 0;
  }
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .info-card .card-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>