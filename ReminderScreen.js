// AddReminderScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, DatePickerAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddReminderScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [datetime, setDatetime] = useState('');

  const openDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
      });

      if (action !== DatePickerAndroid.dismissedAction) {
        // Month is 0-based, so add 1 to the month
        setDatetime(`${year}-${month + 1}-${day}`);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  const handleSaveReminder = async () => {
    // Save the reminder to AsyncStorage
    try {
      const newReminder = { id: Date.now().toString(), title, datetime };
      const existingReminders = JSON.parse(await AsyncStorage.getItem('reminders')) || [];
      const updatedReminders = [...existingReminders, newReminder];

      await AsyncStorage.setItem('reminders', JSON.stringify(updatedReminders));

      // Clear the form fields
      setTitle('');
      setDatetime('');

      // Navigate back to the home screen
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving reminder:', error);
    }
  };

  return (
    <View>
      <Text>Add Reminder</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        placeholder="Date and Time"
        value={datetime}
        onTouchStart={openDatePicker}
      />
      <Button title="Save Reminder" onPress={handleSaveReminder} />
    </View>
  );
};

export default AddReminderScreen;
