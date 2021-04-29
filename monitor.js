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
                request.get({ url: "https://www.terminland.de/Impfzentrum-Lippe/default.aspx?m=35258&ll=SE5TF&dpp=0&dlgid=4&step=3&dlg=1&a1628343864=1641941024&a1628345572=1628346909&a1628577303=1628578003&css=1", headers: headers }, (err, res, body) => {
                    if (err) {
                        console.log("err")
                    }

                    let response = checkSite(res.body)

                    if (response) {
                        logger.status("Appointments unavailable")

                        return reject()
                    } else {
                        logger.success("Appointments live, notifying")

                        return resolve()
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
    let $ = cheerio.load(html)

    let unavailable = $("#fsHinweis > div.panel-body > b:nth-child(10) > span")

    if (unavailable && unavailable.html() != undefined && unavailable.html().includes("späteren Zeitpunkt")) {
        return true;
    } return false;
}

function timeout(ms) {
    return new Promise(resolve => {
        setTimeout(function () { resolve() }, ms);
    })
}

async function run() {
    await monitor()

    discord.notify()
}

run()
