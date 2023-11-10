// HomeScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [reminders, setReminders] = useState([]);

  const loadReminders = async () => {
    try {
      const storedReminders = await AsyncStorage.getItem('reminders');
      if (storedReminders) {
        setReminders(JSON.parse(storedReminders));
      }
    } catch (error) {
      console.error('Error loading reminders:', error);
    }
  };

  useEffect(() => {
    // Load reminders when the component mounts
    loadReminders();
  }, []);

  return (
    <View>
      <Text>Reminders</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ViewReminder', { reminder: item })}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate('AddReminder')}>
        <Text>Add Reminder</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
