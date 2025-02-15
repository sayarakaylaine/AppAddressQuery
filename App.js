import React from "react";
import { SafeAreaView } from "react-native";
import AddressQuery from "./components/AddressQuery";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AddressQuery />
    </SafeAreaView>
  );
};

export default App;
