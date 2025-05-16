import { doc, updateDoc } from 'firebase/firestore';
import { collection, query, orderBy, startAt, endAt, getDocs } from 'firebase/firestore';

const lat = 51.5074;
const lng = 0.1278;
const hash = geofire.geohashForLocation([lat, lng]);

const londonRef = doc(db, 'cities', 'LON');
await updateDoc(londonRef, {
  geohash: hash,
  lat: lat,
  lng: lng
});

const center = [51.5074, 0.1278];
const radiusInM = 50 * 1000;
const bounds = geofire.geohashQueryBounds(center, radiusInM);
const promises = [];
for (const b of bounds) {
  const q = query(
    collection(db, 'cities'), 
    orderBy('geohash'), 
    startAt(b[0]), 
    endAt(b[1]));

      promises.push(getDocs(q));
}

const snapshots = await Promise.all(promises);

const matchingDocs = [];
for (const snap of snapshots) {
  for (const doc of snap.docs) {
    const lat = doc.get('lat');
    const lng = doc.get('lng');


    const distanceInKm = geofire.distanceBetween([lat, lng], center);
    const distanceInM = distanceInKm * 1000;
    if (distanceInM <= radiusInM) {
      matchingDocs.push(doc);
    }
  }
}





