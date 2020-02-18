const express = require('express');
const uuid = require('uuid');
const db = require('./db.js');

console.log('hello world');
console.log(db.sync());
