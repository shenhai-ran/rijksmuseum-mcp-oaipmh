import axios from 'axios';

const BASE_URL = 'https://data.rijksmuseum.nl/oai';

export interface OaiPmhOptions {
  verb: string;
  metadataPrefix?: string;
  identifier?: string;
  from?: string;
  until?: string;
  set?: string;
  resumptionToken?: string;
}

export class RijksmuseumOaiPmhClient {
  async request(options: OaiPmhOptions): Promise<any> {
    try {
      const params = new URLSearchParams();
      
      // Add all options to the params
      Object.entries(options).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });

      const response = await axios.get(BASE_URL, { params });
      return response.data;
    } catch (error) {
      console.error('Error making OAI-PMH request:', error);
      throw error;
    }
  }

  async identify(): Promise<any> {
    return this.request({ verb: 'Identify' });
  }

  async listRecords(options: Omit<OaiPmhOptions, 'verb'>): Promise<any> {
    return this.request({ verb: 'ListRecords', ...options });
  }

  async getRecord(options: Omit<OaiPmhOptions, 'verb'>): Promise<any> {
    return this.request({ verb: 'GetRecord', ...options });
  }

  async listMetadataFormats(identifier?: string): Promise<any> {
    return this.request({ 
      verb: 'ListMetadataFormats',
      identifier
    });
  }

  async listSets(): Promise<any> {
    return this.request({ verb: 'ListSets' });
  }
}

export default new RijksmuseumOaiPmhClient();
