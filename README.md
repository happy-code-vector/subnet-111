# Streaming API Fetcher

Fetches data from the Macrocosmos streaming API with automatic timeout.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update the API_KEY in `index.js` with your actual API key

## Usage

Run the script:
```bash
npm start
```

The script will:
- Connect to the streaming API
- Collect data for up to 10 seconds
- Automatically stop before timeout
- Save all collected data to `output.json`

## Configuration

Edit `index.js` to modify:
- `TIMEOUT_SECONDS`: Change the timeout duration (default: 10)
- `keywords`: Update the search keywords
- `limit`: Change the data limit
