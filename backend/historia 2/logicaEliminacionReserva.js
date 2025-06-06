let misReservas = [
  { id: 1, idHorario: 101, nombreUsuario: "Juan" },
  { id: 2, idHorario: 102, nombreUsuario: "María" }, 
  { id: 3, idHorario: 103, nombreUsuario: "Pedro" }
];

let horarios = [
  { id: 101, hora: "10:00", disponible: false },
  { id: 102, hora: "14:00", disponible: false },
  { id: 103, hora: "16:00", disponible: false }
];

function cancelarReserva(idReserva) {
  console.log(`Buscando la reserva ${idReserva} para su cancelación`);
  
  let reserva = null;
  for(let i = 0; i < misReservas.length; i++) {
    if(misReservas[i].id === idReserva) {
      reserva = misReservas[i];
      break;
    }
  }
  
  if(!reserva) {
    console.log("No se encontro esa reserva :/");
    return false;
  }
  
  let horarioLiberar = reserva.idHorario;
  
  let nuevasReservas = [];
  for(let reservaActual of misReservas) {
    if(reservaActual.id !== idReserva) {
      nuevasReservas.push(reservaActual);
    }
  }
  misReservas = nuevasReservas;
  
  for(let horario of horarios) {
    if(horario.id === horarioLiberar) {
      horario.disponible = true;
      console.log(`El horario de las ${horario.hora} ya se encuentra libre`);
      break;
    }
  }
  
  return true;
}
function verEstado() {
  console.log("*** RESERVAS ACTUALES ***");
  if(misReservas.length === 0) {
    console.log("No hay reservas activas");
  } else {
    misReservas.forEach(r => {
      console.log(`ID: ${r.id} - Usuario: ${r.nombreUsuario} (Horario: ${r.idHorario})`);
    });
  }
  
  console.log("\n*** HORARIOS ***");
  horarios.forEach(h => {
    let estado = h.disponible ? "LIBRE" : "OCUPADO";
    console.log(`${h.hora} - ${estado}`);
  });
}

console.log("Iniciando sistema de reservas...\n");
verEstado();

console.log("\n" + "=".repeat(40));
console.log("Voy a cancelar la reserva #1");
console.log("=".repeat(40));

let resultado = cancelarReserva(1);

if(resultado) {
  console.log("\n Cancelación realizada con exito.");
} else {
  console.log("\n Algo fallo");
}

console.log("\n" + "=".repeat(40));
console.log("Estado final:");
console.log("=".repeat(40));
verEstado();