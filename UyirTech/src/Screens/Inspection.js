import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Inspection = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Only logged in users can access this page</Text>
    </View>
  );
};

export default Inspection;

const styles = StyleSheet.create({});
