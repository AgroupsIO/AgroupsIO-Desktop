var Mustache = require('mustache');
var npm = require('npm');
var Q = require('q');
var shell = require('shell');

window.jQuery = window.$ = require('jquery');
window.Hammer = require('hammerjs');

import { project } from './project';

export const dashboard = {

    template: $('#dashboard').html(),

    render: function() {
        $('#target').html(Mustache.render(this.template, this.view()));
        $('#dashboardContainer').fadeIn(1000);
        $('.collapsible').collapsible();
        this.bindEvents();
    },

    view: function(){

        let view = {
            dependenciesShow:[],
            dependenciesShowLength: 0,
            devDependenciesShow:[],
            devDependenciesShowLength: 0
        };

        // TODO: Change array to JSON
        $.each(project.npm.dependenciesShow, (key, value) => {
            $.each(value, (k, v) => {
                view.dependenciesShow.push(v);
            });
        });
        view.dependenciesShowLength = view.dependenciesShow.length;

        $.each(project.npm.devDependenciesShow, (key, value) => {
            $.each(value, (k, v) => {
                view.devDependenciesShow.push(v);
            });
        });
        view.devDependenciesShowLength = view.devDependenciesShow.length;

        return view;

    },

    bindEvents: function(){

        $('#titleHeader').on('click', () => location.reload());

        $('.external-link').on('click', (e) => {

            e.preventDefault();

            const url = e.currentTarget.href.replace(
                'git+', '').replace(
                'git:', 'https:').replace(
                'ssh:', 'https:');
            
            shell.openExternal(url);
            console.log(url);
        });

    }

};