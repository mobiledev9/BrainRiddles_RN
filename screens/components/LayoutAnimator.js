import React, { Component } from 'react';
import { Animated, TouchableOpacity, Text, View, StyleSheet } from 'react-native';


export default class App extends Component {
   
  constructor(props) {
    super(props)

    this.moveAnimation = new Animated.ValueXY({ x: 0, y: 0 })
  }

  _moveBall = () => {
    Animated.spring(this.moveAnimation, {
      toValue: {x: 250, y: 10},
    }).start()
  }

  _backMoveBall = () =>{
      Animated.spring({x: 250, y: 10},{
        toValue: { x: 10, y: 450 },
      }).start
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.tennisBall, this.moveAnimation.getLayout()]}>
          <TouchableOpacity style={styles.button} onPress={this._moveBall}>
            <Text style={styles.buttonText}>Press</Text>
          </TouchableOpacity>        
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  tennisBall: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'greenyellow',
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  button: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  buttonText: {
    fontSize: 24,
    color: '#333',
  }
});
