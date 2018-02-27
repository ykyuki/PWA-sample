//servicee worker register

window.addEventListener('load', function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js');
    }
});

//main

var user = new ncmb.User();
var currentUser = ncmb.User.getCurrentUser();
var rendasuu = 0;
$(function () {
    if (currentUser) {
        $("#accountinfo").html('<a href="#" id="logout" class="navbar-link">Logout</a>');
        $("#main").show();
        $("#nologin").hide();
        $("#renda").hide();
        $("#username").html(currentUser.get("userName"));
    } else {
        $("#accountinfo").html('<a href="#" id="login" class="navbar-link">Login / Register</a>');
        $("#main").hide();
        $("#nologin").show();
    }
    $('#login').click(function () {
        $('#loginModal').modal();
    });
    $('#logout').click(function () {
        $.when(
            ncmb.User.logout()
        )
            .done(function () {
                location.reload()
            })
            .fail(function () {
                console.log('error');
            });
    });
    $('#rendabutton').click(function () {
        rendasuu = rendasuu + 1;
    });
    $('#start').click(function () {
        $("#kekka").html('');
        setTimeout(function () {
            $("#renda").show();
            rendasuu = 0;
        }, 1000);
        setTimeout(function () {
            $("#renda").hide();
            $("#kekka").html('<p style="font-size: 50px">結果は' + rendasuu + 'でした</p>');
            var ScoreClass = ncmb.DataStore("HighScore");
            var score = new ScoreClass();
            score.set("name", currentUser.get("userName"));
            score.set("score", rendasuu);
            score.save()
                .then(function () {

                })
                .catch(function (error) {

                });
        }, 10000);
    });
    $('#sousin').click(function () {
        if ($('#sinki').prop('checked')) {
            $("#loginstatus").html('登録処理実行中です');
            user.set("userName", $('#InputUserName').val())
                .set("password", $('#InputPassword').val());
            user.signUpByAccount()
                .then(function () {
                    $("#loginstatus").html('登録に成功しました');
                })
                .catch(function (err) {
                    $("#loginstatus").html('登録に失敗しました。ユーザー名が使用されている・パスワードが入力されていない可能性があります。');
                });
        } else {
            $("#loginstatus").html('ログイン処理実行中です');
            ncmb.User.login($('#InputUserName').val(), $('#InputPassword').val())
                .then(function (data) {
                    $("#loginstatus").html('ログインに成功しました。自動的に再読み込みします。');
                    location.reload();
                })
                .catch(function (err) {
                    $("#loginstatus").html('ログインに失敗しました。ユーザー名やパスワードが間違っていないかご確認ください。');
                });
        }

    });
});