const pg = require('pg');
const uuid = require('uuid');
const { Client } = pg;

const client = new Client('postgres://localhost/pg_author_article_db');
client.connect();

const sync = async () => {
  //  An article has a title, body, date_created, id which is a UUID, and an author_id which references the id of an author

  const SQL = `
    DROP TABLE IF EXISTS authors;
    DROP TABLE IF EXISTS articles;
    CREATE TABLE authors (
      id UUID PRIMARY KEY,
      first_name VARCHAR,
      last_name VARCHAR,
      date_created TIMESTAMP default CURRENT_TIMESTAMP
    );
    CREATE TABLE articles (
      id UUID PRIMARY KEY,
      title VARCHAR,
      body VARCHAR,
      date_created TIMESTAMP default CURRENT_TIMESTAMP,
      author_ID UUID references authors(id)
    );
  `;
  await client.query(SQL);
};

module.exports = {
  sync,
};
