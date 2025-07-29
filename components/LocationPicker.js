import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function LocationPicker({ onLocationPicked, currentLocation }) {
  const [isLoading, setIsLoading] = useState(false);

  const verifyPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'You need to grant location permissions to use this feature.'
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    setIsLoading(true);
    
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const pickedLocation = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };

      onLocationPicked(pickedLocation);
    } catch (error) {
      Alert.alert('Error', 'Could not fetch location. Please try again.');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  let locationContent = (
    <Text style={styles.placeholder}>No location selected yet</Text>
  );

  if (currentLocation) {
    // Using OpenStreetMap static image (free alternative)
    const mapPreviewUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${currentLocation.lat},${currentLocation.lng}&zoom=14&size=400x200&markers=${currentLocation.lat},${currentLocation.lng},red`;
    
    locationContent = (
      <View>
        <Image
          style={styles.mapImage}
          source={{ uri: mapPreviewUrl }}
          resizeMode="cover"
        />
        <View style={styles.coordinatesContainer}>
          <Text style={styles.coordinatesText}>
            📍 Lat: {currentLocation.lat.toFixed(6)}
          </Text>
          <Text style={styles.coordinatesText}>
            📍 Lng: {currentLocation.lng.toFixed(6)}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {locationContent}
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title={isLoading ? "Getting Location..." : "Get Current Location"}
          onPress={getLocationHandler}
          disabled={isLoading}
          color="#8B4513"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  preview: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderColor: '#D2B48C', // Tan border
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC', // Beige background
  },
  mapImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  placeholder: {
    color: '#8B7355',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  coordinatesContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(139, 115, 85, 0.9)', // Semi-transparent earth brown
    padding: 8,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  coordinatesText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 5,
  },
});