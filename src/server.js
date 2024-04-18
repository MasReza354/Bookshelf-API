import Hapi from '@hapi/hapi'; // Import modul Hapi dari package '@hapi/hapi'.
import { routes as bookRoutes } from './routes/routes.js'; // Import fungsi routes dari file './routes/routes.js'.

const config = {
  port: 9000,
  host: 'localhost',
};

const init = async (c) => {
  const server = Hapi.server({
    port: c.port,
    host: c.host,
    routes: {
      cors: {
        origin: ['*'], // Mengaktifkan CORS untuk semua rute
      },
    },
  });

  server.route(bookRoutes); // Menambahkan rute bookRoutes ke server

  await server.start(); // Menjalankan server
  console.log(`Server running at ${server.info.uri}`);

  return server;
};

init(config);
