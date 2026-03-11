# Get Joke MCP Server

Minimal Model Context Protocol (MCP) server (Node.js) that exposes one tool: `get_joke`.

## Setup

```bash
npm install
```

## Run

```bash
node index.js
```

Or:

```bash
npm start
```

## Test (without Inspector)

This repo includes a tiny SDK-based client that spawns the server over stdio, lists tools, and calls `get_joke`:

```bash
npm run test:mcp
```

## Tool response shape

The `get_joke` tool returns JSON like:

```json
{
  "joke": "Why do programmers prefer dark mode? Because light attracts bugs."
}
```

## Publish to the MCP Registry (official)

The official MCP Registry stores **metadata** only, so you must publish the package to **npm** first.

1) Publish to npm (once):

```bash
npm adduser
npm publish --access public
```

2) Publish metadata to the MCP Registry:

```bash
brew install mcp-publisher
mcp-publisher login github
mcp-publisher publish
```

Notes:
- `package.json` includes `mcpName` and `server.json` uses the same `name` (required for verification).
- If you change the version, bump it in **both** `package.json` and `server.json` (and republish to npm).
