
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=*rooms,timeSlots*} {
      allow read, write: if request.auth != null;
    }
  }
}