$(document).ready(function () {

    $("#createAccountButton").click(function () {

        $(".error").text("");

        var username = $("#createUsername").val();
        var password = $("#createPassword").val();
        var email = $("#createEmail").val();
        var emailCon = $("#createEmailCon").val();

        $.ajax({
            url: "/Home/CreateAccount/",
            data: {
                Username: username,
                Password: password,
                EmailAdd: email,
                EmailCon: emailCon,
            },
            success: function (data) {
                Final.createAccountResponse(data);
            },
            error: function (data) {
                alert("error");
            }
        });
    });

    $("#loginButton").click(function () {

        $(".error").text("");

        var username = $("#username").val();
        var password = $("#password").val();

        $.ajax({
            url: "/Home/Login/",
            data: {
                Username: username,
                Password: password
            },
            success: function (data) {
                Final.login(username, data);
            },
            error: function (data) {
                alert("error");
            }
        });
    }); //end login

   $("#addElement").click(function () {

        $(".error").text("");

        var username = $("#accountName").text();
        var elementName = $("#addElementName").val();
        var elementValue = $("#addElementValue").val();

        $.ajax({
            url: "/Home/AddOrUpdateElement/",
            data: {
                Username: username,
                ElementName: elementName,
                ElementValue: elementValue
            },
            success: function (data) {
                Final.processAddOrUpdate(data);
            },
            error: function (data) {
                alert("Error Adding or Updating Element");
            }
        });

        $("#addElementName").val("");
        $("#addElementValue").val("");
    }); //end update

});


var Final = [];

Final.createAccountResponse = function(data) {

    var response = JSON.parse(data);

    if (response.Message === "Error") {
        if(response.Username === "Invalid"){
            $("#createUsernameError").text("Username must be at least 6 characters");
        }
        else if(response.Username === "Exists"){
            $("#createUsernameError").text("Username is already taken");
        }

        if (response.Password === "Invalid") {
            $("#createPasswordError").text("Password must be at least 6 characters");
        }

        if (response.EmailAdd === "Invalid") {
            $("#createEmailError").text("Please provide a valid email address");
        }

        if (response.EmailCon === "Invalid") {
            $("#createEmailConError").text("Please retype your email address");
        }
        else if (response.EmailCon === "Mismatch") {
            $("#createEmailConError").text("Email addresses do not match");
        }

        $("input[type=password]").val("");
    }
    else if (response.Message === "Success") {
        $("input").val("");
        $("#createEmailConError").text("Account successfully created");
    }
}

Final.login = function (username, data) {
  
    var response = JSON.parse(data);

    if (response.Message === "Error") {
        if (response.Username === "Invalid") {
            $("#usernameError").text("The username you provided was not found");
        }

        if (response.Password === "Wrong") {
            $("#passwordError").text("The password you provided is incorrect");
        }

        $("input[type=password]").val("");
    }
    else if (response.Message === "Success") {
        $("input").val("");
        $("div.notLoggedIn").css("display", "none");
        $("div.loggedIn").css("display", "block");
        Final.getAccountInfo(username);
    }
}

Final.getAccountInfo = function (username) {

    $.ajax({
        url: "/Home/GetAccountInformation/",
        data: {
            Username: username
        },
        success: function (data) {
            Final.displayAccountInfo(data);
        },
        error: function (data, status, ex) {
            alert("error in GetAccountInfo" +status + ex);
        }
    });

}

Final.displayAccountInfo = function (data) {

    var info = JSON.parse(data);

    if (info.Message === "Success") {
        var account = JSON.parse(info.Payload);
        var accountInfo = account.account;

        $("section#accountInfo").html("");

        var row = $("<div class=\"row\" id=\"row0\"></div>");

        $("section#accountInfo").append(row);
        var element1 = $("<div class=\"elementName\">Username</div>");
        $("div.row").append(element1);
        var element2 = $("<div class=\"elementValue\" id=\"accountName\">" + accountInfo.username + "</div>");
        $("div.row").append(element2);
  
        for (key in accountInfo) {
            if (key === "username" || key === "password") {
                continue;
            }
            else {
                row = $("<div class=\"row\" id=\""+ key + "Row\"></div>");
                $("section#accountInfo").append(row);
                element1 = $("<div class=\"elementName\">" + key + "</div>");
                $("div#"+ key +"Row").append(element1);
                element2 = $("<div class=\"elementValue\"><input type=\"text\" id=\"" + key + "Box\" value=\"" + accountInfo[key] + "\" /></div>");
                $("div#" + key + "Row").append(element2);
                element3 = $("<div class=\"elementUpdate\" id=\"" + key + "\">Update</div>");
                $("div#" + key + "Row").append(element3);
                element3.on("click", Final.clickEventUpdateAccountInfo);
            }
        }

    }
    else { //error
        $("#getAccountInfoError").text("Username does not exist");
    }
}

Final.clickEventUpdateAccountInfo = function () {
    $(".error").text("");

    var username = $("#accountName").text();
    var elementName = $(this).attr("id");
    var elementValue = $("#" + elementName + "Box").val();

    $.ajax({
        url: "/Home/AddOrUpdateElement/",
        data: {
            Username: username,
            ElementName: elementName,
            ElementValue: elementValue
        },
        success: function (data) {
            Final.processAddOrUpdate(data);
        },
        error: function (data, status, ex) {
            alert("Error Adding or Updating Element: " + status + " " + ex);
        }
    });

}

Final.processAddOrUpdate = function(data){

    var info = JSON.parse(data);

    if (info.hasOwnProperty("Error")) {
        $("#addAccountInfoError").text(info.Error);
    }
    else {
        Final.displayAccountInfo(data);
    }

}

