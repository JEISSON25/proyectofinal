import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { db } from '../firebase/firebase-config';
import { doc, updateDoc } from 'firebase/firestore';

const IndicadorCancelacion = ({ 
    confirmacionCancelacion, 
    reservaId,
    mensaje = 'Cancelando...', 
    onAnimacionCompleta
}) => {
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if (confirmacionCancelacion) {
            const cancelarReserva = async () => {
                try {
                    const reservaRef = doc(db, 'reservas', reservaId);
                    await updateDoc(reservaRef, {
                        estado: 'cancelada',
                        fechaCancelacion: new Date().toISOString()
                    });
                    
                    setTimeout(() => {
                        if (onAnimacionCompleta) {
                            onAnimacionCompleta();
                        }
                    }, 2000);
                } catch (err) {
                    setError('Error: No se pudo cancelar la reserva'); // Mensaje más descriptivo
                    console.error('Error en cancelación:', err);
                }
            };

            cancelarReserva();
        }
    }, [confirmacionCancelacion, onAnimacionCompleta, reservaId]);

    if (!confirmacionCancelacion) return null;

    return (
        <View style={estilos.contenedor}>
            <View style={estilos.cajaCarga}>
                <ActivityIndicator 
                    size="large" 
                    color="#0000ff"
                    animating={true}
                />
                <Text style={estilos.texto}>
                    {error || mensaje}
                </Text>
            </View>
        </View>
    );
};

const estilos = StyleSheet.create({
    contenedor: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    cajaCarga: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    texto: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
});

export default IndicadorCancelacion;
