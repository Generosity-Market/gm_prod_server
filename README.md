# GM Prod Server

[![Build Status](https://travis-ci.org/Generosity-Market/gm_prod_server.svg?branch=master)](https://travis-ci.org/Generosity-Market/gm_prod_server)
[![Coverage Status](https://coveralls.io/repos/github/Generosity-Market/gm_prod_server/badge.svg?branch=master)](https://coveralls.io/github/Generosity-Market/gm_prod_server?branch=master)

## Tech Stack

### Api

- Node
- Express
- PostgreSQL

### Dependencies

- express
- passport
- passport-http
- path
- morgan
- pg
- sequelize
- body-parser
- node-fetch
- nodemailer
- stripe

## Team members

- [Joseph Gordy](https://github.com/JGordy) - React/Node

## Setup

To contribute to this repo:

- Clone this repository (`git clone https://github.com/Generosity-Market/gm_prod_server.git`) to a local directory.
- `cd` into the directory.
- Use `npm install` in the terminal to install all dependencies from the `package.json` file.
- To create the database on your local machine type `createdb generosity-dev` and `createdb generosity-test`.
- Next type `psql` to enter the Sequelize CLI.
- Then `\c generosity-dev` to connect to the database.
- `\q` to exit the Sequelize CLI.
- `sequelize db:migrate` to migrate all of the models and tables.
- Then `npm run dev` to start up the project. It will run on `localhost:3002`.
