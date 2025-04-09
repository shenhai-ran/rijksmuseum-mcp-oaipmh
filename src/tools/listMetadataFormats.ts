import { createTool } from '@modelcontextprotocol/sdk';
import rijksmuseumClient from '../api/rijksmuseum';

export const listMetadataFormats = createTool({
  name: 'rijksmuseum_list_metadata_formats',
  description: 'List available metadata formats from the Rijksmuseum OAI-PMH repository',
  parameters: {
    type: 'object',
    properties: {
      identifier: {
        type: 'string',
        description: 'Optional identifier. If specified, returns the metadata formats available for the record',
      },
    },
  },
  handler: async ({ identifier }) => {
    try {
      const result = await rijksmuseumClient.listMetadataFormats(identifier);
      return result;
    } catch (error: any) {
      return {
        error: error.message || 'Failed to list metadata formats',
      };
    }
  },
});
