use actix_web::{web, HttpResponse};
use crate::services::EmailService;
use crate::services::email::ContactForm;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
            .route("/contact", web::post().to(submit_contact_form))
    );
}

async fn submit_contact_form(
    form: web::Json<ContactForm>,
    email_service: web::Data<EmailService>,
) -> HttpResponse {
    match email_service.send_contact_email(&form.into_inner()).await {
        Ok(_) => HttpResponse::Ok().json(serde_json::json!({
            "message": "Email sent successfully"
        })),
        Err(e) => {
            log::error!("Failed to send email: {}", e);
            HttpResponse::InternalServerError().json(serde_json::json!({
                "message": "Failed to send email"
            }))
        }
    }
}
