import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";

const AddressQuery = () => {
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [endereco, setEndereco] = useState(null);

  const buscarCEP = async () => {
    if (cep.length !== 8) {
      setError("O CEP deve ter 8 dígitos.");
      setEndereco(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    setEndereco(null);
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
        method: "GET",
      });
            
      if (!response.ok) {
        throw new Error("Erro ao buscar CEP.");
      }
      
      const data = await response.json();
      
      if (data.erro) {
        throw new Error("CEP não encontrado.");
      }
      
      setEndereco(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Digite o CEP:</Text>
      <TextInput
        style={styles.input}
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
        maxLength={8}
        placeholder="Ex: 01001000"
      />
      <TouchableOpacity style={styles.button} onPress={buscarCEP}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {endereco && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Logradouro: {endereco.logradouro}</Text>
          <Text style={styles.resultText}>Bairro: {endereco.bairro}</Text>
          <Text style={styles.resultText}>Cidade: {endereco.localidade}</Text>
          <Text style={styles.resultText}>Estado: {endereco.uf}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  result: {
    marginTop: 20,
    backgroundColor: "#98fb98",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    elevation: 3,
    borderWidth: 1,
    borderColor: "#388e3c",
  },
  resultText: {
    color: "black",
    fontSize: 16,
  },
});

export default AddressQuery;
