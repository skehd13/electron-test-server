import {routeConnector} from './utils'

const supervisorRoutes = [];

const handle = (request, reply) => {
    reply.view('supervisor/index')
}

routeConnector(supervisorRoutes, "GET", "/", handle)
routeConnector(supervisorRoutes, "GET", "/dongk", handle)

export default supervisorRoutes