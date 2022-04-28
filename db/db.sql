-- to start the db, go to dbdirectory on terminal, uncomment line below, copy paste into terminal:
---------------------------
-- locally... (may need to input password)
-- psql postgres -f db.sql

-- (TODO: research how to install pg again on remote computer)
-- TODO: UPDATE ALL PATH NAMES TO csv FILES ON DEPLOYENT!!

---------------------------
-- OR deployment on EC2...--
-- psql alancea -h 127.0.0.1 -d sdc -f db.sql
---------------------------
drop database if exists sdc;
CREATE DATABASE sdc;
\c sdc;

---------------------------
--PRODUCTS
---------------------------

DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
  id serial,
  name varchar,
  slogan varchar,
  description varchar,
  category varchar,
  default_price varchar,
  -- "createdAt" timestamp WITH TIME ZONE DEFAULT current_timestamp,
  -- "updatedAt" timestamp WITH TIME ZONE DEFAULT current_timestamp,
  PRIMARY KEY (id)
);

-- COPY products FROM '/Users/alancea/Desktop/RFC2202/productOverview/db/SDCproductsOverview/sanitized_products.csv' WITH (FORMAT CSV, HEADER true);
\copy products from '/Users/alancea/Desktop/RFC2202/productOverview/db/SDCproductsOverview/sanitized_products.csv' DELIMITER ',' CSV header;

ALTER TABLE products ADD COLUMN "createdAt" timestamp WITH TIME ZONE DEFAULT current_timestamp;
ALTER TABLE products ADD COLUMN "updatedAt" timestamp WITH TIME ZONE DEFAULT current_timestamp;

CREATE INDEX indexProduct ON products("id");

-- SELECT * from products limit 3;

---------------------------
--STYLES
---------------------------

DROP TABLE IF EXISTS styles CASCADE;

CREATE TABLE styles (
  id serial,
  productId integer,
  name varchar,
  sale_price varchar,
  original_price varchar(10),
  default_style varchar(10),
  -- "createdAt" timestamp WITH TIME ZONE DEFAULT current_timestamp,
  -- "updatedAt" timestamp WITH TIME ZONE DEFAULT current_timestamp,
  PRIMARY KEY (id),
  FOREIGN KEY (productId) REFERENCES products(id)
);

-- COPY styles FROM '/Users/alancea/Desktop/RFC2202/productOverview/db/SDCproductsOverview/sanitized_styles.csv' WITH (FORMAT CSV, HEADER true);
\copy styles from '/Users/alancea/Desktop/RFC2202/productOverview/db/SDCproductsOverview/sanitized_styles.csv' DELIMITER ',' CSV header;

ALTER TABLE styles RENAME COLUMN id TO style_id;
ALTER TABLE styles RENAME COLUMN productId TO product_id;
ALTER TABLE styles RENAME COLUMN default_style TO "default?";
ALTER TABLE styles ADD COLUMN "createdAt" timestamp WITH TIME ZONE DEFAULT current_timestamp;
ALTER TABLE styles ADD COLUMN "updatedAt" timestamp WITH TIME ZONE DEFAULT current_timestamp;

CREATE INDEX indexStyleId ON styles("style_id");
CREATE INDEX indexStyleProd ON styles("product_id");

-- SELECT * from styles limit 3;

---------------------------
--SKUS
---------------------------

DROP TABLE IF EXISTS skus CASCADE;

CREATE TABLE skus (
  id serial,
  styleId integer,
  size varchar(10),
  quantity integer,
  -- "createdAt" timestamp WITH TIME ZONE DEFAULT current_timestamp,
  -- "updatedAt" timestamp WITH TIME ZONE DEFAULT current_timestamp,
  PRIMARY KEY (id),
  FOREIGN KEY (styleId) REFERENCES styles(style_id)
);

-- COPY skus FROM '/Users/alancea/Desktop/RFC2202/productOverview/db/SDCproductsOverview/skus.csv' WITH (FORMAT CSV, HEADER true, NULL '');
\copy skus from '/Users/alancea/Desktop/RFC2202/productOverview/db/SDCproductsOverview/skus.csv' DELIMITER ',' CSV header;

