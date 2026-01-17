import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { checkAuthStatus } from '../utils/auth';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Check if user is already logged in
        const userData = await checkAuthStatus();
        
        if (userData && userData.loggedIn) {
          navigation.replace('Home');
        } else {
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Splash screen error:', error);
        navigation.replace('Login');
      }
    };

    initializeApp();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Zegen Solusi Mandiri Internship</Text>
        <Text style={styles.subtitle}>Mobile Developer Pre-Test</Text>
        
        <ActivityIndicator 
          size="large" 
          color="#2196F3" 
          style={styles.loader}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0a0',
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;