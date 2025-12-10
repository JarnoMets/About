use sqlx::{PgPool, postgres::PgPoolOptions};

pub type DbPool = PgPool;

pub async fn create_pool(database_url: &str) -> DbPool {
    PgPoolOptions::new()
        .max_connections(5)
        .connect(database_url)
        .await
        .expect("Failed to create pool")
}
