-- Archivo DDL (Data Definition Language) generado a partir del DER "DER Inmobiliaria.pdf"
-- Este script crea las tablas y establece las Claves Primarias (PK) y Foráneas (FK) para PostgreSQL.

CREATE EXTENSION IF NOT EXISTS citext;

-- 1. Tablas de Catálogo y Maestras -----------------------------------------------------------------

-- Tabla 'markets' (Mercados o Países/Regiones de Alto Nivel)
CREATE TABLE markets (
    id          SERIAL PRIMARY KEY,
    code        TEXT NOT NULL,
    name        TEXT NOT NULL,
    country     TEXT NOT NULL,
    created_at  TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla 'amenities' (Amenidades/Características)
CREATE TABLE amenities (
    id      SERIAL PRIMARY KEY,
    name    TEXT NOT NULL,
    kind    TEXT, -- Tipo de amenidad (e.g., 'community', 'apartment')
    icon    TEXT
);

-- Tabla 'tags' (Tags independientes, usados en la relación project_tags)
CREATE TABLE tags (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL
);

-- Tabla 'areas/barrios' (Áreas/Barrios)
CREATE TABLE areas_barrios (
    id          SERIAL PRIMARY KEY,
    market_id   INTEGER NOT NULL,
    name        TEXT NOT NULL,
    
    FOREIGN KEY (market_id) REFERENCES markets(id)
);


-- 2. Tablas de Desarrolladores/Propietarios (Owners) ------------------------------------------------

-- Tabla 'owners' (Propietarios de los desarrollos)
CREATE TABLE owners (
    id              SERIAL PRIMARY KEY,
    email           CITEXT UNIQUE NOT NULL, -- CITEXT para email (Case Insensitive Text)
    password_hash   TEXT NOT NULL,
    display_name    TEXT,
    created_at      TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at   TIMESTAMP WITHOUT TIME ZONE
);

-- Tabla 'owner_sessions' (Sesiones de Propietarios)
CREATE TABLE owner_sessions (
    token       TEXT PRIMARY KEY,
    owner_id    INTEGER NOT NULL,
    expires_at  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at  TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (owner_id) REFERENCES owners(id)
);


-- 3. Tablas de Propiedades (Projects) -------------------------------------------------------------

-- Tabla 'projects' (Los desarrollos inmobiliarios en sí mismos)
CREATE TABLE projects (
    id                  SERIAL PRIMARY KEY,
    url                 TEXT UNIQUE,
    title               TEXT NOT NULL,
    market_id           INTEGER NOT NULL,
    area_id             INTEGER NOT NULL,
    status              TEXT, -- project_status
    price_usd           INTEGER,
    property_type       TEXT,
    delivery_date       TEXT,
    latitude            INTEGER,
    longitude           INTEGER,
    address             TEXT,
    short_description   TEXT,
    description_md      TEXT, -- Markdown para descripción larga
    is_published        BOOLEAN DEFAULT FALSE,
    published_at        TIMESTAMP WITHOUT TIME ZONE,
    created_by          INTEGER, -- FK created_by (owner_id)
    updated_by          INTEGER, -- FK updated_by (owner_id)
    created_at          TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    drive_dropbox_url   TEXT,

    FOREIGN KEY (market_id) REFERENCES markets(id),
    FOREIGN KEY (area_id) REFERENCES areas_barrios(id),
    FOREIGN KEY (created_by) REFERENCES owners(id),
    FOREIGN KEY (updated_by) REFERENCES owners(id)
);

-- Tabla 'project_media' (Imágenes, videos y otros archivos de proyectos)
CREATE TABLE project_media (
    id              SERIAL PRIMARY KEY,
    project_id      INTEGER NOT NULL,
    kind            TEXT, -- media_kind (e.g., 'image', 'video', 'floorplan')
    title           TEXT,
    alt             TEXT,
    s3_bucket       TEXT,
    s3_key          TEXT,
    width           INTEGER,
    height          INTEGER,
    sort_order      INTEGER DEFAULT 0,
    created_at      TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Tabla 'featured_projects' (Proyectos destacados en el homepage o sección especial)
CREATE TABLE featured_projects (
    id          SERIAL PRIMARY KEY,
    market_id   INTEGER NOT NULL,
    project_id  INTEGER NOT NULL,
    position    INTEGER NOT NULL,
    created_at  TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (market_id) REFERENCES markets(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);


-- 4. Tablas de Relación Muchos a Muchos (M:N) ------------------------------------------------------

-- Tabla 'project_tags' (Relación M:N entre Proyectos y Tags)
CREATE TABLE project_tags (
    project_id  INTEGER NOT NULL,
    tag_id      INTEGER NOT NULL,
    
    PRIMARY KEY (project_id, tag_id),
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);

-- Tabla 'project_amenities' (Relación M:N entre Proyectos y Amenidades)
CREATE TABLE project_amenities (
    project_id  INTEGER NOT NULL,
    amenity_id  INTEGER NOT NULL,
    
    PRIMARY KEY (project_id, amenity_id),
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (amenity_id) REFERENCES amenities(id)
);


-- 5. Tablas de Consumidores (Marketplace Users) ----------------------------------------------------

-- Tabla 'marketplace_users' (Consumidores finales / Buyers)
CREATE TABLE marketplace_users (
    id              SERIAL PRIMARY KEY,
    email           TEXT UNIQUE NOT NULL,
    password_hash   TEXT NOT NULL,
    name            TEXT,
    phone_number    TEXT,
    created_at      TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at   TIMESTAMP WITHOUT TIME ZONE
);

-- Tabla 'marketplace_sessions' (Sesiones de Consumidores)
CREATE TABLE marketplace_sessions (
    token       TEXT PRIMARY KEY,
    user_id     INTEGER NOT NULL,
    expires_at  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at  TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES marketplace_users(id)
);

-- Tabla 'user_favorite_projects' (Proyectos Favoritos del Consumidor)
CREATE TABLE user_favorite_projects (
    user_id     INTEGER NOT NULL,
    project_id  INTEGER NOT NULL,
    created_at  TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id, project_id),
    FOREIGN KEY (user_id) REFERENCES marketplace_users(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Tabla 'leads' (Interesados que completan un formulario)
CREATE TABLE leads (
    id              SERIAL PRIMARY KEY,
    project_id      INTEGER,
    user_id         INTEGER, -- FK user_id (optional, if authenticated)
    full_name       TEXT NOT NULL,
    email           TEXT NOT NULL,
    chat_transcript TEXT,
    phone_number    TEXT,
    budget_usd_min  INTEGER,
    budget_usd_max  INTEGER,
    preferred_area  TEXT,
    
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (user_id) REFERENCES marketplace_users(id)
);

