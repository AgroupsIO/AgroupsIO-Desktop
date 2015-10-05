var Mustache = require('mustache');
window.jQuery = window.$ = require('jquery');
window.Hammer = require('hammerjs');

export const setupLoader = {

    template: $('#setupLoader').html(),

    render: function() {

        $('#target').html(Mustache.render(this.template));

        $('#setupLoaderContainer').fadeIn(1000);

        this.load();

    },

    load: function() {



    },

    increment: function(number){
        $('#setupLoaderProgress').width(number + '%');
    },

    text: function(text){
        $('#loaderText').html(text);
    }

};