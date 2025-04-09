import axios from 'axios';

/**
 * Simple client to test the Rijksmuseum OAI-PMH MCP server
 */
async function testMcpServer() {
  const MCP_SERVER_URL = 'http://localhost:3000';
  
  try {
    console.log('-------- Testing Rijksmuseum OAI-PMH MCP Server --------');
    
    // Test Identify
    console.log('\n1. Testing Identify tool:');
    const identifyResponse = await axios.post(`${MCP_SERVER_URL}/tools/rijksmuseum_identify`, {});
    console.log('Identify response:', JSON.stringify(identifyResponse.data, null, 2).substring(0, 500) + '...');
    
    // Test ListMetadataFormats
    console.log('\n2. Testing ListMetadataFormats tool:');
    const listMetadataFormatsResponse = await axios.post(`${MCP_SERVER_URL}/tools/rijksmuseum_list_metadata_formats`, {});
    console.log('ListMetadataFormats response:', JSON.stringify(listMetadataFormatsResponse.data, null, 2).substring(0, 500) + '...');
    
    // Get a metadata prefix from the response to use in our next calls
    let metadataPrefix = 'oai_dc'; // Default value
    if (listMetadataFormatsResponse.data && 
        listMetadataFormatsResponse.data.ListMetadataFormats && 
        listMetadataFormatsResponse.data.ListMetadataFormats.metadataFormat && 
        listMetadataFormatsResponse.data.ListMetadataFormats.metadataFormat.length > 0) {
      metadataPrefix = listMetadataFormatsResponse.data.ListMetadataFormats.metadataFormat[0].metadataPrefix;
    }
    console.log(`\nUsing metadata prefix: ${metadataPrefix}`);
    
    // Test ListSets
    console.log('\n3. Testing ListSets tool:');
    const listSetsResponse = await axios.post(`${MCP_SERVER_URL}/tools/rijksmuseum_list_sets`, {});
    console.log('ListSets response:', JSON.stringify(listSetsResponse.data, null, 2).substring(0, 500) + '...');
    
    // Get a set from the response to use in our next calls (if available)
    let setSpec;
    if (listSetsResponse.data && 
        listSetsResponse.data.ListSets && 
        listSetsResponse.data.ListSets.set && 
        listSetsResponse.data.ListSets.set.length > 0) {
      setSpec = listSetsResponse.data.ListSets.set[0].setSpec;
      console.log(`\nUsing set: ${setSpec}`);
    }
    
    // Test ListRecords
    console.log('\n4. Testing ListRecords tool:');
    const listRecordsResponse = await axios.post(`${MCP_SERVER_URL}/tools/rijksmuseum_list_records`, {
      metadataPrefix,
      ...(setSpec ? { set: setSpec } : {})
    });
    console.log('ListRecords response:', JSON.stringify(listRecordsResponse.data, null, 2).substring(0, 500) + '...');
    
    // Get a record identifier to use for GetRecord
    let identifier;
    if (listRecordsResponse.data && 
        listRecordsResponse.data.ListRecords && 
        listRecordsResponse.data.ListRecords.record && 
        listRecordsResponse.data.ListRecords.record.length > 0) {
      identifier = listRecordsResponse.data.ListRecords.record[0].header.identifier;
      console.log(`\nFound record identifier: ${identifier}`);
      
      // Test GetRecord with this identifier
      console.log('\n5. Testing GetRecord tool:');
      const getRecordResponse = await axios.post(`${MCP_SERVER_URL}/tools/rijksmuseum_get_record`, {
        identifier,
        metadataPrefix
      });
      console.log('GetRecord response:', JSON.stringify(getRecordResponse.data, null, 2).substring(0, 500) + '...');
    } else {
      console.log('\nNo records found to test GetRecord');
    }
    
    console.log('\n-------- Testing Complete --------');
    
  } catch (error) {
    console.error('Error testing MCP server:', error);
    
    if (axios.isAxiosError(error) && error.response) {
      console.error('Response error data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

// Run the test
testMcpServer();
