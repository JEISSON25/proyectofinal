/* 
day 2 historia 5 como desarrollador backend quiero implementar la funcion
getTimeSlots(roomId, date)

*/

// utils/getTimeSlots.js
const { addHours, format, isBefore, isEqual } = require('date-fns');

const generateTimeSlots = () => {
  const slots = [];
  let current = new Date(2000, 0, 1, 8, 0); // 8:00 AM
  const end = new Date(2000, 0, 1, 20, 0); // 8:00 PM

  while (isBefore(current, end)) {
    const startTime = format(current, 'HH:mm');
    const endTime = format(addHours(current, 1), 'HH:mm');
    slots.push({ startTime, endTime });
    current = addHours(current, 1);
  }

  return slots;
};

const getTimeSlots = async (roomId, date, db) => {
  const allSlots = generateTimeSlots();

  const reservations = await db.collection('reservations').find({
    roomId,
    date,
  }).toArray();

  const availableSlots = allSlots.filter(slot => {
    return !reservations.some(r =>
      r.startTime === slot.startTime && r.endTime === slot.endTime
    );
  });

  return availableSlots;
};

module.exports = getTimeSlots;
