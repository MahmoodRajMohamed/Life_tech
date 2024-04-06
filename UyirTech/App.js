import * as React from 'react';

import Navigation from './src/Navigation/Navigation';
import {AuthProvider} from './src/Context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

export default App;
