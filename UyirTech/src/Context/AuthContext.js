import axios from 'axios';
import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {Buffer} from 'buffer';
import CryptoJS from 'react-native-crypto-js';

const encryptKey =
  "or=1smomXPWV'=uK8.!uo.f:KluAh*5uUJ!|lwWAPpbUU5(GE4,=PA!JN.N!NKb#&^O>^o+TR5=aG1Bt+NfxvTi#vh4^mkMVtT4t7'RA!k'W^G#jv";

const encryptData = (data, key) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    key,
  ).toString();
  return encryptedData;
};

const decryptData = (encryptedData, key) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
};

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [leaveCount, setLeaveCount] = useState({});
  const [documents, setDocuments] = useState({});
  const [letters, setLetters] = useState({});
  const [policies, setPolicies] = useState({});
  const [payslips, setPayslips] = useState({});
  const [Pro, setPro] = useState({});
  const [userData, setUserData] = useState({});
  const [leaveResponse, setLeaveResponse] = useState({});
  const [baseURL, setBaseURL] = useState('');
  const [fileFormat, setFileFormat] = useState('');
  const [successAlert, setSuccessAlert] = useState(false);
  const [failureAlert, setFailureAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [isAdmin, setIsAdmin] = useState(false);

  const getOrgUrl = async () => {
    const parsedOrgBaseUrl = await AsyncStorage.getItem('OrgBaseUrl');
    const OrgBaseUrl = JSON.parse(parsedOrgBaseUrl);
    console.log('OrgBaseUrl if condition : ', OrgBaseUrl);
    setBaseURL(OrgBaseUrl);
  };

  const login = async (name, password) => {
    console.log('name and password', name, password);

    try {
      // setIsLoading(true);
      console.log('name and password inside try', name, password);
      const response = await fetch('http://10.0.2.2:8080/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, password}),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const userInfo = await response.json();
      const users = userInfo.token;

      console.log('logged in', userInfo);
      setIsAdmin(userInfo.isAdmin);

      setUserData(userInfo);

      const jsonUsers = JSON.stringify(userInfo);
      const UsersEncoded = Buffer.from(jsonUsers).toString('base64');

      const encryptedUsers = encryptData(userInfo, encryptKey);

      await AsyncStorage.setItem('userData', JSON.stringify(encryptedUsers));
      console.log('Encrypted successfully : ', encryptedUsers);

      // setIsLoading(false);
    } catch (e) {
      console.log(`register login error ${e}`);
      // setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    console.log(`register ${name} ${email} ${password}`);
    try {
      const response = await fetch('http://10.0.2.2:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password}),
      });

      console.log('register response : ', response);
      if (!response.ok) {
        throw data.message;
      }

      const data = await response.json();
      console.log('Registration successful:', data.message);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  // Usage
  // register('John Doe', 'john@example.com', 'password123');

  // const login = async (name, password) => {
  //   console.log('name and password', name, password);

  //   try {
  //     // setIsLoading(true);
  //     console.log('name and password inside try', name, password);
  //     const res = await axios.post(
  //       // 'http://10.0.2.2:8080/Users',
  //       'http://localhost:8080/Users',
  //       {
  //         name,
  //         password,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );

  //     let userInfo = res.data;
  //     let users = userInfo.token;

  //     console.log('logged in', userInfo);

  //     // if (!email || !password) {
  //     //   // Alert.alert('Please enter email and password');
  //     // } else if (userInfo.status !== 200) {
  //     //   Alert.alert(userInfo.message);
  //     // }
  //     // if (userInfo?.status === 200) {
  //     //   setAlertMessage(userInfo?.message);
  //     //   setSuccessAlert(true);
  //     // } else {
  //     //   setFailureAlert(true);
  //     //   setAlertMessage(userInfo?.message);
  //     // }

  //     //   let tokens = {
  //     //     data: {
  //     //       token: userInfo.data.token,
  //     //       refreshToken: userInfo.data.refreshToken,
  //     //     },
  //     //   };

  //     //   setUserInfo(tokens);
  //     setUserData(users);

  //     //   const jsonToken = JSON.stringify(tokens);
  //     //   const TokenEncoded = Buffer.from(jsonToken).toString('base64');

  //     const jsonUsers = JSON.stringify(users);
  //     const UsersEncoded = Buffer.from(jsonUsers).toString('base64');

  //     // Encrypt user data and tokens before storing
  //     //   const encryptedTokens = encryptData(tokens, encryptKey);

  //     const encryptedUsers = encryptData(users, encryptKey);

  //     //   await AsyncStorage.setItem('userInfo', JSON.stringify(encryptedTokens));
  //     await AsyncStorage.setItem('userData', JSON.stringify(encryptedUsers));
  //     console.log('Encrypted successfully');

  //     // console.log('TokenEncoded : ', TokenEncoded);
  //     // console.log('UsersEncoded : ', UsersEncoded);

  //     // // Store encrypted user data and tokens
  //     // await AsyncStorage.setItem('userInfo', JSON.stringify(encryptedTokens));
  //     // await AsyncStorage.setItem('userData', JSON.stringify(encryptedUserData));

  //     setIsLoading(false);
  //     // console.log(tokens, 'tokenss');
  //     // console.log(users, 'data');
  //   } catch (e) {
  //     console.log(`register login error ${e}`);
  //     setIsLoading(false);
  //   }
  // };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      setUserData();
      console.log('logged out successfully');
    } catch (error) {
      console.log(`logout error ${error}`);
    }
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      //   const EncodedToken = await AsyncStorage.getItem('userInfo');
      const EncodedUsers = await AsyncStorage.getItem('userData');

      //   let eToken = JSON.parse(EncodedToken);
      let eUsers = JSON.parse(EncodedUsers);

      if (EncodedUsers) {
        try {
          //   const decryptedTokens = decryptData(eToken, encryptKey);
          //   // const base64Token = Buffer.from(decryptedTokens, 'base64');
          //   // const decodedToken = base64Token.toString('utf8');

          //   // const parsedJson = JSON.parse(decodedToken);
          //   console.log('decrypted tokens : ', decryptedTokens);
          //   setUserInfo(decryptedTokens);

          const decryptedUsers = decryptData(eUsers, encryptKey);
          // const base64Users = Buffer.from(decryptedUsers, 'base64');
          // const decodedUsers = base64Users.toString('utf8');

          // const parsedUsers = JSON.parse(decodedUsers);
          console.log('parsedUsers :', decryptedUsers);
          setIsAdmin(decryptedUsers.isAdmin)
          setUserData(decryptedUsers);
          console.log('Decrypted successfully');
        } catch (error) {
          console.error('Error parsing or decoding data:', error);
        }
      } else {
        console.log('No data found in async storage');
      }

      let userInfo = await AsyncStorage.getItem('userInfo');
      let userData = await AsyncStorage.getItem('userData');

      // console.log(userInfo, 'is logged in');
      // if (userInfo) {
      //   setUserInfo(userInfo);
      //   console.log(userInfo);
      // }
      //else if (userInfo.status == 401) {
      //   try {
      //     setIsLoading(true);
      //     const res = await axios.post(
      //       `${BASE_URL}Authenticate/RefreshToken`,
      //       refresToken,
      //       {
      //         headers: {
      //           Authorization: `Bearer ${userInfo.data.token}`,
      //           SignatureClaim: 'JWTRefreshClaim',
      //         },
      //       },
      //     );
      //     let response = res.data;
      //     await AsyncStorage.setItem('userInfo', JSON.stringify(response));
      //     console.log(response, 'ref');
      //   } catch (e) {
      //     console.log(`register error ${e}`);
      //   }
      //}

      setSplashLoading(false);
    } catch (error) {
      setSplashLoading(false);
      console.log(`is logged in error ${error}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
    // loginRefreshToken();
  }, []);

  // useEffect(() => {
  //   getOrgUrl();
  // }, [orgBaseUrl]);

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        isAdmin,
        userData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
