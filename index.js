const { chromium } = require("playwright");
const { PlaywrightBlocker } = require("@cliqz/adblocker-playwright");
const fetch = require("cross-fetch");
const cookies = require("./cookies.json");
const { Client } = require("earnapp.js");
const baseURL = "https://earnapp.com/dashboard";

const log = (msg, type) => {
    let symbol = " ";
    switch (type) {
        case "warn":
            symbol = "!";
            break;
        case "success":
            symbol = "+";
            break;
        case "info":
            symbol = "?";
            break;
    }
    console.log(`[ ${symbol} ] ${msg}`);
};

const bot = async (cookie) => {
    const client = new Client();

    client.login({
        authMethod: "google",
        oauthRefreshToken: cookie,
    });

    let user = {};

    try {
        user = await client.userData();
    } catch {}

    if (!user.email) {
        log(`The following cookie is bad:\n${cookie}`, "warn");
        return;
    }

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
        blocker.enableBlockingInPage(page);
    });

    await page.goto(baseURL);

    await page.waitForURL(`${baseURL}/signin?redirect=%2Fdashboard`);

    await context.addCookies([
        {
            name: "auth-method",
            value: "google",
            domain: "earnapp.com",
            path: "/dashboard",
        },
        {
            name: "oauth-refresh-token",
            value: cookie,
            domain: "earnapp.com",
            path: "/dashboard",
        },
    ]);

    log(`[ ${user.email} ] Cookie injected!`, "success");

    await page.goto(baseURL);

    await page.waitForResponse(/https:\/\/earnapp\.com\/dashboard\/api\/.+/g);

    const cookies = await context.cookies();

    let check = 0;

    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].name === "oauth-token") check++;
    }

    if (check > 0) log(`[ ${user.email} ] Login successful!`, "success");
};

if (cookies.length < 1) {
    log("No cookie provided! Check your cookies.json", "warn");
} else {
    for (let i = 0; i < cookies.length; i++) {
        bot(cookies[i]);
    }
}
