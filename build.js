const fs = require("fs");
const path = require("path");

// Root file
const ROOT_MD = "README.md";
const OUTPUT_MD = "combined.md";

// Regex to detect links to section markdowns
const linkRegex = /🔗 .*?\((\.\/sections\/.*?\/README\.md)\)/;

// Regex to detect images in markdown or HTML
const imageMarkdownRegex = /!\[.*?\]\((\.\/.*?)\)/g;
const imageHTMLRegex = /<img\s+.*?src="(\.\/.*?)".*?>/g;

// Function to read and expand a markdown file recursively
function expandMarkdown(filePath, basePath = ".") {
  const fullPath = path.join(basePath, filePath);
  const dir = path.dirname(fullPath);

  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️ File not found: ${fullPath}`);
    return "";
  }

  let content = fs.readFileSync(fullPath, "utf8");

  // Fix image paths
  content = content.replace(imageMarkdownRegex, (match, p1) => {
    const fixedPath = path.join(path.dirname(filePath), p1).replace(/\\/g, "/");
    return match.replace(p1, fixedPath);
  });

  content = content.replace(imageHTMLRegex, (match, p1) => {
    const fixedPath = path.join(path.dirname(filePath), p1).replace(/\\/g, "/");
    return match.replace(p1, fixedPath);
  });

  const lines = content.split(/\r?\n/);
  let expanded = [];

  for (let line of lines) {
    const match = line.match(linkRegex);
    if (match) {
      // Keep the 🔗 text
      const linkText = line.replace(/\(.*?\)/, "").trim();
      expanded.push(linkText);
      // Recursively include the linked markdown
      const includePath = match[1];
      expanded.push(expandMarkdown(includePath, basePath));
    } else {
      expanded.push(line);
    }
  }

  return expanded.join("\n");
}

// Read root markdown
let rootContent = fs.readFileSync(ROOT_MD, "utf8");
let rootLines = rootContent.split(/\r?\n/);
let finalLines = [];

// Process root markdown
for (let line of rootLines) {
  const match = line.match(linkRegex);
  if (match) {
    const linkText = line.replace(/\(.*?\)/, "").trim();
    finalLines.push(linkText);
    const includePath = match[1];
    finalLines.push(expandMarkdown(includePath));
  } else {
    finalLines.push(line);
  }
}

// Write combined markdown
fs.writeFileSync(OUTPUT_MD, finalLines.join("\n"), "utf8");
console.log(`✅ Combined markdown generated: ${OUTPUT_MD}`);
