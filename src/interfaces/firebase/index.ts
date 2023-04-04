import { getMessaging } from 'firebase/messaging/sw';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
   apiKey: 'AIzaSyCy8LYdcSUUSUz6Ry2r9VRKhYPzAoKHwcA',
   authDomain: 'notificaiton-puf.firebaseapp.com',
   projectId: 'notificaiton-puf',
   storageBucket: 'notificaiton-puf.appspot.com',
   messagingSenderId: '663364994899',
   appId: '1:663364994899:web:c8ce5c621853118962c3a6',
   measurementId: 'G-9DF456VFZ6',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export { app, analytics, messaging };
