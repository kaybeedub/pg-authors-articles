const express = require('express');
const uuid = require('uuid');
const db = require('./db.js');

db.sync()
  .then(() => {
    console.log('synced');
  })
  .catch(err => console.error(err));

db.readArticles()
  .then(() => {
    console.log('articles have been read');
  })
  .catch(err => console.error(err));

db.readArticle()
  .then(() => {
    console.log('one article is being read');
  })
  .catch(err => console.error(err));

db.deleteArticle()
  .then(() => {
    console.log('and now we delete an article');
  })
  .catch(err => console.error(err));

db.createArticle('javascript for dummies', 'here is my article body, heyyy');
