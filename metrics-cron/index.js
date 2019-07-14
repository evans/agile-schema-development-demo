const cron = require("node-cron");
const { run } = require("artillery");

cron.schedule("* * * * *", () => {
  console.log("running a task every minute");
  run("android-workload.yml", {});
  run("ios-workload.yml", {});
});
const port = process.env.PORT || "4000";
// run("ios-workload.yml", { variables: JSON.stringify({ port }) });

//keep heroku happy by binding to port
const http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World!');
  res.end();
}).listen(port);
