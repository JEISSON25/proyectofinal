 Modelado de Salas y Franjas 

Crear el modelo de salas

atributos:

const SalaSchema = new Schema({
  nombre: { type: String, required: true },
  ubicacion: { type: String },
  capacidad: { type: Number },
  descripcion: { type: String },
  activa: { type: Boolean, default: true }
});

Crear el modelo de FranjaHoraria
atributos:
const FranjaHorariaSchema = new Schema({
  salaId: { type: Schema.Types.ObjectId, ref: 'Sala', required: true },
  fecha: { type: Date, required: true },
  horaInicio: { type: String, required: true }, // formato HH:mm
  horaFin: { type: String, required: true },
  disponible: { type: Boolean, default: true }
});

Realciones:

Una sala puede tener muchas franjas horarias.
Cada franja está asociada a una única sala.

Reglas de Validación
No permitir franjas solapadas para una misma sala.
Validar que horaInicio < horaFin.
