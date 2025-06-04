/* Historia #3
como desarrollador backend.
quiero validar que el usuario que solicita la cancelacion sea el dueño de la reserva
para evitar que otros anulen reservas ajenas. 
*/
async function cancelarReserva(req, res) {
  try {
    const { reservaId } = req.params; // Obtener el ID de la reserva
    const usuarioId = req.user.id; // Obtener el ID del usuario logueado

    // Obtener la información de la reserva
    const reserva = await Reservas.findById(reservaId);

    // Verificar si la reserva existe
    if (!reserva) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada' });
    }

    // Verificar si el usuario es el dueño de la reserva
    if (reserva.usuarioId !== usuarioId) {
      return res.status(403).json({ mensaje: 'No tienes permiso para cancelar esta reserva' });
    }

    // Procesar la cancelación (ej: actualizar el estado de la reserva)
    await Reservas.actualizarEstado(reservaId, 'cancelada');

    res.status(200).json({ mensaje: 'Reserva cancelada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al cancelar la reserva' });
  }
}