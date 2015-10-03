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

// Globals
window.projectFolder = null;

$(document).ready(() => {

    setup.render();

});

const setup = {

    template: jetpack.read('./app/templates/setup.html'),

    name: localStorage.getItem('name'),
    setName: name => localStorage.setItem('name', name),

    render: function() {
        $('#target').html(Mustache.render(this.template));
        this.name ?  this.hello() : this.firstAcess();
        this.events();
    },

    setProjectFolder: function(){
        projectFolder = dialog.showOpenDialog(
            { properties: ['openDirectory'] }
        );
    },

    events: function() {
        $('#selectFolder').on('click', () => setup.setProjectFolder());
    },

    firstAcess: function () {

        $('#agreeModal').openModal({
            dismissible: false
        });

        $('#btnDisagree').on('click', () => app.quit());

        $('#btnAgree').on('click',
            () => {
                $('#agreeModal').closeModal();
                $('#nameModal').openModal({
                    dismissible: false
                });
            });

        $('#btnContinue').on('click',
            () => {
                $('#nameModal').closeModal();
                this.setName($('#firstName').val());
                this.hello();
            });
    },

    hello: function() {

        const msg = name => `Hello ${name}, good morning !`;
        Materialize.toast(
            msg(this.name),
            4000,
            'bold black-text white');

    }
};