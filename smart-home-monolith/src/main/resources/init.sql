CREATE TABLE IF NOT EXISTS heating_systems (
    id BIGSERIAL PRIMARY KEY,
    is_on BOOLEAN NOT NULL,
    target_temperature DOUBLE PRECISION NOT NULL,
    current_temperature DOUBLE PRECISION NOT NULL
);

CREATE TABLE IF NOT EXISTS temperature_sensors (
    id BIGSERIAL PRIMARY KEY,
    current_temperature DOUBLE PRECISION NOT NULL,
    last_updated TIMESTAMP NOT NULL
);

TRUNCATE "heating_systems", "temperature_sensors";

INSERT INTO "heating_systems" ("id", "is_on", "target_temperature", "current_temperature")
VALUES (nextval('heating_systems_id_seq'), '0', '21', '22');

INSERT INTO "heating_systems" ("id", "is_on", "target_temperature", "current_temperature")
VALUES (nextval('heating_systems_id_seq'), '0', '21', '22');

INSERT INTO "heating_systems" ("id", "is_on", "target_temperature", "current_temperature")
VALUES (nextval('heating_systems_id_seq'), '0', '21', '22');