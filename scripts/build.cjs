const fs = require("fs");
const path = require("path")
const graymatter = require("gray-matter");

const contentPath = path.join(process.cwd(), "content");

const files = fs.readdirSync(contentPath);

const data = files.map(file => {
    const slug = path.basename(file, path.extname(file));

    const rawContent = fs.readFileSync(path.join(contentPath, file), 'utf-8');

    const { content, data } = graymatter(rawContent);
    

    return {
        slug,
        content,
        id: data.id,
        title: data.title,
        category: data.category
    }
});

const outputPath = path.join(process.cwd(), "assets", "hymns", "index.json");

fs.writeFileSync(outputPath, JSON.stringify(data));