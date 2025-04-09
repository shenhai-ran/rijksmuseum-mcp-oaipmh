# Rijksmuseum OAI-PMH MCP Server

A Model Context Protocol (MCP) server implementation for the Rijksmuseum OAI-PMH API. This server allows you to access the Rijksmuseum's rich collection data using the MCP protocol.

## Features

- Implements all major OAI-PMH verbs as MCP tools
  - `Identify` → `rijksmuseum_identify`
  - `ListMetadataFormats` → `rijksmuseum_list_metadata_formats`
  - `ListSets` → `rijksmuseum_list_sets`
  - `ListRecords` → `rijksmuseum_list_records`
  - `GetRecord` → `rijksmuseum_get_record`
- Simple RESTful API following MCP standards
- Comprehensive error handling
- TypeScript implementation

## Installation

```bash
# Clone the repository
git clone https://github.com/shenhai-ran/rijksmuseum-mcp-oaipmh.git
cd rijksmuseum-mcp-oaipmh

# Install dependencies
npm install

# Start the server
npm run dev
```

## API Usage

The server exposes the following endpoints:

- `GET /` - Returns server information and available tools
- `POST /tools/{toolName}` - Executes a specific tool with the provided parameters

### Examples

```bash
# Get information about the Rijksmuseum repository
curl -X POST http://localhost:3000/tools/rijksmuseum_identify

# List metadata formats
curl -X POST http://localhost:3000/tools/rijksmuseum_list_metadata_formats

# Get a specific record
curl -X POST http://localhost:3000/tools/rijksmuseum_get_record \
  -H "Content-Type: application/json" \
  -d '{"identifier": "https://id.rijksmuseum.nl/2001", "metadataPrefix": "oai_dc"}'
```

## Development

```bash
# Run the server in development mode with hot reloading
npm run watch

# Run the direct test against the Rijksmuseum API
npm run direct-test

# Run the MCP test client against the local server
npm run mcp-test
```

## License

MIT

## About the Rijksmuseum API

The Rijksmuseum API provides access to the museum's collection data through various protocols, including OAI-PMH. For more information, visit [Rijksmuseum API Documentation](https://data.rijksmuseum.nl/docs/oai-pmh/verbs).
