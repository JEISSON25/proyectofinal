import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  Timestamp
} from "firebase/firestore";

export async function createTimeSlot(
  roomId,
  dateISO,
  startTime,
  endTime,
  isAvailable
) {
  if (!roomId || !dateISO || !startTime || !endTime || isAvailable == null) {
    throw new Error("Faltan campos obligatorios para crear el timeSlot.");
  }

  const dateTimestamp = Timestamp.fromDate(new Date(dateISO));
  
  const docRef = await addDoc(collection(db, "timeSlots"), {
    roomId,
    date: dateTimestamp,
    startTime,
    endTime,
    isAvailable
  });

  return docRef.id;
}

