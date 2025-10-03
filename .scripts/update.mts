import { readFileSync, writeFileSync } from "node:fs";

const data = JSON.parse(readFileSync("projects.json").toString());
const getProject = (id: string) => data.list.find((x: any) => x.id == id);

const projectMarkdown = (p: any) => {
	let md = "";
	if (p.emoji) {
		md += p.emoji + " ";
	}

	md += `[${p.name || p.id}](${p.link})`;

	return md;
};

let content = [
	"- Featured:",
	...data.state.featured.map((id: string) => projectMarkdown(getProject(id))).map((x: string) => "  - "+x),
	"- Currently working on:",
	...data.state.developing.map((id: string) => projectMarkdown(getProject(id))).map((x: string) => "  - "+x),
].join("\n");

const readmeContents = readFileSync("README.md").toString();
const replaceRegex = /(<!--start:script-->)([\w\W]*)(<!--end:script-->)/g;
const wrappedContent = `<!--start:script-->\n\n${content}\n\n<!--end:script-->`
const newReadmeContents = readmeContents.replace(replaceRegex, wrappedContent);

writeFileSync("README.md", newReadmeContents);
console.log("Updated README!");
