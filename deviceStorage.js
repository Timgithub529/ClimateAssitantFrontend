import  AsyncStorage  from '@react-native-async-storage/async-storage';
//import { AsyncStorage } from '@react-native-web' //???
//import AsyncStorage from '@react-native-community/async-storage';



const deviceStorage = {
  
    async saveItem(key, value) {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.log('AsyncStorage Error: ' + error.message);
      }
    },

    async getItem(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            
            return value;
        } catch (error){
            console.log('AsyncStorage Error: ' + error.message);
        }

    },
    
  };

  export default deviceStorage; 