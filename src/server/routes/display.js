import {routeConnector} from './utils'

const displayRoutes = [];

const handle = (request, reply) => {
    reply.view('display/index')
}

routeConnector(displayRoutes, "GET", "/", handle)
routeConnector(displayRoutes, "GET", "/dongk", handle)

export default displayRoutes