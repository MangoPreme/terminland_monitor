const colors = require('colors');

function get_date() {
    var date = new Date()
    var second = date.getSeconds()
    var minutes = date.getMinutes()

    if (second.toString().length < 2) {
        var second = `0${second}`
    }

    if (minutes.toString().length < 2) {
        var minutes = `0${minutes}`
    }
    var date_full = `${date.getHours()}:${minutes}:${second}`
    return date_full
}


function success(message) {
    console.log(`[${get_date()}]` + " " + colors.green(`${message}`))
}

function warn(message) {
    console.log(`[${get_date()}]` + " " + colors.yellow(`${message}`))
}

function error(message) {
    console.log(`[${get_date()}]` + " " + colors.red(`${message}`))
}

function status(message) {
    console.log(`[${get_date()}]` + " " + colors.magenta(`${message}`))
}

module.exports = {
    success: success,
    warn: warn,
    error: error,
    status: status
}

