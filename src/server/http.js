import Hapi from 'hapi';
import Path from 'path';
import Pug from 'pug';
import Inert from 'inert';
import Vision from 'vision';
import Route from './routes'

const server = new Hapi.Server({
    connections:{
        routes:{
            files: {
                relativeTo:Path.join(__dirname,'../../public')
            }
        }
    }
});
const supervisor = server.connection({host: '0.0.0.0', port: 8000, labels:['supervisor']});
const display = server.connection({host: '0.0.0.0', port: 8001, labels:['display']});
const admin = server.connection({host: '0.0.0.0', port: 8002, labels:['admin']});

server.register([{register:Inert},{register:Vision}], function (error) {
    if (error) console.log(error)

    Route.supervisor.map(route => supervisor.route(route));
    Route.display.map(route => display.route(route));
    Route.admin.map(route => admin.route(route));

    server.views({
        engines: {
            pug: Pug
        },
        path: Path.join(__dirname, '../../templates'),
        layout: false
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        config: {
            auth: false
        },
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true
            }
        }
    });
    server.start(function () {
        console.log('Server starting with connections length : ' + server.connections.length);
    });
});

