const fs = require("fs");
const path = require("path");

const htmlFiles = fs.readdirSync(".").filter(file => file.endsWith(".html"));

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, "utf8");

  content = content.replace(/\.jpg/g, ".webp");
  content = content.replace(/\.png/g, ".webp");
  content = content.replace(/\.jpeg/g, ".webp");

  fs.writeFileSync(file, content);

  console.log("Updated:", file);
});