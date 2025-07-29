# Location & Camera Logger App

A React Native mobile app built with Expo that allows users to capture photos with GPS location data and save them as log entries.

## Features

- GPS Location Tracking: Get current location coordinates
- Camera Integration: Take photos using device camera
- Log Management: Save and view photo + location combinations
- Earth Tone Design: Brown and tan color scheme
- Permission Handling: Automatic location and camera permission requests

## Prerequisites

Before running this app, make sure you have:

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

## Design

The app uses an earth tone color palette:
- Primary Browns: #8B4513, #8B7355, #654321
- Secondary Tans: #D2B48C, #F5F5DC, #DEB887
- Accent: #A0522D

## Important Notes

- Permissions: The app requires location and camera permissions to function
- Data Storage: All logs are stored in memory and reset when the app restarts
- Network: Uses OpenStreetMap for location display (no API key required)
- Platform: Tested on iOS and Android using Expo Go

## Lab Exercise Completion

This app fulfills all requirements of the Location & Camera Logger lab exercise:

- Part 1: Expo project setup with required dependencies
- Part 2: Location retrieval with permission handling
- Part 3: Static map display using OpenStreetMap
- Part 4: Camera integration with photo capture
- Part 5: Save and view logs functionality

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

## For Teachers

This project demonstrates:
- React Native fundamentals
- Expo development workflow
- Mobile permissions handling
- State management with hooks
- Component-based architecture
- Mobile UI/UX design principles

## Demo

The app successfully:
- Requests and handles location permissions
- Retrieves GPS coordinates with high accuracy
- Displays location data to the user
- Requests and handles camera permissions
- Launches device camera for photo capture
- Saves photos with location metadata
- Displays saved logs with timestamps
- Uses responsive design for mobile devices

---

Created for React Native Lab Exercise
Estimated completion time: 90-120 minutes
