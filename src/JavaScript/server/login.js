let currentUsername = '';
let isLogIn = false;

$(document).ready(function() {
    $(".button-account").on('click', function(){
        if(isLogIn){
            $('#username-account').text(currentUsername);
            $('.account').fadeIn(300);
        }
        else{
            $('.login').fadeIn(300);
        }
    });
    $("#button-signup").on('click', async function(){
        const username = $('#username-login').val();
        const password = $('#password-login').val();
        if(username.length < 3 || password.length < 8){
            if(username.length < 3){
                $('#username-lenght-error').show();
                $('#username-login').val('');
            }
            if(password.length < 8){
                $('#password-lenght-error').show();
                $('#password-login').val('');
            }
        }
        else{
            $('#password-login').val('');
            try {
                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });
                console.log("complete...");
        
                if (response.ok) {
                    const data = await response.json();
                    $('#signup-successful').fadeIn(200);
                } else {
                    const errorData = await response.json();
                    if (errorData.message === 'User already exists') {
                        $('#exist-user').fadeIn(300);
                        $('.login').css({
                            'pointer-events': 'none',
                        });
                        $('#exist-user').css({
                            'pointer-events': 'auto',
                        });
                    }
                }
            } catch (error) {
                console.error("Registration error", error);
            }
        }
    });
    $("#button-login").on('click', async function(){
        const username = $('#username-login').val();
        const password = $('#password-login').val();
        if(username.length < 3 || password.length < 8){
            if(username.length < 3){
                $('#username-lenght-error').show();
                $('#username-login').val('');
            }
            if(password.length < 8){
                $('#password-lenght-error').show();
                $('#password-login').val('');
            }
        }
        else{
            $('#password-login').val('');
            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });
                if (response.ok) {      
                    const structuresResponse = await fetch(`http://localhost:3000/getStructureNames/${username}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
    
                    if (structuresResponse.ok) {
                        const structureNames = await structuresResponse.json();
                        structureNames.forEach(function(structureName) {
                            var li = $('<li>')
                                .addClass('loadItem')
                                .appendTo('.loadList');
                            var div = $('<div>')
                                .addClass('div-load-window');
                            var text = $('<a>').text(structureName);
                            div.append(text);
                            li.append(div);                         
                        });
                    } else {
                        const errorData = await structuresResponse.json();
                        console.error("Ошибка при получении названий структур: ", errorData.message);
                    }

                    $('#login-successful').fadeIn(200);
                    $('#username-show').text(username);
                    $('#login-undefined').fadeOut(200);
                    currentUsername = username;
                    console.log(currentUsername);
                    isLogIn = true;
                } else {
                    $('#error-password').fadeIn(200);
                }
            } catch (error) {
                console.error("Ошибка аутентификации", error);
            }
        }
    });

    $('#username-login').on('input', function() {
        if ($(this).val().trim().length > 0) {
            $('#username-lenght-error').hide();
        }
    });
    $('#password-login').on('input', function() {
        if ($(this).val().trim().length > 0) {
            $('#password-lenght-error').hide();
        }
    });

    $('#button-exist-ok').on('click', function(){
        $('#exist-user').fadeOut(200);
        $('.login').css({
            'pointer-events': 'auto',
        });       
    });
    $('#button-login-successful-ok').on('click', function(){
        $('.login').fadeOut(200);
        $('#login-successful').fadeOut(200);
        $('#username-account').text(currentUsername);
    });
    $('#button-error-password-ok').on('click', function(){
        $("#error-password").fadeOut(200);
        $('.login').css({
            'pointer-events': 'auto',
        });
    });
    $("#button-close").on('click', function(){
        $('#password-login').val('');
        $('.login').fadeOut(300);
    });
    $("#button-close-account").on('click', function(){
        $('.account').fadeOut(300);
    });
    $('#button-signup-successful-ok').on('click', function(){
        $('#signup-successful').fadeOut(200);
    });

    $('.button-sign-out').on('click', async function(){
        try {
            const response = await fetch('http://localhost:3000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                currentUsername = '';
                $('.loadList').empty();
                $('#username-show').text('Log in');
                $('.account').fadeOut(200);
                $('.login').fadeIn(200);
                $('#login-undefined').fadeIn(200);
                isLogIn = false;
            }
        } catch (error) {
            console.error("Ошибка выхода из аккаунта", error);
        }
    });
});