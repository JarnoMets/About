use actix_web::{web, HttpResponse};
use crate::db::DbPool;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
            .route("/example", web::get().to(get_example))
    );
}

async fn get_example(_pool: web::Data<DbPool>) -> HttpResponse {
    HttpResponse::Ok().json(serde_json::json!({
        "message": "Example endpoint"
    }))
}
