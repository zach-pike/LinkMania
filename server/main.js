const express = require("express")
const path = require("path")
const app = express()

let port = process.env.PORT || 3000

app.get("*", (req, res) => {
    console.log(`[${Date()}]: ${req.originalUrl}`)

    //so that svelte-navigator works properly
    if (!req.originalUrl.includes(".") || req.originalUrl == "/") {
        res.sendFile(path.join(__dirname, "../app/public/index.html"))
    } else {
        res.sendFile(path.join(__dirname, "../app/public", req.originalUrl))
    }
})

if (port == null) {
    console.error("Port not provided")
    process.exit(1)
}

app.use(function (req, res) {
    res.status(404).render('error');
});

app.listen(parseInt(port))
console.log(`App hosted on port: *:${port}`)