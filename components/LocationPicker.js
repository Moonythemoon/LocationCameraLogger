import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function LocationPicker({ onLocationPicked, currentLocation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [mapError, setMapError] = useState(false);

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

      console.log('Location picked:', pickedLocation);
      setMapError(false); // Reset map error when getting new location
      onLocationPicked(pickedLocation);
    } catch (error) {
      console.log('Location error:', error);
      Alert.alert('Error', 'Could not fetch location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  let locationContent = (
    <Text style={styles.placeholder}>No location selected yet</Text>
  );

  if (currentLocation) {
    if (mapError) {
      // Show coordinates without map when map fails to load
      locationContent = (
        <View style={styles.coordinatesOnlyContainer}>
          <Text style={styles.coordinatesTitle}>📍 Location Coordinates</Text>
          <Text style={styles.coordinatesLarge}>
            {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
          </Text>
          <Text style={styles.mapErrorText}>Map preview unavailable</Text>
        </View>
      );
    } else {
      const googleMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${currentLocation.lat},${currentLocation.lng}&zoom=14&size=400x200&markers=color:red%7C${currentLocation.lat},${currentLocation.lng}&key=AIzaSyA6pUYsMdYP9Hr_rsFPzdfnKrDdYQQDZtE`;
      
      console.log('Google Maps URL:', googleMapUrl);
      
      locationContent = (
        <View>
          <Image
            style={styles.mapImage}
            source={{ uri: googleMapUrl }}
            resizeMode="cover"
            onError={(error) => {
              console.log('Map failed to load:', error.nativeEvent);
              setMapError(true);
            }}
            onLoad={() => {
              console.log('Map loaded successfully!');
              setMapError(false);
            }}
          />
          <View style={styles.coordinatesContainer}>
            <Text style={styles.coordinatesText}>
              Lat: {currentLocation.lat.toFixed(6)}
            </Text>
            <Text style={styles.coordinatesText}>
              Lng: {currentLocation.lng.toFixed(6)}
            </Text>
          </View>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {locationContent}
      </View>
      
      <Button
        title={isLoading ? "Getting Location..." : "Get Current Location"}
        onPress={getLocationHandler}
        disabled={isLoading}
        color="#8B4513"
      />
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
    borderColor: '#D2B48C',
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
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
    backgroundColor: 'rgba(139, 115, 85, 0.9)',
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
  coordinatesOnlyContainer: {
    alignItems: 'center',
    padding: 20,
  },
  coordinatesTitle: {
    fontSize: 18,
    color: '#654321',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  coordinatesLarge: {
    fontSize: 16,
    color: '#8B4513',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  mapErrorText: {
    fontSize: 12,
    color: '#A0522D',
    fontStyle: 'italic',
  },
});