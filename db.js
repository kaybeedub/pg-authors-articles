const pg = require('pg');
const uuid = require('uuid');
const { Client } = pg;

const client = new Client('postgres://localhost/pg_author_article_db');
client.connect();

const sync = async () => {
  const SQL = `
  DROP TABLE IF EXISTS articles;
  DROP TABLE IF EXISTS authors;
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
  const articles = await readArticles();
  console.log(await readArticles(articles));
};

const readArticles = async () => {
  const SQL = 'SELECT * FROM articles';
  const response = await client.query(SQL);
  return response.rows;
};

const readArticle = async id => {
  const SQL = 'SELECT * FROM articles WHERE id=$1';
  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

const deleteArticle = async id => {
  const SQL = 'DELETE from articles WHERE id=$1';
  await client.query(SQL, [id]);
};

module.exports = {
  sync,
  readArticles,
  readArticle,
  deleteArticle,
};
