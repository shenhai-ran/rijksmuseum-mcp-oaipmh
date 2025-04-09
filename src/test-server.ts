import axios from 'axios';

// Base URL for the Rijksmuseum OAI-PMH API
const BASE_URL = 'https://data.rijksmuseum.nl/oai';

/**
 * Simple test server for Rijksmuseum OAI-PMH API
 */
async function testRijksmuseumApi() {
  console.log('-------- Testing Rijksmuseum OAI-PMH API --------');

  // Test Identify
  console.log('\n1. Testing Identify:');
  try {
    const identifyResponse = await axios.get(`${BASE_URL}?verb=Identify`);
    console.log('Identify response:', JSON.stringify(identifyResponse.data, null, 2).substring(0, 500) + '...');
  } catch (error) {
    console.error('Error in Identify call:', error);
  }

  // Test ListMetadataFormats
  console.log('\n2. Testing ListMetadataFormats:');
  try {
    const listMetadataFormatsResponse = await axios.get(`${BASE_URL}?verb=ListMetadataFormats`);
    console.log('ListMetadataFormats response:', JSON.stringify(listMetadataFormatsResponse.data, null, 2).substring(0, 500) + '...');
    
    // Get metadata prefix for subsequent calls
    let metadataPrefix = 'oai_dc'; // Default fallback
    const xmlData = listMetadataFormatsResponse.data;
    if (typeof xmlData === 'string' && xmlData.includes('<metadataPrefix>')) {
      const match = xmlData.match(/<metadataPrefix>([^<]+)<\/metadataPrefix>/);
      if (match && match[1]) {
        metadataPrefix = match[1];
      }
    }
    console.log(`\nUsing metadata prefix: ${metadataPrefix}`);
    
    // Test ListSets
    console.log('\n3. Testing ListSets:');
    try {
      const listSetsResponse = await axios.get(`${BASE_URL}?verb=ListSets`);
      console.log('ListSets response:', JSON.stringify(listSetsResponse.data, null, 2).substring(0, 500) + '...');
      
      // Extract a setSpec if available
      let setSpec;
      const setsData = listSetsResponse.data;
      if (typeof setsData === 'string' && setsData.includes('<setSpec>')) {
        const match = setsData.match(/<setSpec>([^<]+)<\/setSpec>/);
        if (match && match[1]) {
          setSpec = match[1];
          console.log(`\nFound set: ${setSpec}`);
        }
      }
      
      // Test ListRecords with metadataPrefix and optional set
      console.log('\n4. Testing ListRecords:');
      try {
        const listRecordsUrl = setSpec 
          ? `${BASE_URL}?verb=ListRecords&metadataPrefix=${metadataPrefix}&set=${setSpec}`
          : `${BASE_URL}?verb=ListRecords&metadataPrefix=${metadataPrefix}`;
          
        const listRecordsResponse = await axios.get(listRecordsUrl);
        console.log('ListRecords response:', JSON.stringify(listRecordsResponse.data, null, 2).substring(0, 500) + '...');
        
        // Extract an identifier for GetRecord
        let identifier;
        const recordsData = listRecordsResponse.data;
        if (typeof recordsData === 'string' && recordsData.includes('<identifier>')) {
          const match = recordsData.match(/<identifier>([^<]+)<\/identifier>/);
          if (match && match[1]) {
            identifier = match[1];
            console.log(`\nFound identifier: ${identifier}`);
            
            // Test GetRecord
            console.log('\n5. Testing GetRecord:');
            try {
              const getRecordResponse = await axios.get(
                `${BASE_URL}?verb=GetRecord&metadataPrefix=${metadataPrefix}&identifier=${encodeURIComponent(identifier)}`
              );
              console.log('GetRecord response:', JSON.stringify(getRecordResponse.data, null, 2).substring(0, 500) + '...');
            } catch (error) {
              console.error('Error in GetRecord call:', error);
            }
          }
        }
        
      } catch (error) {
        console.error('Error in ListRecords call:', error);
      }
      
    } catch (error) {
      console.error('Error in ListSets call:', error);
    }
    
  } catch (error) {
    console.error('Error in ListMetadataFormats call:', error);
  }
  
  console.log('\n-------- Testing Complete --------');
}

// Run the test
testRijksmuseumApi().catch(error => {
  console.error('Unexpected error:', error);
});
