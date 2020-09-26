module.exports = (result) => {
    if (result instanceof Array)
        return result.map(value => JSON.parse(value.toString()));
    if (IsJsonString(result.toString()))
        return JSON.parse(result.toString());

    return result.toString()
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}