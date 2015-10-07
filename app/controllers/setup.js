var os = require('os');
var remote = require('remote');
var dialog = remote.require('dialog');
var app = remote.require('app');
var jetpack = require('fs-jetpack');
var Mustache = require('mustache');
window.jQuery = window.$ = require('jquery');
window.Hammer = require('hammerjs');

import { project } from './project';
import { setupLoader } from './setupLoader';

export const setup = {

    template: $('#setup').html(),

    name: localStorage.getItem('name'),

    render: function() {

        $('#target').html(Mustache.render(this.template));

        !navigator.onLine ? this.offlineChecker() :
            this.name ?  this.sayHello() : this.termsModal();

        $('#setupContainer').delay(500).fadeIn(1000);
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
                if($('#firstName').val() !== '') {
                    $('#nameModal').closeModal();
                    localStorage.setItem('name', $('#firstName').val());
                    this.sayHello();
                }
            });

        $('#selectFolder').on('click', () => {
            setup.setProjectFolder();
            this.setManagerFiles();
            this.start();
        });

        $('#firstName').on('keypress', (e) => {
            if(e.which === 13) {
                e.preventDefault();
                if($('#firstName').val() !== '') {
                    $('#nameModal').closeModal();
                    localStorage.setItem('name', $('#firstName').val());
                    this.sayHello();
                }
            }
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
                    hour >= 17 ? 'evening' : 'job';

            const msg = name => `Hello ${name}, good ${greeting}! `;

            Materialize.toast(msg(localStorage.getItem('name')), 1500, 'black-text white');

        }, 1000);

    },

    setProjectFolder: function(){
        project.projectDir = dialog.showOpenDialog(
            { properties: ['openDirectory'] }
        )[0];
    },

    setManagerFiles: function(){
        project.npm.file = jetpack.read(project.projectDir + '/package.json', 'json');
        project.bower = jetpack.read(project.projectDir + '/bower.json', 'json');
        project.composer = jetpack.read(project.projectDir + '/composer.json', 'json');
    },

    checkManagerFiles: function(){
        return !!(project.npm || project.bower || project.composer);
    },

    start: function(){

        this.checkManagerFiles() ? this.goToSetupLoader() :
            this.noManagerFilesModal();

    },

    goToSetupLoader: function(){

        $('#setupContainer').fadeOut(500, () => {
            setupLoader.render();
        });

    }

};
