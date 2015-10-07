// This is main process of Electron, started as first thing when the Electron
// app starts, and running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

var app = require('app');
var BrowserWindow = require('browser-window');
var env = require('./lib/electron_boilerplate/env_config');
var devHelper = require('./lib/electron_boilerplate/dev_helper');
var windowStateKeeper = require('./lib/electron_boilerplate/window_state');
var dialog = require('dialog');

var mainWindow;

// Preserver of the window size and position between app launches.
var mainWindowState = windowStateKeeper('main', {
    width: 1000,
    height: 600
});

app.on('ready', function () {

    mainWindow = new BrowserWindow({
        width: mainWindowState.width,
        height: mainWindowState.height,
        center: true,
        resizable: false,
        fullscreen: false
    });

    /*
    if (mainWindowState.isMaximized) {
        mainWindow.maximize();
    }
    */

    if (env.name === 'test') {
        mainWindow.loadUrl('file://' + __dirname + '/spec.html');
    } else {
        mainWindow.loadUrl('file://' + __dirname + '/app.html');
    }

    if (env.name !== 'production') {
        devHelper.setDevMenu();
        //mainWindow.openDevTools();
    }

    mainWindow.on('close', function () {
        mainWindowState.saveState(mainWindow);
    });
});

app.on('window-all-closed', function () {
    app.quit();
});
