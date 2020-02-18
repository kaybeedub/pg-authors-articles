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

// authors
const readAuthors = async () => {
  const SQL = 'SELECT * FROM authors';
  const response = await client.query(SQL);
  return response.rows;
};

const readAuthor = async id => {
  const SQL = 'SELECT * FROM authors WHERE id=$1';
  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

const deleteAuthor = async id => {
  const SQL = 'DELETE from authors WHERE id=$1';
  await client.query(SQL, [id]);
};

const createAuthor = async (firstName, lastName) => {
  const SQL =
    'INSERT INTO authors (id, first_name, last_name) values ($1, $2, $3) returning *';
  const response = await client.query(SQL, [uuid(), firstName, lastName]);
  return response.rows[0];
};

const updateAuthor = async article => {
  const SQL = 'UPDATE articles set title=$1 where id=$2 returning *';
  const response = await client.query(SQL, [article.name, article.id]);
  return response.rows[0];
};

// articles
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

const createArticle = async (title, body) => {
  const SQL =
    'INSERT INTO articles(id, title, body) values ($1, $2, $3) returning *';
  const response = await client.query(SQL, [uuid(), title, body]);
  return response.rows[0];
};

const updateArticle = async article => {
  const SQL = 'UPDATE articles set title=$1 where id=$2 returning *';
  const response = await client.query(SQL, [article.title, article.id]);
  return response.rows[0];
};

module.exports = {
  sync,
  readAuthors,
  readAuthor,
  deleteAuthor,
  createAuthor,
  updateAuthor,
  readArticles,
  readArticle,
  deleteArticle,
  createArticle,
  updateArticle,
};
