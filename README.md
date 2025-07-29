# Location & Camera Logger App

A React Native mobile app built with Expo that allows users to capture photos with GPS location data and save them as log entries.

## Features

- GPS Location Tracking: Get current location coordinates
- Camera Integration: Take photos using device camera
- Log Management: Save and view photo + location combinations
- Earth Tone Design: Brown and tan color scheme
- Permission Handling: Automatic location and camera permission requests

## Prerequisites

- Node.js (version 16 or higher)
- Expo Go app installed on your mobile device
- VS Code or any code editor

## Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/Moonythemoon/LocationCameraLogger.git
cd LocationCameraLogger
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Development Server
```bash
npx expo start --tunnel
```

### Step 4: Run on Your Phone
1. Open Expo Go app on your phone
2. Scan the QR code displayed in your terminal
3. Grant location and camera permissions when prompted

## How to Use

1. Get Location: Tap "Get Current Location" to retrieve GPS coordinates
2. Take Photo: Tap "Take Photo" to capture an image
3. Save Log: Tap "Save Log Entry" to store the photo + location combination
4. View Logs: Scroll down to see all saved entries with timestamps

## Project Structure

```
LocationCameraLogger/
├── App.js                 # Main application file (single file approach)
├── package.json           # Dependencies and scripts
├── app.json              # Expo configuration
└── README.md             # This file
```

## Dependencies

- expo: ~53.0.17
- expo-location: Location services
- expo-image-picker: Camera functionality
- react: 19.0.0
- react-native: 0.79.5



## Important Notes

- Permissions: The app requires location and camera permissions to function
- Data Storage: All logs are stored in memory and reset when the app restarts
- Network: Uses OpenStreetMap for location display (no API key required)
- Platform: Tested on iOS and Android using Expo Go


## Troubleshooting

### App shows white screen:
```bash
npx expo start --clear --tunnel
```

### Permission errors:
- Make sure to grant location and camera permissions when prompted
- Try restarting the Expo Go app

### Dependencies not found:
```bash
rm -rf node_modules
npm install
npx expo start --tunnel
```



