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

$(document).ready(() => {

    setup.render();
    !navigator.onLine ? setup.offlineModal() : null;

});

let project = {
    projectDir: null,
    npm: null,
    bower: null,
    composer: null,
    start: function(){

        this.checkManagerFiles() ? alert('Have same manager files !') :
            setup.noManagerFilesModal();

    },
    checkManagerFiles: function(){
        return !!(this.npm || this.bower || this.composer);
    }
};

const setup = {

    template: $('#setup').html(),

    name: localStorage.getItem('name'),

    render: function() {

        $('#target').html(Mustache.render(this.template));

        !navigator.onLine ? this.offlineChecker() :
            this.name ?  this.sayHello() : this.termsModal();

        $('#container').delay(500).fadeIn(1000);
        this.bindEvents();

    },

    bindEvents: function() {

        $('#btnDisagree').on('click', () => app.quit());

        $('#btnAgree').on('click',
            () => {
                $('#agreeModal').closeModal();
                this.nameModal();
            });

        $('#btnContinue').on('click',
            () => {
                $('#nameModal').closeModal();
                localStorage.setItem('name', $('#firstName').val());
                this.sayHello();
            });

        $('#selectFolder').on('click', () => {
            setup.setProjectFolder();
            this.setManagerFiles();
            project.start();
        });

    },

    termsModal: function () {
        $('#agreeModal').openModal({
            dismissible: false
        });
    },

    nameModal: function() {
        $('#nameModal').openModal({
            dismissible: false
        });
    },

    offlineChecker: function(){

        $('#offline').openModal({
            dismissible: false
        });

        const check = setInterval(() => {
            console.log('Checking');
            if(navigator.onLine){
                $('#offline').closeModal();
                this.render();
                clearInterval(check);
            }
        }, 1000);

    },

    noManagerFilesModal: function(){
        $('#noManagerFiles').openModal();
    },

    sayHello: function() {

        setTimeout(() => {

            const now = new Date();
            const hour = now.getHours();
            const greeting = hour < 12 ? 'morning' :
                hour >= 12 && hour <= 17 ? 'afternoon' :
                    hour >= 12 && hour <= 17 ? 'evening' : 'job';

            const msg = name => `Hello ${name}, good ${greeting}! `;

            Materialize.toast(msg(localStorage.getItem('name')), 2000, 'black-text white');

        }, 1000);

    },

    setProjectFolder: function(){
        project.projectDir = dialog.showOpenDialog(
            { properties: ['openDirectory'] }
        )[0];
    },

    setManagerFiles: function(){
        project.npm = jetpack.read(project.projectDir + '/package.json', 'json');
        project.bower = jetpack.read(project.projectDir + '/bower.json', 'json');
        project.composer = jetpack.read(project.projectDir + '/composer.json', 'json');
    }

};