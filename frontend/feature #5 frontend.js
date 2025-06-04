import {Alert} from 'react-native';

const AlertaPermisodenegado = () => {
      Alert.alert (
        'El permiso de la ubicación fue rechazado' , 'Para mejorar la experiencia. Necesitamos que aceptes el permiso de ubicación.',
        [
          {
          Text: 'Regresar',
          onPress () => {
            console.log ('Se presionó devolver');
           }

          }
        ]
      );

    };
