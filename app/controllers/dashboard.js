var Mustache = require('mustache');
var npm = require('npm');
var Q = require('q');

window.jQuery = window.$ = require('jquery');
window.Hammer = require('hammerjs');

import { project } from './project';

export const dashboard = {

    template: $('#dashboard').html(),

    render: function() {
        $('#target').html(Mustache.render(this.template, this.view()));
        $('#dashboardContainer').fadeIn(1000);
        $('.collapsible').collapsible();
    },

    view: function(){

        return null;

        let view = {
            dependenciesShow:[],
            devDependenciesShow:[]
        };

        // TODO: Change array to JSON
        $.each(project.npm.dependenciesShow, (key, value) => {
            $.each(value, (k, v) => {
                view.dependenciesShow.push(v);
            });
        });

        $.each(project.npm.devDependenciesShow, (key, value) => {
            $.each(value, (k, v) => {
                view.devDependenciesShow.push(v);
            });
        });

        return view;

    }

};