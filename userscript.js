// ==UserScript==
// @name         Krunker.io hacks - by lebgbn.
// @version      1.1
// @author       lebgbn
// @include      /^https://krunker.io/docs/terms.txt/
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @namespace gpy
// ==/UserScript==

window.stop();
document.innerHTML = "";
const version = '1.1';
GM_xmlhttpRequest({
    method: "GET",
    url: document.location.origin,
    onload: res => {
        let html = res.responseText;
        html = html.replace(/game\.[^\.]+\.js/, '____.js');
        html = html.replace(/<script (type="text\/javascript"\s)?data-cfasync(.|\s)*?<\/script>/, ``);
        GM_xmlhttpRequest({
            method: "GET",
            url: document.location.origin + '/libs/zip.js',
            onload: res => {
                let zip = res.responseText;
                zip = zip.replace(/setInterval.*?\);/, '');
                html = html.replace(/<script src="libs\/zip\.js.+"><\/script>/, `<script>${zip}</script>`);
                html += '<script src="https://raw.githack.com/gpy-dev/krunker/master/bypass.js"></script>';
                html += '<script src="https://raw.githack.com/gpy-dev/krunker/master/haxy.js"></script>';
                html += '<script src="https://raw.githack.com/gpy-dev/krunker/master/game.js"></script>';

                document.open();
                document.write(html);
                document.close();
            }
        })
    }
})
