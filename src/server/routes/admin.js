import {routeConnector} from './utils'

const adminRoutes = [];

const handle = (request, reply) => {
    reply.view('admin/index')
}

routeConnector(adminRoutes, "GET", "/", handle)
routeConnector(adminRoutes, "GET", "/dongk", handle)

export default adminRoutes