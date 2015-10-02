// Here is the starting point for code of your own application.
// All stuff below is just to show you how it works. You can delete all of it.

// Modules which you authored in this project are intended to be
// imported through new ES6 syntax.
import { greet } from './hello_world/hello_world';

// Node.js modules and those from npm
// are required the same way as always.
var os = require('os');
var remote = require('remote');
var dialog = remote.require('dialog');
var app = remote.require('app');

var jetpack = require('fs-jetpack');
var Mustache = require('mustache');
window.jQuery = window.$ = require('jquery');
window.Hammer = require('hammerjs');

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
var manifest = jetpack.read('package.json', 'json');
console.log(manifest);

document.addEventListener('DOMContentLoaded', function() {

    $.get('views/setup.html', function(template) {

        var rendered = Mustache.render(template, {});
        $('#target').html(rendered);

        if(!localStorage.getItem('name'))
        {
            startUp();
        }
        else {
            Materialize.toast(
                'Hi, good morning '+ localStorage.getItem('name') +' !',
                4000,
                'bold black-text white');
        }

        var project_folder = null;
        $('#selectFolder').on('click', function(){
            project_folder = dialog.showOpenDialog(
                { properties: ['openDirectory']
                });

            Materialize.toast(project_folder, 4000);
        });

    });

});

function startUp(){
    $('#agreeModal').openModal({
        dismissible: false
    });

    $('#btnDisagree').on('click', function(){
        app.quit();
    });

    $('#btnAgree').on('click', function(){
        $('#agreeModal').closeModal();
        $('#nameModal').openModal({
            dismissible: false
        });
    });

    $('#btnContinue').on('click', function(){
        $('#nameModal').closeModal();

        localStorage.setItem('name', $('#firstName').val());

        Materialize.toast(
            'Hi, good morning '+ localStorage.getItem('name') +' !',
            4000,
            'bold black-text white');
    });
}