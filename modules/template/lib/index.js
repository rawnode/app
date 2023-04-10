module.exports  = () => ({
    model: require('./model'),
    schema: require('./schema'),
    httpController: require('./controllers/http'),
    tcpController: require('./controllers/tcp'),
    tcpRouteApp: require('./routes/tcp/app'),
    tcpRouteIndex: require('./routes/tcp'),
    tcpRouteRoute: require('./routes/tcp/route'),
    tcpRouteTCP: require('./routes/tcp/tcp'),
    tcpRouteWithController: require('./routes/tcp/withController'),
    tcpRouteAppWithController: require('./routes/tcp/appWithController'),
    httpRoute: require('./routes/http'),
    httpRouteWithController: require('./routes/withController'),
})