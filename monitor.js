const request = require("request")
const cheerio = require("cheerio")

const logger = require("./utils/logger")
const discord = require("./utils/discord")

var headers = {
    'Host': 'www.terminland.de',
    'Cache-Control': 'max-age=0',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
    'sec-ch-ua-mobile': '?0',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-User': '?1',
    'Sec-Fetch-Dest': 'document',
    'Accept-Language': 'en-US,en;q=0.9,de-DE;q=0.8,de;q=0.7',
};

function monitor() {
    var finished = false;
    return new Promise(async (resolve, reject) => {
        function get() {
            return new Promise((resolve, reject) => {
                request.get({ url: "https://www.terminland.de/Impfzentrum-Lippe/default.aspx?m=35258&ll=SE5TF&dpp=0&dlgid=4&step=3&dlg=1&a1628343864=1641941024&a1628345572=1628346909&a1628577303=1628578003&css=1", headers: headers }, async (err, res, body) => {
                    if (err) {
                        console.log("err")
                    }

                    let response = checkSite(res.body)

                    switch (response) {
                        case "unavailable":
                            logger.status("Appointments unavailable")

                            return reject()

                        case "live":
                            logger.success("Appointments live, notifying")

                            return resolve()

                        default:
                            discord.error(response)

                            await timeout(20000)

                            return reject()
                    }
                })
            })
        }
        while (!finished) {
            await get().then(() => {
                finished = true;

                return resolve()
            }).catch(async () => {
                await timeout(10000)
            })
        }
    })
}

function checkSite(html) {
    try {
        //let $ = cheerio.load(html)

        //let unavailable = $("#fsHinweis > div.panel-body > b:nth-child(10) > span")

        if (html && html.includes("Schauen Sie gerne zu einem sp??teren Zeitpunkt nocheinmal vorbei")) {
            return "unavailable";
        } return "live";
    } catch (error) {
        console.log(error)
        return error
    }
}

function timeout(ms) {
    return new Promise(resolve => {
        setTimeout(function () { resolve() }, ms);
    })
}

async function run() {
    await monitor()

    discord.notify()

    logger.status("Monitor finished")
}

run()
