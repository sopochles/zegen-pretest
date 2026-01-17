import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <AppNavigator />
    </ErrorBoundary>
  );
};

export default App;