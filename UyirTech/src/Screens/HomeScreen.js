import React, {useContext, useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  DrawerLayoutAndroid,
  ScrollView,
  Image,
} from 'react-native';
import {HambergerMenu, Notification} from 'iconsax-react-native';
import Logo from '../Assets/SVG/Logo';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../Context/AuthContext';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const drawer = useRef(null);

  const [drawerPosition, setDrawerPosition] = useState('left');
  const {userData} = useContext(AuthContext);

  const token = userData?.token;

  console.log('token home screen : ', token)

  useEffect(() => {
    console.log('userData', userData);
  }, []);

  const changeDrawerPosition = () => {
    if (drawerPosition === 'left') {
      setDrawerPosition('right');
    } else {
      setDrawerPosition('left');
    }
  };

  const navigationView = () => (
    <View style={[styles.containerDrawer, styles.navigationContainer]}>
      <View>
        <Text
          onPress={() => {
            navigation.navigate('ProfileScreen');
          }}>
          Profile
        </Text>
      </View>
      {/* <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      /> */}
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={navigationView}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={{borderWidth: 0, width: '10%'}}
            onPress={() => drawer.current.openDrawer()}>
            <HambergerMenu
              size={screenWidth > 360 ? '32' : '30'}
              color="#273143"
            />
          </TouchableOpacity>
          <View style={styles.headerContainer}>
            <Logo />
            <Text style={styles.headerText}>UYIRTECH</Text>
          </View>
          <View style={{width: '20%'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LoginScreen');
              }}
              style={{
                // borderWidth: 1,
                // borderRadius: 100,
                // height: 35,
                // width: 35,
                alignSelf: 'flex-end',
                marginHorizontal: '5%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>{token ? 'logout' : 'login'}</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notifications');
            }}>
            <Notification
              size={screenWidth > 360 ? '26' : '24'}
              color="#273143"
            />
          </TouchableOpacity>
        </View> */}
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: '4%',
            marginVertical: '4%',
            paddingBottom: '2%',
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={require('../Assets/bgImage.png')}
              style={{
                width: screenWidth > 360 ? 360 : 330,
                height: screenWidth > 360 ? 300 : 300,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }}
            />

            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Courses', {pageHeader: 'FSSC 22000'});
                }}>
                <Image
                  source={require('../Assets/Doctor.jpg')}
                  style={styles.image}
                />
                <View style={styles.overlay}>
                  <Text style={styles.text}>FSSC 22000</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Courses', {pageHeader: 'E Learning'});
                }}>
                <Image
                  source={require('../Assets/ELearning.jpg')}
                  style={styles.image}
                />
                <View style={styles.overlay}>
                  <Text style={styles.text}>E Learning</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Courses', {pageHeader: 'Inspection'});
                }}>
                <Image
                  source={require('../Assets/Inspection.jpg')}
                  style={styles.image}
                />
                <View style={styles.overlay}>
                  <Text style={[styles.text,{color:'#000'}]}>Inspection</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        {/* <View style={styles.container}>
          <Text style={styles.paragraph}>Drawer on the {drawerPosition}!</Text>
          <Button
            title="Change Drawer Position"
            onPress={() => changeDrawerPosition()}
          />
          <Text style={styles.paragraph}>
            Swipe from the side or press button below to see it!
          </Text>
          <Button
            title="Open drawer"
            onPress={() => drawer.current.openDrawer()}
          />
        </View> */}
      </DrawerLayoutAndroid>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerDrawer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  topBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFF',
    alignItems: 'center',
    paddingVertical: screenWidth > 360 ? 17 : 14,
    paddingHorizontal: 20,
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    borderWidth: 0,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },

  container: {
    alignItems: 'center',
    marginTop: '5%',
  },
  image: {
    width: screenWidth > 360 ? 360 : 330,
    height: screenWidth > 360 ? 420 : 360,
    borderRadius: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 40,
    color: '#FFF',
  },
});

export default HomeScreen;
