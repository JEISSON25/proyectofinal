import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ScheduleErrorMessage({ visible, message }) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {message || 'Error al cargar los horarios. Por favor, inténtelo de nuevo más tarde.'}
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
  },
  text: {
    color: '#b71c1c',
    fontSize: 14,
    textAlign: 'center',
  },
});
