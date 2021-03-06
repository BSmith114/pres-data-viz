CREATE TABLE vote(
  "index" TEXT,
  "fips" INTEGER,
  "county" TEXT,
  "state" TEXT,
  "election" INTEGER,
  "democrat" INTEGER,
  "republican" INTEGER,
  "other" INTEGER,
  "total" INTEGER,
  "democrat_percent" REAL,
  "republican_percent" REAL,
  "other_percent" REAL,
  "democrat_diff" REAL,
  "other_diff" INTEGER,
  "republican_diff" INTEGER,
  "total_diff" INTEGER,
  "democrat_percent_diff" REAL,
  "other_percent_diff" REAL,
  "republican_percent_diff" REAL,
  "democrat_margin" INTEGER,
  "democrat_margin_diff" INTEGER,
  "democrat_margin_percent" REAL,
  "democrat_margin_percent_diff" REAL
);
