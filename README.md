# koa2-sequelize-transaction

Koa2 middleware to handle Sequelize transactions automatically. Rolls back if any subsequent middleware throws an error.

## Usage

```js
app.use(require('koa2-sequelize-transaction')({ sequelize, namespace: 'your-app-namespace' }));

// Above middleware should run before any other middleware issuing Sequelize queries

```
