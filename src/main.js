import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

import { getFirebaseConfig } from './firebase-config';

// Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);

