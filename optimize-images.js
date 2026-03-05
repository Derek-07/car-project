const sharp = require("sharp");
const { glob } = require("glob");

(async () => {

  const files = await glob("assets/**/*.{jpg,jpeg,png}");

  for (const file of files) {

    const newFile = file.replace(/\.(jpg|jpeg|png)/, ".webp");

    await sharp(file)
      .resize({ width: 1600 })
      .webp({ quality: 75 })
      .toFile(newFile);

    console.log("Optimized:", newFile);
  }

})();