ALTER TABLE skus RENAME COLUMN styleId TO style_id;
ALTER TABLE skus ADD COLUMN "createdAt" timestamp WITH TIME ZONE DEFAULT current_timestamp;
ALTER TABLE skus ADD COLUMN "updatedAt" timestamp WITH TIME ZONE DEFAULT current_timestamp;

CREATE INDEX indexSkus ON skus("style_id");

-- SELECT * from skus limit 3;

---------------------------
--PHOTOS
---------------------------
DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE photos (
  id serial,
  styleId integer,
  url varchar,
  thumbnail_url varchar,
  -- "createdAt" timestamp WITH TIME ZONE DEFAULT current_timestamp,
  -- "updatedAt" timestamp WITH TIME ZONE DEFAULT current_timestamp,
  primary key (id),
  foreign key (styleId) REFERENCES styles(style_id)
);

-- COPY photos FROM '/Users/alancea/Desktop/RFC2202/productOverview/db/SDCproductsOverview/photos.csv' WITH (FORMAT CSV, HEADER true, NULL '');
\copy photos from '/Users/alancea/Desktop/RFC2202/productOverview/db/SDCproductsOverview/photos.csv' DELIMITER ',' CSV header;

ALTER TABLE photos RENAME COLUMN styleId TO style_id;
ALTER TABLE photos ADD COLUMN "createdAt" timestamp WITH TIME ZONE DEFAULT current_timestamp;
ALTER TABLE photos ADD COLUMN "updatedAt" timestamp WITH TIME ZONE DEFAULT current_timestamp;

CREATE INDEX indexPhotos ON photos("style_id");

-- SELECT * from photos limit 3;

---------------------------
--FEATURES
---------------------------
DROP TABLE IF EXISTS features CASCADE;

CREATE TABLE features (
  id serial,
  productId integer,
  feature varchar,
  value varchar,
  -- "createdAt" timestamp WITH TIME ZONE DEFAULT current_timestamp,
  -- "updatedAt" timestamp WITH TIME ZONE DEFAULT current_timestamp,
  PRIMARY KEY (id),
  FOREIGN KEY (productId) REFERENCES products(id)
);

-- COPY features FROM '/Users/alancea/Desktop/RFC2202/productOverview/db/SDCproductsOverview/features.csv' WITH (FORMAT CSV, HEADER true, NULL '');
\copy features from '/Users/alancea/Desktop/RFC2202/productOverview/db/SDCproductsOverview/features.csv' DELIMITER ',' CSV header;

ALTER TABLE features RENAME COLUMN productId TO product_id;
ALTER TABLE features ADD COLUMN "createdAt" timestamp WITH TIME ZONE DEFAULT current_timestamp;
ALTER TABLE features ADD COLUMN "updatedAt" timestamp WITH TIME ZONE DEFAULT current_timestamp;

CREATE INDEX indexFeatures ON features("product_id");

-- SELECT * from features limit 3;

---------------------------
--RELATED
---------------------------
DROP TABLE IF EXISTS related CASCADE;

CREATE TABLE related (
  id serial,
  current_product_id integer,
  related_product_id integer,
  -- "createdAt" timestamp WITH TIME ZONE DEFAULT current_timestamp,
  -- "updatedAt" timestamp WITH TIME ZONE DEFAULT current_timestamp,
  primary key(id),
  foreign key(current_product_id) references products(id)
);

-- COPY related FROM '/Users/alancea/Desktop/RFC2202/productOverview/db/SDCproductsOverview/related.csv' WITH (FORMAT CSV, HEADER true, NULL '');
\copy related from '/Users/alancea/Desktop/RFC2202/productOverview/db/SDCproductsOverview/related.csv' DELIMITER ',' CSV header;

ALTER TABLE related RENAME COLUMN current_product_id TO "product_id";
-- ALTER TABLE related RENAME COLUMN current_product_id TO "related_product_id";
ALTER TABLE related ADD COLUMN "createdAt" timestamp WITH TIME ZONE DEFAULT current_timestamp;
ALTER TABLE related ADD COLUMN "updatedAt" timestamp WITH TIME ZONE DEFAULT current_timestamp;

CREATE INDEX indexRelated ON related("product_id");

SELECT * from related limit 3;