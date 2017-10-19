

$(document).ready(function () {


    $("button").click(function () {

        var playerNumber = $(".player-number-textbox-input").val();
        //alert(playerNumber);
        
        $.ajax({
            url: "Home/GetPlayerInformation",
            data: { PlayerNumber: playerNumber },
            success: function (data) {
                var player = JSON.parse(data);
                $(".output").text(player.PlayerName);

            }
        });

       // $.get("HomeController/GetPlayerInformation", { PlayerNumber: playerNumber }, function (data) { alert(data);})
        
    });

});