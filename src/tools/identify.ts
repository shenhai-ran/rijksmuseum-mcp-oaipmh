import { createTool } from '@modelcontextprotocol/sdk';
import rijksmuseumClient from '../api/rijksmuseum';

export const identify = createTool({
  name: 'rijksmuseum_identify',
  description: 'Get information about the Rijksmuseum OAI-PMH repository',
  parameters: {
    type: 'object',
    properties: {},
  },
  handler: async () => {
    try {
      const result = await rijksmuseumClient.identify();
      return result;
    } catch (error: any) {
      return {
        error: error.message || 'Failed to identify repository',
      };
    }
  },
});
