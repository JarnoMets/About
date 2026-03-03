const API_URL = import.meta.env.VITE_API_URL || '/api';

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export const api = {
  async submitContactForm(form: ContactForm) {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }

    return response.json();
  },
};
