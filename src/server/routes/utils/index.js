export const routeConnector = (routes, method, path, handler) => {
    let route = {
        method: method,
        path: path,
        handler: handler
    };
    routes.push(route);
};