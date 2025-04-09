import axios from 'axios';

const MCP_SERVER_URL = 'http://localhost:3000';

/**
 * Test client for our Rijksmuseum OAI-PMH MCP server
 */
async function testMcpServer() {
  console.log('-------- Testing Rijksmuseum OAI-PMH MCP Server --------');

  try {
    // Step 1: Check server info
    console.log('\nStep 1: Checking server info...');
    const infoResponse = await axios.get(MCP_SERVER_URL);
    console.log(`Server name: ${infoResponse.data.name}`);
    console.log(`Description: ${infoResponse.data.description}`);
    console.log(`Available tools: ${infoResponse.data.tools.map(t => t.name).join(', ')}`);
    
    // Step 2: Call Identify
    console.log('\nStep 2: Testing rijksmuseum_identify tool...');
    const identifyResponse = await axios.post(
      `${MCP_SERVER_URL}/tools/rijksmuseum_identify`, 
      {}
    );
    console.log('Identify response:', JSON.stringify(identifyResponse.data).substring(0, 300) + '...');
    
    // Step 3: Call ListMetadataFormats
    console.log('\nStep 3: Testing rijksmuseum_list_metadata_formats tool...');
    const metadataFormatsResponse = await axios.post(
      `${MCP_SERVER_URL}/tools/rijksmuseum_list_metadata_formats`, 
      {}
    );
    console.log('ListMetadataFormats response:', JSON.stringify(metadataFormatsResponse.data).substring(0, 300) + '...');
    
    // Step 4: Call ListSets
    console.log('\nStep 4: Testing rijksmuseum_list_sets tool...');
    const listSetsResponse = await axios.post(
      `${MCP_SERVER_URL}/tools/rijksmuseum_list_sets`, 
      {}
    );
    console.log('ListSets response:', JSON.stringify(listSetsResponse.data).substring(0, 300) + '...');
    
    // Step 5: Call ListRecords
    console.log('\nStep 5: Testing rijksmuseum_list_records tool...');
    const listRecordsResponse = await axios.post(
      `${MCP_SERVER_URL}/tools/rijksmuseum_list_records`, 
      { metadataPrefix: 'oai_dc' }
    );
    console.log('ListRecords response:', JSON.stringify(listRecordsResponse.data).substring(0, 300) + '...');
    
    // Attempt to extract an identifier from the response for GetRecord
    let identifier = '';
    const data = listRecordsResponse.data;
    if (typeof data === 'string' && data.includes('<identifier>')) {
      const match = data.match(/<identifier>([^<]+)<\/identifier>/);
      if (match && match[1]) {
        identifier = match[1];
        console.log(`Found identifier: ${identifier}`);
        
        // Step 6: Call GetRecord with the found identifier
        console.log('\nStep 6: Testing rijksmuseum_get_record tool...');
        const getRecordResponse = await axios.post(
          `${MCP_SERVER_URL}/tools/rijksmuseum_get_record`, 
          { 
            identifier, 
            metadataPrefix: 'oai_dc' 
          }
        );
        console.log('GetRecord response:', JSON.stringify(getRecordResponse.data).substring(0, 300) + '...');
      }
    }
    
    console.log('\n-------- Testing Complete --------');
    console.log('All tests were successful!');
    
  } catch (error) {
    console.error('Error testing MCP server:', error);
    
    if (axios.isAxiosError(error) && error.response) {
      console.error('Response error data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

// Run the test
testMcpServer().catch(console.error);
