import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

const DepositScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [amount, setAmount] = useState('');

  const handleDeposit = async () => {
    try {
      await axios.post('http://localhost:5000/api/transactions/deposit', {
        userId,
        amount: parseFloat(amount),
      });
      navigation.navigate('Dashboard', { userId });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Deposit" onPress={handleDeposit} />
    </View>
  );
};

export default DepositScreen;
