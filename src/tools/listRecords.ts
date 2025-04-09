import { createTool } from '@modelcontextprotocol/sdk';
import rijksmuseumClient from '../api/rijksmuseum';

export const listRecords = createTool({
  name: 'rijksmuseum_list_records',
  description: 'List records from the Rijksmuseum collection using OAI-PMH',
  parameters: {
    type: 'object',
    properties: {
      metadataPrefix: {
        type: 'string',
        description: 'The metadata format (e.g., "oai_dc")',
      },
      from: {
        type: 'string',
        description: 'Optional start date (YYYY-MM-DD)',
      },
      until: {
        type: 'string',
        description: 'Optional end date (YYYY-MM-DD)',
      },
      set: {
        type: 'string',
        description: 'Optional set for selective harvesting',
      },
      resumptionToken: {
        type: 'string',
        description: 'Optional token for resuming a previous list request',
      },
    },
    required: ['metadataPrefix'],
  },
  handler: async ({ metadataPrefix, from, until, set, resumptionToken }) => {
    try {
      const result = await rijksmuseumClient.listRecords({
        metadataPrefix,
        from,
        until,
        set,
        resumptionToken,
      });
      
      return result;
    } catch (error: any) {
      return {
        error: error.message || 'Failed to list records',
      };
    }
  },
});
