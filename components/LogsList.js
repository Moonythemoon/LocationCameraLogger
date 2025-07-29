import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

export default function LogsList({ logs }) {
  const [selectedLog, setSelectedLog] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [mapError, setMapError] = useState(false);

  const openLogDetail = (log) => {
    setSelectedLog(log);
    setModalVisible(true);
    setMapError(false); // Reset map error when opening modal
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedLog(null);
    setMapError(false);
  };

  if (logs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No logs saved yet.</Text>
        <Text style={styles.emptySubtext}>
          Take a photo and get location to create your first log!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {logs.map((log) => (
        <TouchableOpacity
          key={log.id}
          style={styles.logItem}
          onPress={() => openLogDetail(log)}
        >
          <View style={styles.logContent}>
            {log.photo ? (
              <Image source={{ uri: log.photo }} style={styles.thumbnail} />
            ) : (
              <View style={styles.noPhotoThumbnail}>
                <Text style={styles.noPhotoText}>📍</Text>
              </View>
            )}
            
            <View style={styles.logInfo}>
              <Text style={styles.timestamp}>{log.timestamp}</Text>
              
              {log.location && (
                <View>
                  <Text style={styles.locationText}>
                    Latitude: {log.location.lat.toFixed(4)}
                  </Text>
                  <Text style={styles.locationText}>
                    Longitude: {log.location.lng.toFixed(4)}
                  </Text>
                </View>
              )}
              
              <Text style={styles.tapHint}>Tap to view details</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {/* Modal for detailed view */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <ScrollView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Log Details</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>

          {selectedLog && (
            <View style={styles.modalContent}>
              <Text style={styles.modalTimestamp}>
                Saved: {selectedLog.timestamp}
              </Text>

              {selectedLog.photo && (
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Photo</Text>
                  <Image
                    source={{ uri: selectedLog.photo }}
                    style={styles.fullImage}
                  />
                </View>
              )}

              {selectedLog.location && (
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Location</Text>
                  <Text style={styles.modalCoordinates}>
                    Latitude: {selectedLog.location.lat.toFixed(6)}
                  </Text>
                  <Text style={styles.modalCoordinates}>
                    Longitude: {selectedLog.location.lng.toFixed(6)}
                  </Text>
                  
                  {mapError ? (
                    <View style={styles.mapFallback}>
                      <Text style={styles.mapFallbackTitle}>📍 Location</Text>
                      <Text style={styles.mapFallbackCoords}>
                        {selectedLog.location.lat.toFixed(6)}, {selectedLog.location.lng.toFixed(6)}
                      </Text>
                      <Text style={styles.mapFallbackText}>Map preview unavailable</Text>
                    </View>
                  ) : (
                    <Image
                      style={styles.modalMap}
                      source={{
                        uri: `https://maps.googleapis.com/maps/api/staticmap?center=${selectedLog.location.lat},${selectedLog.location.lng}&zoom=14&size=400x200&markers=color:red%7C${selectedLog.location.lat},${selectedLog.location.lng}&key=AIzaSyA6pUYsMdYP9Hr_rsFPzdfnKrDdYQQDZtE`
                      }}
                      resizeMode="cover"
                      onError={() => {
                        console.log('Map failed to load in modal');
                        setMapError(true);
                      }}
                      onLoad={() => {
                        console.log('Map loaded successfully in modal');
                        setMapError(false);
                      }}
                    />
                  )}
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#8B7355',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#A0522D',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  logItem: {
    backgroundColor: '#DEB887',
    marginBottom: 10,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#F5F5DC',
  },
  noPhotoThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D2B48C',
    borderStyle: 'dashed',
  },
  noPhotoText: {
    fontSize: 24,
    color: '#8B7355',
  },
  logInfo: {
    flex: 1,
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
    marginBottom: 2,
  },
  tapHint: {
    fontSize: 10,
    color: '#8B7355',
    fontStyle: 'italic',
    marginTop: 4,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  modalHeader: {
    backgroundColor: '#8B7355',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeButton: {
    backgroundColor: '#A0522D',
    padding: 8,
    borderRadius: 6,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalContent: {
    padding: 20,
  },
  modalTimestamp: {
    fontSize: 16,
    color: '#654321',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalSection: {
    marginBottom: 25,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#654321',
    marginBottom: 10,
  },
  fullImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  modalCoordinates: {
    fontSize: 14,
    color: '#8B4513',
    marginBottom: 5,
  },
  modalMap: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  mapFallback: {
    backgroundColor: '#F5F5DC',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#D2B48C',
    borderStyle: 'dashed',
  },
  mapFallbackTitle: {
    fontSize: 18,
    color: '#654321',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mapFallbackCoords: {
    fontSize: 16,
    color: '#8B4513',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mapFallbackText: {
    fontSize: 12,
    color: '#A0522D',
    fontStyle: 'italic',
  },
});