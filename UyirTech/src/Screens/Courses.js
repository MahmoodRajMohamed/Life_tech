import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useContext} from 'react';
import Header from '../Components/Header';
import {AuthContext} from '../Context/AuthContext';
import {useNavigation} from '@react-navigation/native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const Courses = ({route}) => {
  const navigation = useNavigation();
  const {userData} = useContext(AuthContext);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header heading={route.params.pageHeader} />
      <View
        style={{
          alignSelf: 'center',
          width: '92%',
          borderWidth: 0,
          marginVertical: '4%',
        }}>
        <Text
          style={{
            color: '#000',
            fontWeight: 'bold',
            fontSize: 15,
            textAlign: 'center',
          }}>
          Uyir tech: Your Partner for Quality Assurance
        </Text>

        {route.params.pageHeader === 'Inspection' && (
          <View style={{marginVertical: '5%', gap: 5}}>
            <Text style={{color: '#222222', fontSize: 14, fontWeight: '500'}}>
              Global Training & Certification :
            </Text>
            <Text style={{textAlign: 'justify'}}>
              Uyirgenetics Research Pvt Ltd. - Uyir-Tech International is an ISO
              9001 & IAF- certified independent organization. Globally providing
              professional development Training (Food safety, FSMS, QMS, and
              Industrial Microbiology Technical Programs) for students /
              Individuals / Organizations. Uyir-Tech International is a leading
              provider of food safety consultancy services, dedicated to
              ensuring the industry's highest standards of food safety and
              quality. With our team of experienced professionals and extensive
              expertise in food safety management, we strive to assist
              businesses in meeting regulatory requirements, implementing best
              practices, and safeguarding their reputation. At Uyir-Tech
              International, we understand the critical importance of food
              safety in today's global marketplace. Our mission is to help food
              manufacturers, processors, distributors, and retailers establish
              and maintain robust food safety systems that protect consumers and
              meet regulatory compliance. We believe that every individual has
              the right to safe and wholesome food, and we are committed to
              making that a reality.
            </Text>
          </View>
        )}

        {route.params.pageHeader === 'E Learning' && (
          <ScrollView style={{height: '100%', marginBottom: '15%'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() => {
                  if (userData?.token) {
                    navigation.navigate('Inspection');
                  } else {
                    navigation.navigate('LoginScreen');
                  }
                }}>
                <View style={styles.container}>
                  <Image
                    source={require('../Assets/Inspection.jpg')}
                    style={styles.image}
                  />
                  <View style={styles.overlay}>
                    <Text style={styles.text}>Inspection</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (userData?.token) {
                    navigation.navigate('Inspection');
                  } else {
                    navigation.navigate('LoginScreen');
                  }
                }}>
                <View style={styles.container}>
                  <Image
                    source={require('../Assets/ELearning.jpg')}
                    style={styles.image}
                  />
                  <View style={styles.overlay}>
                    <Text style={styles.text}>E Learning</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() => {
                  if (userData?.token) {
                    navigation.navigate('Inspection');
                  } else {
                    navigation.navigate('LoginScreen');
                  }
                }}>
                <View style={styles.container}>
                  <Image
                    source={require('../Assets/Doctor.jpg')}
                    style={styles.image}
                  />
                  <View style={styles.overlay}>
                    <Text style={styles.text}>FSSC 22000</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (userData?.token) {
                    navigation.navigate('Inspection');
                  } else {
                    navigation.navigate('LoginScreen');
                  }
                }}>
                <View style={styles.container}>
                  <Image
                    source={require('../Assets/Inspection.jpg')}
                    style={styles.image}
                  />
                  <View style={styles.overlay}>
                    <Text style={styles.text}>Inspection</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
        {route.params.pageHeader === 'FSSC 22000' && (
          <View style={{marginVertical: '5%', gap: 5}}>
            <Text style={{color: '#222222', fontSize: 14, fontWeight: '500'}}>
              OverView :
            </Text>
            <Text style={{textAlign: 'justify'}}>
              FSSC 22000 internal auditor training program is structured to
              provide an overall understanding of ISO 22000:2018 food safety
              management system requirements, sector-specific prerequisite
              programs (PRPs), (ISO/TS 22002-x-series or other specific PRP
              standards), and FSSC 22000 additional requirements. This 2-day
              FSSC 22000 internal auditor training course based on FSSC 22000
              Ver 6 standard, will be conducted by our experienced auditors and
              tutors. They have extensive knowledge and experience in conducting
              audits and providing training to numerous organizations from
              diverse industries. They will share their experiences and
              expertise on ISO 22000:2018 standards requirements.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Courses;

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
    marginTop: '10%',
  },
  image: {
    width: screenWidth > 360 ? 170 : 160,
    height: screenWidth > 360 ? 200 : 180,
    borderRadius: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    color: '#FFF',
  },
});
