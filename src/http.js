const Hapi = require('hapi');
const Path = require('path');
const Pug = require('pug');
const Inert = require('inert');
const Vision = require('vision')

const server = new Hapi.Server({
    connections:{
        routes:{
            files: {
                relativeTo:Path.join(__dirname,'../public')
            }
        }
    }
});
server.connection({
    host: '0.0.0.0',
    port: 8000
});
server.register([{register:Inert},{register:Vision}], function (error) {
    if (error) console.log(error)

    server.views({
        engines: {
            pug: Pug
        },
        path: Path.join(__dirname, '../templates'),
        layout: false
    });

    server.route({
        method:'get',
        path:'/',
        handler:function (request, reply) {
            reply.view("index")
        }
    })
    server.route({
        method:'get',
        path:'/test',
        handler:function (request, reply) {
            reply.view("index")
        }
    })
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
    server.route({
        method:'get',
        path:'/d',
        handler:function (request, reply) {
            reply({name:'dongk'})
        }
    })
    server.start(function () {
        console.log('Hello, hapi server is running in ' + server.info.uri);
    });
});

