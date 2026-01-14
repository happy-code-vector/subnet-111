import { Sn13Client } from 'macrocosmos';
import fs from 'fs/promises';

const API_KEY = '2d0fbe7776c8b59999868b4631fcd540749d3bd6d436977bf3d6a573320bdc6bfa0cbecae8fc9b735197db55c70c9498';
const TIMEOUT_SECONDS = 60; // Change this to your desired timeout

async function fetchStreamingData() {
  const collectedData = [];
  let timeoutId;
  
  try {
    console.log(`Starting streaming request (will stop after ${TIMEOUT_SECONDS} seconds)...`);
    
    // Create AbortController to cancel the request
    const controller = new AbortController();
    const { signal } = controller;
    
    // Set timeout to abort the stream
    timeoutId = setTimeout(() => {
      console.log(`\nTimeout reached (${TIMEOUT_SECONDS} seconds), stopping stream...`);
      controller.abort(); // This stops the streaming
    }, TIMEOUT_SECONDS * 1000);
    
    // Initialize the client with abort signal
    const client = new Sn13Client({ 
      apiKey: API_KEY,
      signal // Pass the abort signal to the client
    });
    
    // Make the request
    const response = await client.onDemandData({
      source: 'X',
      keywords: ['frankfurters'],
      limit: 100,
      usernames: [],
      keywordMode: 'any'
    });
    
    console.log('Received response from API');
    
    // Process the response
    if (response && response.data) {
      collectedData.push(...response.data);
      console.log(`Received ${collectedData.length} items`);
    } else if (response) {
      collectedData.push(response);
      console.log(`Received response data`);
    }
    
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Stream aborted successfully due to timeout');
    } else {
      console.error('Error fetching data:', error.message);
    }
  } finally {
    clearTimeout(timeoutId);
    
    // Save collected data to output.json
    await fs.writeFile('output.json', JSON.stringify(collectedData, null, 2));
    console.log(`\nSaved ${collectedData.length} items to output.json`);
  }
}

fetchStreamingData();
