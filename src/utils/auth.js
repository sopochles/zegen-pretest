import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = '@auth_user';

// Simple email and password validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

// Login function (dummy validation)
export const login = async (email, password) => {
  try {
    if (!validateEmail(email)) {
      return {
        success: false,
        error: 'Email tidak valid',
      };
    }

    if (!validatePassword(password)) {
      return {
        success: false,
        error: 'Password minimal 6 karakter',
      };
    }

    // Dummy credentials for demo
    if (email === 'test@zegen.id' && password === 'password123') {
      const userData = { email, loggedIn: true };
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(userData));
      return {
        success: true,
        data: userData,
      };
    }

    return {
      success: false,
      error: 'Email atau password salah',
    };
  } catch (error) {
    return {
      success: false,
      error: 'Terjadi kesalahan saat login',
    };
  }
};

// Check if user is logged in
export const checkAuthStatus = async () => {
  try {
    const userData = await AsyncStorage.getItem(AUTH_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    return null;
  }
};

// Logout function
export const logout = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_KEY);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Gagal logout' };
  }
};