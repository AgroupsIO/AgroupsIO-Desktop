var Mustache = require('mustache');
var npm = require('npm');
var Q = require('q');

window.jQuery = window.$ = require('jquery');
window.Hammer = require('hammerjs');

import { project } from './project';
import { dashboard } from './dashboard';

export const setupLoader = {

    template: $('#setupLoader').html(),

    render: function() {
        $('#target').html(Mustache.render(this.template));
        $('#setupLoaderContainer').fadeIn(1000);
        this.load();
    },

    load: function() {

        this.loadDependencies().then(() => {
            this.loadDevDependencies().then(() => {
                console.log(project);
                dashboard.render();
            });
        });

    },

    increment: function(number){
        $('#setupLoaderProgress').width(number + '%');
    },

    text: function(text){
        $('#loaderText').html(text);
    },

    // TODO: refactor this with loadDevDependencies
    loadDependencies: function(){

        var deferred = Q.defer();

        if(!project.npm.file.dependencies) {
            deferred.resolve();
            return deferred.promise;
        }

        let totalOfDependencies = Object.keys(
            project.npm.file.dependencies).length;

        npm.load((err) => {

            err ? deferred.reject(new Error(err)) : null;

            $.each(project.npm.file.dependencies, (key, value) => {
                npm.commands.show([`${key}@${value.replace('^', '')}`], (err, data) => {

                    // TODO: Change array to JSON
                    !err ? project.npm.dependenciesShow.push(data) :
                        project.npm.dependenciesShow.push(err);

                });
            });

        });

        var resolve = setInterval(() => {
            this.increment((project.npm.dependenciesShow.length/totalOfDependencies) * 100);
            this.text(`Load <b>NPM</b> dependencies information - ${project.npm.dependenciesShow.length} / ${totalOfDependencies}`);

            if(project.npm.dependenciesShow.length === totalOfDependencies){
                clearInterval(resolve);
                deferred.resolve();
            }
        }, 50);

        return deferred.promise;

    },

    // TODO: refactor this with loadDependencies
    loadDevDependencies: function(){

        var deferred = Q.defer();

        if(!project.npm.file.devDependencies) {
            deferred.resolve();
            return deferred.promise;
        }

        let totalOfDependencies = Object.keys(
            project.npm.file.devDependencies).length;

        totalOfDependencies < 0 ? deferred.resolve() : null;

        npm.load((err) => {

            err ? deferred.reject(new Error(err)) : null;

            $.each(project.npm.file.devDependencies, (key, value) => {
                npm.commands.show([`${key}@${value.replace('^', '')}`],
                    (err, data) => {

                        // TODO: Change array to JSON
                        !err ? project.npm.devDependenciesShow.push(data) :
                            project.npm.devDependenciesShow.push(err);

                    });
            });

        });

        var resolve = setInterval(() => {
            this.increment((project.npm.devDependenciesShow.length/totalOfDependencies) * 100);
            this.text(`Load <b>NPM</b> dev dependencies information - ${project.npm.devDependenciesShow.length} / ${totalOfDependencies}`);

            if(project.npm.devDependenciesShow.length === totalOfDependencies){
                clearInterval(resolve);
                deferred.resolve();
            }
        }, 50);

        return deferred.promise;

    }

};
