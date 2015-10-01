// Here is the starting point for code of your own application.
// All stuff below is just to show you how it works. You can delete all of it.

// Modules which you authored in this project are intended to be
// imported through new ES6 syntax.
import { greet } from './hello_world/hello_world';

// Node.js modules and those from npm
// are required the same way as always.
var os = require('os');

var jetpack = require('fs-jetpack');
var Mustache = require('mustache');
window.jQuery = window.$ = require('jquery');
window.Hammer = require('hammerjs');

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
var manifest = jetpack.read('package.json', 'json');
console.log(manifest);

document.addEventListener('DOMContentLoaded', function() {

    var template = $('#template').html();
    Mustache.parse(template);

    var view = {
        greet: greet(),
        platform: os.platform(),
        envName: null
    };

    var rendered = Mustache.render(template, view);
    $('#target').html(rendered);

    Materialize.toast('I am a toast!', 4000);

});