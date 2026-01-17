import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { getUserById } from '../services/api';

const DetailScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = async () => {
    try {
      setError(null);
      const result = await getUserById(userId);
      
      if (result.success) {
        setUser(result.data);
      } else {
        setError(result.error);
        Alert.alert('Error', result.error);
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mengambil detail');
      Alert.alert('Error', 'Terjadi kesalahan saat mengambil detail');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenWebsite = (url) => {
    Linking.openURL(`https://${url}`).catch(() =>
      Alert.alert('Error', 'Tidak dapat membuka website')
    );
  };

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`).catch(() =>
      Alert.alert('Error', 'Tidak dapat melakukan panggilan')
    );
  };

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`).catch(() =>
      Alert.alert('Error', 'Tidak dapat membuka email')
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Memuat detail...</Text>
      </View>
    );
  }

  if (error || !user) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorText}>{error || 'Data tidak ditemukan'}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchUserDetail}
        >
          <Text style={styles.retryButtonText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Pengguna</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>@{user.username}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informasi Kontak</Text>
          
          <TouchableOpacity
            style={styles.infoCard}
            onPress={() => handleEmail(user.email)}
          >
            <Text style={styles.infoIcon}>📧</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.infoCard}
            onPress={() => handleCall(user.phone)}
          >
            <Text style={styles.infoIcon}>📞</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Telepon</Text>
              <Text style={styles.infoValue}>{user.phone}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.infoCard}
            onPress={() => handleOpenWebsite(user.website)}
          >
            <Text style={styles.infoIcon}>🌐</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Website</Text>
              <Text style={styles.infoValue}>{user.website}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alamat</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>📍</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Alamat Lengkap</Text>
              <Text style={styles.infoValue}>
                {user.address.street}, {user.address.suite}
              </Text>
              <Text style={styles.infoValue}>
                {user.address.city}, {user.address.zipcode}
              </Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>🗺️</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Koordinat</Text>
              <Text style={styles.infoValue}>
                Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perusahaan</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>🏢</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Nama Perusahaan</Text>
              <Text style={styles.infoValue}>{user.company.name}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💼</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Bidang Usaha</Text>
              <Text style={styles.infoValue}>{user.company.bs}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💡</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Tagline</Text>
              <Text style={styles.infoValue}>"{user.company.catchPhrase}"</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 32,
    color: '#2196F3',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    color: '#333',
  },
  errorIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailScreen;