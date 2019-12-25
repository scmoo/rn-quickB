
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Header } from './Headers'
import { p } from './normalize';
import Images from '../constants/Images';
import { ApiClient } from '../components/Api';

export default class _UpdatedDropDown extends Component {

  static navigationOptions = () => ({
    header: null
  });

  constructor() {
    super();
    this.state = {
      mykey: -1,
      myResults: null
    }
  }

  componentDidMount() {
    const API = this.props.navigation.state.params.api

    API
      .then(res => {
        console.log('res_________', res)
        this.setState({ myResults: res})
      })
      .catch(error => {
        alert('error')
      })
  }

  render() {
    const { navigation } = this.props
    const title = navigation.state.params.title
    const { mykey, myResults } = this.state

    return (
      <View style={styles.container}>

        <Header
          title={title}
          right={(
            <TouchableOpacity
              style={styles.rightHeader}
              onPress={() => {
                mykey !== -1 && navigation.state.params.update(myResults[mykey])
                navigation.pop()
              }}
            >
              <Image source={Images.ok} style={styles.headerImg} />
            </TouchableOpacity>
          )}
          onBack={() => navigation.pop()}
        />
        <ScrollView style={styles.view}>

          <Text style={styles.text}>{title}</Text>
          {
           myResults && myResults.map((item, key) => (
              <View style={styles.board} key={key}>
                <View style={styles.input}>
                  <Text style={styles.h1}>{item.nombre ? item.nombre : item}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                  this.setState({ mykey: key })
                }}>
                  {mykey == key ?
                    <Image
                      source={Images.paquetesCheck}
                      style={{ width: p(25), height: p(25), marginLeft: p(12) }}
                    /> :
                    <Image
                      source={Images.paquetesUnCheck}
                      style={{ width: p(25), height: p(25), marginLeft: p(12) }}
                    />
                  }
                </TouchableOpacity>
              </View>
            ))
          }
          <View style={{ marginTop: p(40) }}></View>

        </ScrollView>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    padding: p(22),
  },

  h1: {
    fontFamily: 'GeosansLight',
    fontSize: p(20),
  },
  h2: {
    fontFamily: 'GeosansLight',
    fontSize: p(13),
  },
  board: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: p(8),
  },
  rightHeader: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderLeftColor: '#e3e4e5',
    borderLeftWidth: p(3),
    paddingLeft: p(20)
  },
  text: {
    fontFamily: 'GeosansLight',
    fontSize: p(20),
    marginLeft: p(6),
    marginVertical: p(12)
  },
  input: {
    flex: 1,
    // height: p(32),
    paddingVertical: p(8),
    backgroundColor: 'rgba(236, 240, 241,0.6)',
    justifyContent: 'center',
    color: 'rgba(44, 62, 80,0.9)',
    fontSize: p(20),
    fontFamily: 'GeosansLight',
    paddingHorizontal: p(12),
    borderRadius: p(20)
  },


  headerImg: {
    width: p(40),
    height: p(40)
  },
  circle: {
    width: p(100),
    height: p(100),
    borderRadius: p(50),
    borderColor: '#555',
    borderWidth: p(2),
  }
})
