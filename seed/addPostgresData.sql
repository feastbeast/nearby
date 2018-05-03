-- CREATE USER docker;
-- CREATE DATABASE docker;

DROP DATABASE IF EXISTS apateez_nearby;
CREATE DATABASE apateez_nearby;

GRANT ALL PRIVILEGES ON DATABASE apateez_nearby TO postgres;

\connect apateez_nearby;

CREATE TABLE restaurants
(
  place_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  google_rating DECIMAL NOT NULL,
  zagat_rating DECIMAL NOT NULL,
  photos TEXT[] NOT NULL,
  neighborhood TEXT NOT NULL,
  price_level INT NOT NULL,
  types TEXT NOT NULL,
  nearby TEXT[] NOT NULL
);

COPY restaurants(place_id, name, google_rating, zagat_rating, photos, 
neighborhood, price_level, types, nearby) 
FROM '/Users/Belinda/Hack-Reactor/SDC-nearby/seed/postgresData.csv' DELIMITER ',' CSV HEADER;
