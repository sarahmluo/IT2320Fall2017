



$(document).ready(function () {


    $("button").click(function () {

        var playerNumber = $(".player-number-textbox-input").val();
        alert(playerNumber);
        
        $.ajax({
            url: "HomeController/GetPlayerInformation",
            data: { PlayerNumber: playerNumber },
            success: function (data) { alert(data);}
        });

       // $.get("HomeController/GetPlayerInformation", { PlayerNumber: playerNumber }, function (data) { alert(data);})
        
    });

});