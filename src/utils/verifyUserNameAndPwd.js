module.exports = function verifyUserNameAndPassword(name, password) {
    if (!/^.{1,10}$/.test(name)) {
        return false;
    }
    if (!/^\w{6,16}$/.test(password)) {
        return false;
    }
    return true;
};