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
