const discord_webhook = require("webhook-discord");
var webhook = new discord_webhook.Webhook("https://discord.com/api/webhooks/837668737703870464/NAZ9sHOW-lCr1L0w2ECXPdapousAOJxKbqQP8hslb1x9_BFrk9aU22gIilEZ5UnKy7Xb")

function notify() {
    const msg = new discord_webhook.MessageBuilder()
        .setText("@everyone")
        .setURL("https://www.terminland.de/Impfzentrum-Lippe/default.aspx?m=35258&ll=SE5TF&dpp=0&dlgid=4&step=3&dlg=1&a1628343864=1641941024&a1628345572=1628346909&a1628577303=1628578003&css=1")
        .setName("Appointment Monitor")
        .setTitle("Appointments live")
        .setColor("#6bde87")
        .setAvatar("https://d25bw6vpcxy1uk.cloudfront.net/media/image/71/b6/e3/pscho-doctor-xxl-spritze-35cm-1_600x600@2x.webp")
        .addField("Status", `Waiting room live`)
        .setImage("https://cdn.discordapp.com/attachments/229625226189733898/837453622081093682/image0.jpg")
        .setFooter(`Terminland monitor`)

    webhook.send(msg);
}

function error(error) {
    const msg = new discord_webhook.MessageBuilder()
        .setText("<@227436577838727168>")
        .setURL("https://www.terminland.de/Impfzentrum-Lippe/default.aspx?m=35258&ll=SE5TF&dpp=0&dlgid=4&step=3&dlg=1&a1628343864=1641941024&a1628345572=1628346909&a1628577303=1628578003&css=1")
        .setName("Appointment Monitor Error")
        .setTitle("Error checking Appointments")
        .setColor("#6bde87")
        .setAvatar("https://d25bw6vpcxy1uk.cloudfront.net/media/image/71/b6/e3/pscho-doctor-xxl-spritze-35cm-1_600x600@2x.webp")
        .addField("Error", error)
        .setImage("https://cdn.discordapp.com/attachments/229625226189733898/837453855536840734/image0.jpg")
        .setFooter(`Terminland monitor`)

    webhook.send(msg);
}

module.exports = {
    notify,
    error
}