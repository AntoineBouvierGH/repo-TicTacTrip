# repo-TicTacTrip

## installation

to use this API, juste open a terminal and type npm install.

This will install all the dependencies.

Then, type npm start to start the API.

It will listen on port:8080.


## USAGE

First you have to register bye giving yout email address on the route: http://localhost:8080/api/token with POST.
and

body:
{
    "email": "example@myEmail.com"
}

it will give you a token:

then use the route: http://localhost:8080/api/justify with POST.
put a text and the token in the body like so:
{
    "token": "5iWPQ7Mn1L4as3iVFCd0yH968ES6fjYtNTFkI8XWQZl",
    "textToJustify": "Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux[etc...]"
}

it will return you a justified text
