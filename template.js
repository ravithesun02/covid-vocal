export default ({markup,css})=>{
    return `<!doctype html>
    <html lang="en">
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
        name="description"
        content="Pucho Vocal by pucho.ai"
    />
    <meta http-equiv="Content-Security-Policy" />
     <link rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet">
    <title>Pucho Vocal</title>
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