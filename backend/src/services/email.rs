use lettre::message::header::ContentType;
use lettre::transport::smtp::authentication::Credentials;
use lettre::{AsyncSmtpTransport, AsyncTransport, Message, Tokio1Executor};
use serde::{Deserialize, Serialize};
use std::env;

#[derive(Debug, Deserialize, Serialize)]
pub struct ContactForm {
    pub name: String,
    pub email: String,
    pub phone: Option<String>,
    pub message: String,
}

#[derive(Clone)]
pub struct EmailService {
    smtp_host: String,
    smtp_port: u16,
    smtp_user: String,
    smtp_pass: String,
    from_email: String,
    to_email: String,
    enabled: bool,
}

impl EmailService {
    pub fn from_env() -> Self {
        let enabled = env::var("EMAIL_ENABLED")
            .map(|v| v == "true" || v == "1")
            .unwrap_or(true);

        let smtp_pass = env::var("SMTP_PASS").unwrap_or_else(|_| {
            std::fs::read_to_string("/app/smtp-key-brevo")
                .or_else(|_| std::fs::read_to_string("../smtp-key-brevo"))
                .or_else(|_| std::fs::read_to_string("smtp-key-brevo"))
                .unwrap_or_default()
                .trim()
                .to_string()
        });

        Self {
            smtp_host: env::var("SMTP_HOST").unwrap_or_else(|_| "smtp-relay.brevo.com".to_string()),
            smtp_port: env::var("SMTP_PORT")
                .ok()
                .and_then(|p| p.parse().ok())
                .unwrap_or(587),
            smtp_user: env::var("SMTP_USER").unwrap_or_else(|_| "info@jarnomets.com".to_string()),
            smtp_pass,
            from_email: env::var("EMAIL_FROM").unwrap_or_else(|_| "info@jarnomets.com".to_string()),
            to_email: env::var("EMAIL_TO").unwrap_or_else(|_| "info@jarnomets.com".to_string()),
            enabled,
        }
    }

    fn build_mailer(&self) -> Result<AsyncSmtpTransport<Tokio1Executor>, Box<dyn std::error::Error + Send + Sync>> {
        let creds = Credentials::new(self.smtp_user.clone(), self.smtp_pass.clone());
        Ok(AsyncSmtpTransport::<Tokio1Executor>::starttls_relay(&self.smtp_host)?
            .port(self.smtp_port)
            .credentials(creds)
            .build())
    }

    pub async fn send_contact_email(&self, form: &ContactForm) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
        if !self.enabled {
            log::warn!("Email service is disabled. Content: {:?}", form);
            return Ok(());
        }

        let subject = format!("New Contact Form Submission from {}", form.name);
        let phone_line = form.phone.as_ref().map(|p| format!("Phone: {}\n", p)).unwrap_or_default();
        let body = format!(
            "You have received a new message from your website contact form.\n\n\
            Name: {}\n\
            Email: {}\n\
            {} \n\
            Message:\n{}",
            form.name, form.email, phone_line, form.message
        );

        let email = Message::builder()
            .from(self.from_email.parse()?)
            .to(self.to_email.parse()?)
            .subject(subject)
            .header(ContentType::TEXT_PLAIN)
            .body(body)?;

        let mailer = self.build_mailer()?;
        mailer.send(email).await?;
        
        log::info!("Contact email sent from {}", form.email);
        Ok(())
    }
}
