import {StyleSheet, Text, View, Pressable, useColorScheme} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';

import ArrowBackSvg from '../Assets/SVG/ArrowBackSvg';

const Header = props => {
  const navigation = useNavigation();

  return (
    <View style={styles.topBar}>
      <View>
        <Pressable
          style={{
            // borderWidth: 1,
            height: 50,
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={navigation.goBack}>
          <ArrowBackSvg />
        </Pressable>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerTxt}>{props.heading}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFF',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    // marginTop: 10,
    // marginBottom: 10,
    position: 'relative',
    justifyContent: 'space-evenly',
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222222',
  },
  header: {
    flex: 1,
    // borderWidth: 1,
    marginLeft: '20%',
    height: 50,
    width: 50,
    justifyContent: 'center',
  },
});
