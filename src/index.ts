import express from 'express';
import bodyParser from 'body-parser';
import rijksmuseumClient from './api/rijksmuseum';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
app.use(bodyParser.json());

// Define port
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// MCP Server info
const serverInfo = {
  name: 'Rijksmuseum OAI-PMH MCP Server',
  description: 'MCP server for accessing the Rijksmuseum collection via OAI-PMH',
  version: '1.0.0',
  tools: [
    {
      name: 'rijksmuseum_identify',
      description: 'Get information about the Rijksmuseum OAI-PMH repository',
      parameters: {
        type: 'object',
        properties: {}
      }
    },
    {
      name: 'rijksmuseum_list_metadata_formats',
      description: 'List available metadata formats from the Rijksmuseum OAI-PMH repository',
      parameters: {
        type: 'object',
        properties: {
          identifier: {
            type: 'string',
            description: 'Optional identifier. If specified, returns the metadata formats available for the record'
          }
        }
      }
    },
    {
      name: 'rijksmuseum_list_sets',
      description: 'List the sets available in the Rijksmuseum OAI-PMH repository',
      parameters: {
        type: 'object',
        properties: {
          resumptionToken: {
            type: 'string',
            description: 'Optional token for resuming a previous list sets request'
          }
        }
      }
    },
    {
      name: 'rijksmuseum_list_records',
      description: 'List records from the Rijksmuseum collection using OAI-PMH',
      parameters: {
        type: 'object',
        properties: {
          metadataPrefix: {
            type: 'string',
            description: 'The metadata format (e.g., "oai_dc")'
          },
          from: {
            type: 'string',
            description: 'Optional start date (YYYY-MM-DD)'
          },
          until: {
            type: 'string',
            description: 'Optional end date (YYYY-MM-DD)'
          },
          set: {
            type: 'string',
            description: 'Optional set for selective harvesting'
          },
          resumptionToken: {
            type: 'string',
            description: 'Optional token for resuming a previous list request'
          }
        },
        required: ['metadataPrefix']
      }
    },
    {
      name: 'rijksmuseum_get_record',
      description: 'Get a single record from the Rijksmuseum collection using OAI-PMH',
      parameters: {
        type: 'object',
        properties: {
          identifier: {
            type: 'string',
            description: 'The record identifier'
          },
          metadataPrefix: {
            type: 'string',
            description: 'The metadata format (e.g., "oai_dc")'
          }
        },
        required: ['identifier', 'metadataPrefix']
      }
    }
  ]
};

// MCP endpoints
app.get('/', (req, res) => {
  res.json(serverInfo);
});

// MCP Tools endpoint
app.post('/tools/:toolName', async (req, res) => {
  const { toolName } = req.params;
  const params = req.body || {};
  
  try {
    let result;
    
    switch (toolName) {
      case 'rijksmuseum_identify':
        result = await rijksmuseumClient.identify();
        break;
        
      case 'rijksmuseum_list_metadata_formats':
        result = await rijksmuseumClient.listMetadataFormats(params.identifier);
        break;
        
      case 'rijksmuseum_list_sets':
        result = await rijksmuseumClient.listSets();
        break;
        
      case 'rijksmuseum_list_records':
        result = await rijksmuseumClient.listRecords({
          metadataPrefix: params.metadataPrefix,
          from: params.from,
          until: params.until,
          set: params.set,
          resumptionToken: params.resumptionToken
        });
        break;
        
      case 'rijksmuseum_get_record':
        result = await rijksmuseumClient.getRecord({
          identifier: params.identifier,
          metadataPrefix: params.metadataPrefix
        });
        break;
        
      default:
        return res.status(404).json({ error: `Tool '${toolName}' not found` });
    }
    
    res.json(result);
  } catch (error: any) {
    console.error(`Error executing tool ${toolName}:`, error);
    res.status(500).json({
      error: error.message || `Error executing tool ${toolName}`
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Rijksmuseum OAI-PMH MCP Server running on port ${port}`);
  console.log(`Server info available at http://localhost:${port}`);
  console.log(`Tools available at http://localhost:${port}/tools/{toolName}`);
});

