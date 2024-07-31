// src/app/firebase-config.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { environment } from '../environments/environment';

const app = initializeApp(environment.firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const getGoogleToken = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log('Result: '+result);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log('Credential; '+credential);
    if (credential) {
      return credential.accessToken;
    } else {
      throw new Error('Failed to retrieve Google token');
    }
  } catch (error) {
    console.error('Token retrieval error:', error);
    throw error;
  }
};
