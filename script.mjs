import request from "request";
import cheerio from "cheerio";
import chalk from "chalk";

console.log("wait we are fetching data...");
console.log("0% complete");
//! Request
request(
  "https://www.worldometers.info/coronavirus/",
  function (error, response, html) {
    if (error) {
      console.log("error:", error);
    } else if (response && response.statusCode && html) {
      console.log("40% complete");
      extract(html);
    }
  }
);

let total = 0;
let death = 0;
let recover = 0;

//! Extract
function extract(html) {
  const selectorTool = cheerio.load(html);
  const value = selectorTool(".maincounter-number");
  console.log("100% complete");
  for (let i = 0; i < value.length; i++) {
    switch (i) {
      case 0:
        total = selectorTool(value[i]).text();
        break;
      case 1:
        death = selectorTool(value[i]).text();
        break;
      case 2:
        recover = selectorTool(value[i]).text();
        break;
      default:
        break;
    }
  }
  printData();
}

//! Print Data
function printData() {
  console.log(chalk.gray(`\nCase - ${total.trim()}`));
  console.log(chalk.red(`Death - ${death.trim()}`));
  console.log(chalk.green(`Recover - ${recover.trim()}`));
}
