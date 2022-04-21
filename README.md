# EarnApp no refresh token login

[![playwright](https://img.shields.io/github/package-json/dependency-version/LockBlock-dev/earnapp-cookie-login/playwright)](https://www.npmjs.com/package/playwright) [![earnapp.js](https://img.shields.io/github/package-json/dependency-version/LockBlock-dev/earnapp-cookie-login/earnapp.js)](https://www.npmjs.com/package/earnapp.js)

[![GitHub stars](https://img.shields.io/github/stars/LockBlock-dev/earnapp-cookie-login.svg)](https://github.com/LockBlock-dev/earnapp-cookie-login/stargazers)

Login to your EarnApp accounts with a cookie and not with Google to keep the same cookie.

## Installation

-   Install [NodeJS](https://nodejs.org).
-   Download or clone the project.
-   Run `install.bat` OR run `npm install`.
-   In [cookies.json](./cookies.json), you need to add your cookies:

```json
["COOKIE 1", "COOKIE 2"]
```

-   Run `start.bat` OR `node index.js` OR `npm start`.

## How does it work

It starts an automated chrome browser for each of your accounts. It injects your cookie into earnapp page and allows you to see your dashboard without the need to login.

## Credits

[EarnApp](https://earnapp.com)

## Copyright

See the [license](/LICENSE)
