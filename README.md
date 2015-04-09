# miner-stat-server

Miner-stat-server is a simple app for monitoring instances of cgminer /
sgminer. It provides you with (near) real time stats of each instance.

## Setup

The following config vars should be set. Env vars are preferred but they can also be saved as config.json.

* PORT: Port to run the server on.
* COOKIE_SECRET: Secret to use for cookies

### Clients

Each client needs to run [miner-broadcast](https://github.com/driverdan/miner-broadcast). This will report stats to this server every five seconds.

## Running

Use `npm build` to build the front end JS. `npm watch` can be used during
development to watch for changes.

`npm start` is used to run the server.

It is strongly recommended to use a process manager like [PM2](https://github.com/Unitech/pm2) to run this.

## Testing

Run a fake test miner with `node test/miner.js`.
