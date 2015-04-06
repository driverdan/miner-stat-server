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

It is strongly recommended to use a process manager like [PM2](https://github.com/Unitech/pm2) to run this.
