import { project } from './controllers/project';
import { setup } from './controllers/setup';
import { setupLoader } from './controllers/setupLoader';

$(document).ready(() => {

    setup.render();
    !navigator.onLine ? setup.offlineModal() : null;

});