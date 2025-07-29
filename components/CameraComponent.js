import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CameraComponent({ onPhotoTaken, currentPhoto }) {
  const [isLoading, setIsLoading] = useState(false);

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera access is required.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onPhotoTaken(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not take photo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {currentPhoto ? (
          <Image source={{ uri: currentPhoto }} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>No photo taken yet</Text>
        )}
      </View>
      <Button
        title={isLoading ? "Opening Camera..." : "Take Photo"}
        onPress={openCamera}
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
});