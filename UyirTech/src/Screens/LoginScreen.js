import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../Context/AuthContext';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {login, logout, isAdmin, userData} = useContext(AuthContext);

  // const handleLogin = () => {
  //   fetch('http://10.0.2.2:8080/Users', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({name, password}),
  //   })
  //     .then(response => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error('Invalid name or password');
  //       }
  //     })
  //     .then(data => {
  //       // Handle successful login (redirect, store token, etc.)
  //       console.log('Login successful', data.token);
  //     })
  //     .catch(error => {
  //       setError(error.message);
  //       console.error('Login error:', error);
  //     });
  // };

  return (
    <SafeAreaView style={styles.container}>
      {!userData?.token ? (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter email"
            value={name}
            onChangeText={text => setName(text)}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              login(name, password);
              navigation.navigate('HomeScreen');
              console.log('clicked');
              // handleLogin()
            }}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View
            style={{
              borderRadius: 15,
              backgroundColor: '#273143',
              width: '40%',
              padding: 10,
              alignItems: 'center',
              marginVertical:'5%'
            }}>
            <Text
              style={{color: '#fff', fontSize: 15}}
              onPress={() => {
                logout();
                navigation.navigate('HomeScreen');
              }}>
              Logout
            </Text>
          </View>
          {isAdmin && (
            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#273143',
                width: '40%',
                padding: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{color: '#fff', fontSize: 15}}
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                Create new user
              </Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  formContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;

// import {SafeAreaView, StyleSheet, Text, View, TextInput} from 'react-native';
// import React, {useEffect, useState} from 'react';

// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   useEffect(() => {
//     // fetch('http://localhost:8080/Users')
//     fetch('http://10.0.2.2:8080/Users')
//       .then(res => res.json())
//       .then(data => console.log(data))
//       .catch(err => console.log(err));
//   }, []);
//   return (
//     <SafeAreaView>
//       <View style={{marginVertical: '5%'}}>
//         <Text style={styles.label}>
//           Email <Text style={styles.fontRed}>*</Text>
//         </Text>
//         <TextInput
//           placeholder="Enter email"
//           onChangeText={text => setEmail(text)}
//           placeholderTextColor="#A0A0A0"
//           textColor="#000"
//           style={[styles.textAreaInput]}
//         />
//       </View>
//       <View style={{marginVertical: '5%'}}>
//         <Text style={styles.label}>
//           Email <Text style={styles.fontRed}>*</Text>
//         </Text>
//         <TextInput
//           placeholder="Enter email"
//           onChangeText={text => setPassword(text)}
//           placeholderTextColor="#A0A0A0"
//           textColor="#000"
//           style={[styles.textAreaInput]}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   textAreaInput: {
//     color: '#181818',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     borderColor: '#E4E6E9',
//     borderWidth: 1,
//     // paddingHorizontal: 12,
//     // paddingVertical: 12,
//     // height: 120,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '500',
//     lineHeight: 18,
//     color: '#222222',
//     marginBottom: '2%',
//   },

//   fontRed: {
//     color: 'red',
//   },
// });
