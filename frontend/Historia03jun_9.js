import React, { useEffect, useState } from 'react';
import { View, Text, Switch, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import {
  fetchNotificationSetting, updateNotificationSetting   
} from '../services/notificationService';

export default function NotificationSettingsToggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const currentValue = await fetchNotificationSetting();
        setIsEnabled(currentValue);
      } catch (error) {
        Alert.alert('Error', 'No se pudo leer la configuración de notificaciones.');
        console.error('Error al leer setting:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleSwitch = async () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    try {
      await updateNotificationSetting(newValue);
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la configuración.');
      console.error('Error al actualizar setting:', error);
      setIsEnabled(!newValue);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Notificaciones de recordatorio</Text>
      <Switch value={isEnabled} onValueChange={toggleSwitch} />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    padding: 16,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});

