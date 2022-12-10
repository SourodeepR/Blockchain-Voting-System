const routes = require('next-routes')();

routes
    .add('/admin/adminlogin', '/admin/adminlogin')
    .add('/admin/elections', '/admin/elections')
    .add('/admin/newelection', '/admin/newelection')
    .add('/admin/:address', '/admin/show')
    .add('/voter/:constituency/:aadhar', '/voter/voting')
    .add('/voter/results/:constituency', '/voter/results')
    .add('/other/liveresults', '/other/liveresults')


module.exports = routes;