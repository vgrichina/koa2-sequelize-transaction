models.Sequelize.useCLS(namespace);

// TODO: Extract and publish as separate module as koa-sequelize-transaction is broken
const transactionMiddleware = (ctx, next) => {
    return new Promise((resolve, reject) => {
        namespace.run(() => {
            models.sequelize.transaction().then(transaction => {
                namespace.set('transaction', transaction);
                next().then((result) => {
                    transaction.commit();
                    resolve(result);
                }, (e) => {
                    transaction.rollback();
                    reject(e);
                });
            }, reject);
        });
    });
};
