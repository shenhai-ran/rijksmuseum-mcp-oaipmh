import { createTool } from '@modelcontextprotocol/sdk';
import rijksmuseumClient from '../api/rijksmuseum';

export const getRecord = createTool({
  name: 'rijksmuseum_get_record',
  description: 'Get a single record from the Rijksmuseum collection using OAI-PMH',
  parameters: {
    type: 'object',
    properties: {
      identifier: {
        type: 'string',
        description: 'The record identifier',
      },
      metadataPrefix: {
        type: 'string',
        description: 'The metadata format (e.g., "oai_dc")',
      },
    },
    required: ['identifier', 'metadataPrefix'],
  },
  handler: async ({ identifier, metadataPrefix }) => {
    try {
      const result = await rijksmuseumClient.getRecord({
        identifier,
        metadataPrefix,
      });
      
      return result;
    } catch (error: any) {
      return {
        error: error.message || 'Failed to get record',
      };
    }
  },
});
