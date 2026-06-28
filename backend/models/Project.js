const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    githubName: String,
    title: String,
    description: String,
    technologies: [String],
    imageUrl: String,
    logoUrl: String,
    galleryUrls: [String],
    githubUrl: String,
    demoUrl: String,
    order: Number,
    featured: Boolean,
    category: String,
    context: String,
    objectives: [String],
    skills: [String],
    results: [String],
    improvements: [String],
    updatedAt: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);