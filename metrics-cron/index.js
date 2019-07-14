const cron = require("node-cron");
const { run } = require("artillery");

cron.schedule("* * * * *", () => {
  console.log("running a task every minute");
  run("android-workload.yml", {});
  run("ios-workload.yml", {});
});
// const port = process.env.PORT || "4000";
// run("ios-workload.yml", { variables: JSON.stringify({ port }) });
