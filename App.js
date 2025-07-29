import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isLoadingCamera, setIsLoadingCamera] = useState(false);

  // Location Functions
  const getLocationHandler = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission required.');
      return;
    }

    setIsLoadingLocation(true);
    
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCurrentLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert('Error', 'Could not fetch location.');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  // Camera Functions
  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera permission required.');
      return;
    }

    setIsLoadingCamera(true);

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setCurrentPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not take photo.');
    } finally {
      setIsLoadingCamera(false);
    }
  };

  // Save Log
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
    setCurrentLocation(null);
    setCurrentPhoto(null);
    Alert.alert('Success', 'Log entry saved!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Location & Camera Logger</Text>
        <Text style={styles.subtitle}>Capture moments with location data</Text>
      </View>

      {/* Location Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Location</Text>
        <View style={styles.preview}>
          {currentLocation ? (
            <View>
              <Text style={styles.coordinates}>
                Lat: {currentLocation.lat.toFixed(6)}
              </Text>
              <Text style={styles.coordinates}>
                Lng: {currentLocation.lng.toFixed(6)}
              </Text>
            </View>
          ) : (
            <Text style={styles.placeholder}>No location selected yet</Text>
          )}
        </View>
        <Button
          title={isLoadingLocation ? "Getting Location..." : "Get Current Location"}
          onPress={getLocationHandler}
          disabled={isLoadingLocation}
          color="#8B4513"
        />
      </View>

      {/* Camera Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📷 Camera</Text>
        <View style={styles.preview}>
          {currentPhoto ? (
            <Image source={{ uri: currentPhoto }} style={styles.image} />
          ) : (
            <Text style={styles.placeholder}>No photo taken yet</Text>
          )}
        </View>
        <Button
          title={isLoadingCamera ? "Opening Camera..." : "Take Photo"}
          onPress={openCamera}
          disabled={isLoadingCamera}
          color="#8B4513"
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <Button 
          title="Save Log Entry" 
          onPress={saveLogEntry}
          color="#8B4513"
        />
      </View>

      {/* Logs Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Saved Logs ({logs.length})</Text>
        {logs.length === 0 ? (
          <Text style={styles.placeholder}>No logs saved yet.</Text>
        ) : (
          logs.map((log) => (
            <View key={log.id} style={styles.logItem}>
              <Text style={styles.timestamp}>{log.timestamp}</Text>
              {log.location && (
                <Text style={styles.locationText}>
                  📍 {log.location.lat.toFixed(4)}, {log.location.lng.toFixed(4)}
                </Text>
              )}
            </View>
          ))
        )}
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#654321',
    marginBottom: 10,
  },
  preview: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderColor: '#D2B48C',
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    resizeMode: 'cover',
  },
  placeholder: {
    color: '#8B7355',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  coordinates: {
    color: '#654321',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
  actionSection: {
    margin: 15,
    padding: 15,
    backgroundColor: '#DEB887',
    borderRadius: 12,
  },
  logItem: {
    backgroundColor: '#DEB887',
    marginBottom: 10,
    borderRadius: 8,
    padding: 12,
  },
  timestamp: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#654321',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#8B4513',
  },
});