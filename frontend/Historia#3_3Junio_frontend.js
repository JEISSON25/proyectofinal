import React, { useState } from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import cancelation from "../api";

const CancelButton = () => {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    await cancelation();

    setLoading(false);
  };

  return (
    <TouchableOpacity onPress={handleCancel} disabled={loading}>
      {loading ? (
        <View>
          <ActivityIndicator color="white" />
          <Text>Cancelando...</Text>
        </View>
      ) : (
        <Text>Cancelar</Text>
      )}
    </TouchableOpacity>
  );
};

export default CancelButton;
