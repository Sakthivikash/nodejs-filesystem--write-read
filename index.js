const express = require("express");
const app = express();
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

app.get("/write", (req, res) => {
  let date = new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth();
  const today = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  const cont = `${year}${month}${today}-${hours}${minutes}${seconds}`;
  let dateNow = `${Date.now()}`;
  console.log(cont);
  const content = `Created the file ${cont}.txt`;
  fs.writeFile(`./backup/${cont}.txt`, dateNow, (err) => {
    fs.appendFile(
      "./backup/FileNames.txt",
      `\n Timestamp inside '${cont}.txt' File:${dateNow}`,
      (err) => console.log(err)
    );
    console.log("Completed writing !!! 👍");
    console.log(content);
    res.send(content);
  });
});

app.get("/read", async (req, res) => {
  fs.readFile("./backup/FileNames.txt", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
