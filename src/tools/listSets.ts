import { createTool } from '@modelcontextprotocol/sdk';
import rijksmuseumClient from '../api/rijksmuseum';

export const listSets = createTool({
  name: 'rijksmuseum_list_sets',
  description: 'List the sets available in the Rijksmuseum OAI-PMH repository',
  parameters: {
    type: 'object',
    properties: {
      resumptionToken: {
        type: 'string',
        description: 'Optional token for resuming a previous list sets request',
      },
    },
  },
  handler: async ({ resumptionToken }) => {
    try {
      const result = await rijksmuseumClient.listSets();
      return result;
    } catch (error: any) {
      return {
        error: error.message || 'Failed to list sets',
      };
    }
  },
});
