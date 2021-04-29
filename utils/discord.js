const discord_webhook = require("webhook-discord");
var webhook = new discord_webhook.Webhook("https://discord.com/api/webhooks/837449313625309254/eQW_8aL-LAO8y87aHGN9Huw2d-3ihj1DaExnYNM2_7PZc9Abhmj2D38COiY6S6JQcVbc")

function notify() {
    const msg = new discord_webhook.MessageBuilder()
        .setText("<@227436577838727168>")
        .setURL("https://www.terminland.de/Impfzentrum-Lippe/default.aspx?m=35258&ll=SE5TF&dpp=0&dlgid=4&step=3&dlg=1&a1628343864=1641941024&a1628345572=1628346909&a1628577303=1628578003&css=1")
        .setName("Appointment Monitor")
        .setTitle("Appointments live")
        .setColor("#6bde87")
        .setAvatar("https://i.imgur.com/gJqVG24.png")
        .addField("Status", `Waiting room live`)
        .setFooter(`Terminland monitor`)

    webhook.send(msg);
}

module.exports = {
    notify
}