const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function optimizeImageFromUrl({
  imageUrl,
  outputDir,
  filename,
  type = "image",
}) {
  ensureDir(outputDir);

  const outputPath = path.join(outputDir, filename);

  const response = await fetch(imageUrl, {
    headers: {
      "User-Agent": "portfolio-backend",
    },
  });

  if (!response.ok) {
    throw new Error(`Impossible de télécharger l'image : ${imageUrl}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  const resizeOptions =
    type === "logo"
      ? {
          width: 100,
          height: 100,
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        }
      : {
          width: 1400,
          height: 850,
          fit: "contain",
          background: "#f4ece6",
        };

  await sharp(buffer)
    .resize(resizeOptions)
    .webp({
      quality: type === "logo" ? 82 : 72,
      effort: 6,
    })
    .toFile(outputPath);

  return outputPath;
}

module.exports = {
  optimizeImageFromUrl,
};