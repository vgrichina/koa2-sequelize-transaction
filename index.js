module.exports = ({ sequelize, namespace: namespaceName = 'koa2-sequelize-transaction' }) => {
    const namespace = require('cls-hooked').createNamespace(namespaceName);
    sequelize.constructor.useCLS(namespace);

    const transactionMiddleware = (ctx, next) => {
        return new Promise((resolve, reject) => {
            namespace.run(() => {
                sequelize.transaction().then(transaction => {
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

    return transactionMiddleware;
}
