export default ({markup,css})=>{
    return `<!doctype html>
    <html lang="en">
    <head>
    <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet">
    <title>MERN Kickstart</title>
    </head>
    <body>
    <div id="root">
    ${markup}
    </div>
    <style id="jss-server-side">${css}</style>
    <script type="text/javascript" src="/public/bundle.js">
    </script>
    </body>
    </html>`
}