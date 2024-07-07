import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

const WithdrawScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [amount, setAmount] = useState('');

  const handleWithdraw = async () => {
    try {
      await axios.post('http://localhost:5000/api/transactions/withdraw', {
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
      <Button title="Withdraw" onPress={handleWithdraw} />
    </View>
  );
};

export default WithdrawScreen;
