use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

// Add your models here
#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Example {
    pub id: i32,
    pub name: String,
    pub created_at: DateTime<Utc>,
}
