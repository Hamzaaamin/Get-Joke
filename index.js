import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

/**
 * Minimal MCP server over stdio.
 *
 * Run:
 *   npm install
 *   node index.js
 */

const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
  "There are only 10 kinds of people in the world: those who understand binary and those who don't.",
  "I would tell you a UDP joke, but you might not get it.",
  "Debugging: being the detective in a crime movie where you are also the murderer.",
];

const server = new Server(
  {
    name: "get-joke",
    version: "0.1.0",
  },
  {
    // The SDK uses this to validate message shapes.
    capabilities: { tools: {} },
  },
);

/**
 * Example tool definition.
 * - `name` is what clients call
 * - `inputSchema` describes parameters (none for this tool)
 */
const GET_JOKE_TOOL = {
  name: "get_joke",
  description: "Return a random programming joke as JSON.",
  inputSchema: {
    type: "object",
    properties: {},
    additionalProperties: false,
  },
};

// Advertise available tools to the client.
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [GET_JOKE_TOOL],
}));

// Handle tool invocations.
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;

  if (name !== "get_joke") {
    throw new Error(`Unknown tool: ${name}`);
  }

  const joke = JOKES[Math.floor(Math.random() * JOKES.length)];

  // Return JSON as the tool result. Many clients will parse this directly.
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({ joke }),
      },
    ],
  };
});

// Start the server using stdio transport (recommended for local MCP servers).
const transport = new StdioServerTransport();
await server.connect(transport);
