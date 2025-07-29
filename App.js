import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert, Image } from 'react-native';
import CameraComponent from './components/CameraComponent';
import LocationPicker from './components/LocationPicker';
import LogsList from './components/LogsList';

export default function App() {
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [logs, setLogs] = useState([]);

  const saveLogEntry = () => {
    if (!currentLocation && !currentPhoto) {
      Alert.alert('No Data', 'Please get location or take a photo first.');
      return;
    }

    const newLog = {
      id: Date.now().toString(),
      location: currentLocation,
      photo: currentPhoto,
      timestamp: new Date().toLocaleString(),
    };

    setLogs(prevLogs => [newLog, ...prevLogs]);
    
    // Reset current data
    setCurrentLocation(null);
    setCurrentPhoto(null);
    
    Alert.alert('Success', 'Log entry saved!');
  };

  const clearCurrentData = () => {
    console.log('Clear button pressed!'); // Debug log
    console.log('Before clear - Photo:', currentPhoto ? 'exists' : 'null');
    console.log('Before clear - Location:', currentLocation ? 'exists' : 'null');
    
    Alert.alert(
      'Clear Data',
      'Are you sure you want to clear the current photo and location?',
      [
        { 
          text: 'Cancel', 
          style: 'cancel',
          onPress: () => console.log('Clear cancelled')
        },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => {
            console.log('Clearing data...');
            setCurrentLocation(null);
            setCurrentPhoto(null);
            console.log('Data cleared!');
          }
        }
      ]
    );
  };

  // Debug: Log current state
  console.log('Current render - Photo:', currentPhoto ? 'exists' : 'null');
  console.log('Current render - Location:', currentLocation ? 'exists' : 'null');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Location & Camera Logger</Text>
        <Text style={styles.subtitle}>Capture moments with location data</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <LocationPicker 
          onLocationPicked={(location) => {
            console.log('Location picked in App:', location);
            setCurrentLocation(location);
          }} 
          currentLocation={currentLocation}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Camera</Text>
        <CameraComponent 
          onPhotoTaken={(photo) => {
            console.log('Photo taken in App:', photo ? 'photo received' : 'null');
            setCurrentPhoto(photo);
          }} 
          currentPhoto={currentPhoto}
        />
      </View>

      {(currentPhoto || currentLocation) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Log</Text>
          <View style={styles.currentLogContainer}>
            {currentPhoto && (
              <View style={styles.currentLogItem}>
                <Text style={styles.currentLogLabel}>Photo:</Text>
                <Image source={{ uri: currentPhoto }} style={styles.currentLogImage} />
              </View>
            )}
            
            {currentLocation && (
              <View style={styles.currentLogItem}>
                <Text style={styles.currentLogLabel}>Location Map:</Text>
                <Image 
                  style={styles.currentLogMap}
                  source={{
                    uri: `https://maps.googleapis.com/maps/api/staticmap?center=${currentLocation.lat},${currentLocation.lng}&zoom=14&size=400x200&markers=color:red%7C${currentLocation.lat},${currentLocation.lng}&key=AIzaSyA6pUYsMdYP9Hr_rsFPzdfnKrDdYQQDZtE`
                  }}
                  resizeMode="cover"
                />
                <Text style={styles.currentLogCoords}>
                  {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}

      <View style={styles.actionSection}>
        <View style={styles.buttonRow}>
          <View style={styles.buttonContainer}>
            <Button 
              title="Save Log Entry" 
              onPress={saveLogEntry}
              color="#8B4513"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button 
              title="Clear Data" 
              onPress={clearCurrentData}
              color="#A0522D"
            />
          </View>
        </View>
        
        {/* Debug info */}
        <View style={styles.debugContainer}>
          <Text style={styles.debugText}>
            Debug: Photo={currentPhoto ? '✓' : '✗'} Location={currentLocation ? '✓' : '✗'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Logs ({logs.length})</Text>
        <LogsList logs={logs} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  header: {
    backgroundColor: '#8B7355',
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#F5F5DC',
    fontStyle: 'italic',
  },
  section: {
    margin: 15,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#654321',
    marginBottom: 10,
  },
  actionSection: {
    margin: 15,
    padding: 15,
    backgroundColor: '#DEB887',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  currentLogContainer: {
    alignItems: 'center',
  },
  currentLogItem: {
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  currentLogLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#654321',
    marginBottom: 8,
  },
  currentLogImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  currentLogMap: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  currentLogCoords: {
    fontSize: 12,
    color: '#8B4513',
    marginTop: 5,
    textAlign: 'center',
  },
  debugContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 5,
  },
  debugText: {
    fontSize: 12,
    color: '#654321',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
});