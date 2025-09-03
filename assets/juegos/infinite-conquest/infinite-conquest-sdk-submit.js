$(document).ready(function() {

    var urlParams = new URLSearchParams(window.location.search);
    let mjwt = urlParams.get('mjwt');

    /*$("button[id='submit']").click(function(e){
        submitForm(e);
    });*/

    
    //$("nav").remove();
    //$("footer").remove();
    //$("div.pt-5").remove();
    //$("p.post-metadata.text-muted").remove();
 
    $("nav").css("display", "none");
    $("footer").css("display", "none");
    $("div.pt-5").css("display", "none");
    $("p.post-metadata.text-muted").css("display", "none");

    if (isEmpty(mjwt)) {
        $("#displayError").css("display", "block");
    }else {
        $("#displayError").css("display", "none");
    }

    $("#submit").click(submitForm);
    $('#submit').attr('disabled' , false);
    

    function isEmpty(val){
        return (val === undefined || val == null || val.length <= 0) ? true : false;
    }

    function putData(mjwt, nick, twitter, callback) {

        let code = "lMfZO5wtqhXXXXXXXXXXXXSTORAGETOKENXXXXXX";
        let qpnick = encodeURIComponent(nick);
        let qptwitter = isEmpty(twitter) ? "" : "&twitter="+encodeURIComponent(twitter);
        
        $.ajax({
            url: `https://infinite-conquest-api.azurewebsites.net/api/scoreboard-put?code=${ code }&mjwt=${ mjwt }&nick=${ qpnick }${ qptwitter }`
        }).then(function(data) {
            console.log(data);
        })
        .done(function (data) {
            callback(null, data); })
        .fail(function(err) {
            callback(err, null);
        });
    }

        
    
    function processForm(callback)
    {
        try {
            $('#submit').attr('disabled' , true);
            $("#displayError").css("display", "none");
            let nick = $("#nick").val().trim();
            let twitter = $("#twitter").val().trim();
            let uuid = JSON.parse(atob(mjwt.split('.')[0])).uuid;

            if (twitter.startsWith("@")) {
                twitter = twitter.substring(1,twitter.length);
            }

            if (isEmpty(nick)) {
                console.log(`uuid=${uuid}, mjwt=${mjwt}, nick=${nick}, twitter=${twitter}`);
                callback("nick param is null");
            } else if (isEmpty(uuid) || isEmpty(mjwt)) {
                console.log(`uuid=${uuid}, mjwt=${mjwt}, nick=${nick}, twitter=${twitter}`);
                $("#displayError").css("display", "block");
                callback("mandatory param is null");
            } else {
                //console.log("submit form");
                putData(mjwt, nick, twitter, (err, data) => {
                    if (err) {
                        console.log(err);
                        $("#displayError").css("display", "block");
                        callback(err);
                    } else {
                        //vamos al scoreboard
                        callback(null, { uuid });
                    }
                });
                return false;
            }
        } catch (err)
        {
            console.log("err: " + err);
            callback(err);
        }
    }

    function submitForm() {
        $('#submit').attr('disabled' , true);
        processForm((err, data) => {
            $('#submit').attr('disabled' , false);
            if (!err) {
                window.location.href = `https://games.findemor.es/game/infinite-conquest-scoreboard?uuid=${data.uuid}`;
            }
        });
        return false;
    }

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