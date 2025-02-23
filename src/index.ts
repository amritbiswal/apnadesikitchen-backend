import { Server } from './server';

let server = new Server().app;
let port = parseInt(process.env.PORT) || 3000;
process.env.TZ = 'Europe/Amsterdam';
// process.env.TZ = "Asia/Calcutta";
const hostname = process.env.HOSTNAME || 'localhost';

server.listen(port, hostname, () => {
    console.log(`Server is running at port ${port}`);
});



