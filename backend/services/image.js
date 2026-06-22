const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

function createImageFilename(baseName, updatedAt) {
  const cleanName = baseName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  const version = new Date(updatedAt).getTime();

  return `${cleanName}-${version}.webp`;
}

async function optimizeGithubImage(imageUrl, baseName, updatedAt, type = "image") {
  const imagesDir = path.resolve(__dirname, "../images");

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const finalFilename = createImageFilename(baseName, updatedAt);
  const outputPath = path.join(imagesDir, finalFilename);

  if (fs.existsSync(outputPath)) {
    console.log(`Image déjà optimisée : ${finalFilename}`);
    return `/images/${finalFilename}`;
  }

  const response = await fetch(imageUrl, {
    headers: {
      "User-Agent": "portfolio-backend",
    },
  });

  if (!response.ok) {
    throw new Error("Impossible de télécharger l'image GitHub.");
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

  console.log(`Optimisation de ${finalFilename}`);

  await sharp(buffer)
    .resize(resizeOptions)
    .webp({
      quality: type === "logo" ? 82 : 72,
      effort: 6,
    })
    .toFile(outputPath);

  return `/images/${finalFilename}`;
}

module.exports = {
  optimizeGithubImage,
};