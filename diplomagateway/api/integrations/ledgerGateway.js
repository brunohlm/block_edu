const parseResult = require('../helpers/resultParser')


async function invoke(transaction, ...args) {
    result = await global.contract.submitTransaction(transaction, args);
    return parseResult(result)
}

async function query(transaction, ...args) {
    result = await global.contract.evaluateTransaction(transaction, ...args);
    return parseResult(result)
}

module.exports = {
    invoke,
    query
}