if(!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    module.exports = require("./dist/mmc-ui.js")
} else {
    module.exports = require("./dist/mmc-ui.min.js")
}