import httpProxy from 'http-proxy';

const proxyServer = httpProxy.createProxyServer({});

proxyServer.on('proxyReq', (proxyReq, req) => {
  if (req.user) {
    proxyReq.setHeader('X-Proxy-User-Header', JSON.stringify(req.user));
  }
});

export default function proxy(target) {
  return (req, res, next) => proxyServer.web(req, res, { target }, err => {
    next(err);
  });
}
