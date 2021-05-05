function resultObj(status, message, data, len) {
    const result = {
        status,
        message
    };
    if (len) result.len = len;
    if (data) result.data = data;
    return result;
}
module.exports = resultObj;