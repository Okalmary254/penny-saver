import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const DashboardScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setBalance(userResponse.data.balance);
        const transactionResponse = await axios.get(`http://localhost:5000/api/transactions/${userId}`);
        setTransactions(transactionResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      <Text>Balance: {balance}</Text>
      <Button title="Deposit" onPress={() => navigation.navigate('Deposit', { userId })} />
      <Button title="Withdraw" onPress={() => navigation.navigate('Withdraw', { userId })} />
      <Text>Recent Transactions:</Text>
      {transactions.map((transaction) => (
        <Text key={transaction._id}>{transaction.type}: {transaction.amount}</Text>
      ))}
    </View>
  );
};

export default DashboardScreen;
