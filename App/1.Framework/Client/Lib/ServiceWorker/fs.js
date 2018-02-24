const __files = {}

let existsSync = function existsSync (path) {
    return typeof __files[path] !== 'undefined'
}

let writeFileSync = function writeFileSync (path, text) {
    // assuming utf8
    __files[path] = text
}

let readFileSync = function readFileSync (path) {
    return __files[path]
}

module.exports = {existsSync, writeFileSync, existsSync}