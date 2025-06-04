import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchSchedules } from '../services/scheduleService';

export default function ScheduleErrorMessage() {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await fetchSchedules();
      } catch (error) {
        console.error('Error al cargar horarios:', error);
        setHasError(true);
      }
    })();
  }, []);

  if (!hasError) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Error al cargar los horarios. Por favor, inténtelo de nuevo más tarde.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fdecea',
    padding: 12,
    borderRadius: 6,
    marginVertical: 8,
    alignItems: 'center',
  },
  text: {
    color: '#b71c1c',
    fontSize: 14,
    textAlign: 'center',
  },
});
