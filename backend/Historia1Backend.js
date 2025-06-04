/*mapa de la universidad: ubicar salas o cubiculos, campus con
sus ubicaciones.
geolocalizar puntos y mostrar la ubicacion en tiempo real
y poder reservar
**como desarrollador backend. Quiero validar en backend que coords siempre tenga lalitud y longitud y validas 
para evitar datos corruptos en firestore
1. validar las cordenadas que la latitud exista al igual que la longitud
2.deben ser numeros que estan en un rango de
latitud entre -90 y 90 grados
logitud entre -180 y 180 grados
*/

//Aqui creamos el servidor para la app y se lee el JSON de las peticiones
const express = require('express');
const admin = require('firebase-admin'); //administracion back
const app = express();
app.use(express.json());

//inicamos el firebase
const servicioCuenta = require('en este campo va la ruta y el firebase.json ./serviceAccountKey.json')

admin.iniciarApp({
  credencial: admin.credencial.cert(servicioCuenta)
});

const db = admin.firestore(); //conexion firebase

//funcion de validacion coordenadas
function validarCoordenadas(coords){
  if (!coords)
    return false;

  const {latitud, longitud} = coords;

  const latValida = typeof latitud ==='number' && latitud >=-90 && latitud <=90;
  const lonValida = typeof longitud ==='number' && longitud >=-180 && longitud <=180;

  return latValida && lonValida;
}

//Endpoint para guardar las coordenadas

app.post('/guardar-coordenadas'), async(req, res) =>{
  const {coords} = req.cuerpo;
}

  if(!validarCoordenadas(coords)){
    return res.status(400).json({error:"cordenadas incorrectas"})

}
  try{
    const docReferencia = await db.collection('ubicaciones').add({
      latitud: coords.latitud,
      longitud: coords.longitud,
      tiempomarca:admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(200).json({mensaje: 'ubicacion guardad', id:docReferencia.id});
  }catch(error){
    console.error('error al guardar info en Firestore', error);
    res.status(500).json({error:'error en el servidor'});
  }

  //inicia servidor
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, ()=>{
    console.log('el sevidor corre en el puerto ${PORT}');
  });