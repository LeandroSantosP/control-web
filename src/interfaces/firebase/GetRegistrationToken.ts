import 'firebase/messaging';
import { app } from '../../interfaces/firebase';

import {
   getMessaging,
   getToken,
   GetTokenOptions,
   Messaging,
} from 'firebase/messaging';
import 'firebase/messaging';

import { FirebaseApp } from 'firebase/app';
import 'firebase/messaging';
import { GetUserNotification } from '../../api';

class GetNotifications {
   public permissionAccept: boolean | undefined;
   private app: FirebaseApp | undefined;
   private getMessaging: any;
   private getToken: (
      messaging: Messaging,
      options?: GetTokenOptions
   ) => Promise<string>;

   constructor() {
      Notification.requestPermission().then((response) => {
         if (response === 'granted') {
            this.permissionAccept = true;
         }
         this.permissionAccept = false;
         return;
      });
      this.app = app;
      this.getToken = getToken;
      this.getMessaging = getMessaging;
   }

   private async recupereToken() {
      const message = this.getMessaging(this.app);
      try {
         const token = await this.getToken(message, {
            vapidKey:
               'BNIKIoFeQ7WhEChfp9hKPZWqw8SfX8P_XKA88b96b8yUvelsf-hmpLV9cFHma4MI9-tMkwpRhnB-o0pYQJGJbqs',
         });

         if (token) {
            await GetUserNotification(token);
         } else {
            console.log(
               'No registration token available. Request permission to generate one.'
            );
         }
         return token;
      } catch (error) {
         console.error(error);
      }
   }

   async getMessages() {
      // const token = (await this.recupereToken()) as string;
      // console.log(token);

      // const messaging = getMessaging();

      // onMessage(messaging, (payload) => {
      //    console.log(payload);

      //    console.log('Message received. ', payload);
      //    console.log('leandro');
      // });
      return;
   }
}

export default new GetNotifications();
