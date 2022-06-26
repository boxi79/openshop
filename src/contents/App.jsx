import React from 'react';
import Root from './root';
import { ApplicationProvider } from './providers/applicationContext';
import { AuthProvider } from './providers/authProvider';

const App = () => {
  return (
    <AuthProvider>
      <ApplicationProvider>
        <Root />
      </ApplicationProvider>
    </AuthProvider>
  )
};

export default App;
