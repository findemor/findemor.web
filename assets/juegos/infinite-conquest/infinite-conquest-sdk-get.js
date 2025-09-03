$(document).ready(function() {

    let code = "pQcT2VXXXXXXXXXXXSTORAGETOKENXXXXXXXXX";
    let top = "100"

    var urlParams = new URLSearchParams(window.location.search);
    let uuid = urlParams.get('uuid');

    let uuidParam = uuid ? `&uuid=${ uuid }` : ""

    $.ajax({
        url: `https://infinite-conquest-api.azurewebsites.net/api/scoreboard-get?code=${ code }&top=${ top }${ uuidParam}`
    }).then(function(data) {

        let parsed = JSON.parse(data);
        let found = false;

        console.log(parsed.ranking);

        function writeEncodedForSafety(message) {
            var encodedMsg = $('<div />').text(message).html();
            return encodedMsg;//element.html(encodedMsg);
        }

        function formatDate(strd) {
            let d = new Date(strd);
            return `${ d.getMonth() }/${ d.getFullYear() }`;
        }

        function appendRow(item, index) {
            $('#scoreboard_table > tbody').append(buildRow(
            index + 1,
            {
                uuid: item.uuid,
                nick: item.nick,
                twitter: item.twitter,
                score: item.score,
                level: item.level,
                coins: item.coins,
                wasted: item.wasted,
                date: formatDate(item.timestamp)
            }));
        }

        function buildRow(i, item) {
            
            let c = "";
            console.log(`[${ item.uuid}] [${ uuid }] == ${ (item.uuid == uuid) }`);
            if (uuid && item.uuid == uuid) {
                found = true;
                c = "class=\"highlight\"";
            };

            let king = writeEncodedForSafety(item.nick);
            if (item.twitter) {
                king = `<a href="https://www.twitter.com/${ writeEncodedForSafety(item.twitter) }" target="_blank">${ king  }</a>`;
            }

            $('#scoreboard_table > tbody').append(`<tr ${c}>
                <th>${ i }</th>
                <th scope="row" class="crow">${ king }</th>
                <th>${ item.score }</th>
                <th>${ item.level }</th>
                <th>${ item.coins }</th>
                <th>${ item.wasted }</th>
                <th>${ item.date }</th></tr>`);
        }

        $('p.loadinggif').remove()

        parsed.ranking.forEach(appendRow);


        if (!found && parsed.udata) {
            //console.log(`found ${ found} parsed.udata.uuid [${ parsed.udata.uuid }] param [${ uuid }]`);
            $('#scoreboard_table > tbody').append(buildRow("", { nick: "...", score: "...", level: "...", coins: "...", wasted: "...", date: "..." }));
            $('#scoreboard_table > tbody').append(buildRow("", { nick: parsed.udata.nick, twitter: parsed.udata.twitter, score: parsed.udata.score, level: parsed.udata.level, 
                coins: parsed.udata.coins, wasted: parsed.udata.wasted, uuid: parsed.udata.uuid, date: formatDate(parsed.udata.timestamp) }));
        }

    });
});

/*

ranking
<th>item.nick</th>
<th>item.score</th>
<th>item.level</th>
<th>item.coins</th>
<th>item.wasted</th>
<th>item.timestamp</th>

*/