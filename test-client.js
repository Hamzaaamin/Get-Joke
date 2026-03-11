import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

// Simple local test client: spawns `node index.js`, lists tools, calls `get_joke`.
const transport = new StdioClientTransport({
  command: "node",
  args: ["index.js"],
});

const client = new Client(
  { name: "get-joke-test-client", version: "0.1.0" },
  { capabilities: {} },
);

await client.connect(transport);

const { tools } = await client.listTools();
console.log("Tools:", tools.map((t) => t.name).join(", "));

const result = await client.callTool({ name: "get_joke", arguments: {} });
const text = result.content?.find((c) => c.type === "text")?.text ?? "{}";
const { joke } = JSON.parse(text);

console.log("Joke:", joke);

await transport.close();
