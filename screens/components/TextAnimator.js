import React,{useEffect} from 'react';
import { View, StyleSheet, Animated } from 'react-native';

class TextAnimator extends React.Component {
  
  animatedValues = [];
  animations = [];
  constructor(props) {
    super(props);

    const textArr = props.content.trim().split(' ');0
    textArr.forEach((_, i) => {
      this.animatedValues[i] = new Animated.Value(0);
    });
    this.textArr = textArr;
  }

  componentDidMount() {
    console.log('Called');
    this.animate(1);
  }
  

  componentWillUnmount() {
    
    this.animate(0)
  }

  animate(toValue = 1) {
    this.toValue = toValue
    this.animations = this.textArr.map((_, i) => {
      return Animated.timing(this.animatedValues[i], {
        toValue,
        duration: this.props.timing,
        useNativeDriver: true
      });
    });
    // Animated.stagger(this.props.timing / 5, toValue === 0 ? this.animations.reverse() : this.animations).start(() => {
    //   setTimeout(() => this.animate(toValue === 0 ? 1 : 0), 1000)
    //   if (this.props.onFinish) {
    //     this.props.onFinish(toValue === 1);
    //   }
    // });
    Animated.stagger(100,this.animations).start();
  }
  
  render() {
    return (
      <View style={[this.props.style, styles.textWrapper]}>
        {this.textArr.map((v, i) => {
          return (
            <Animated.Text
              key={`${v}-${i}`}
              style={[
                this.props.textStyle,
                styles.textStyle,
                {
                  opacity: this.animatedValues[i],
                  transform: [
                    {
                      translateY: Animated.multiply(
                        this.animatedValues[i],
                        new Animated.Value(1)
                      ),
                    },
                  ],
                },
              ]}>
              {v}
              {`${i < this.textArr.length ? ' ' : ''}`}
            </Animated.Text>
          );
        })}
      </View>
    );
  }
}

TextAnimator.defaultProps = {
  timing: 600,
  content: '',
};

export default TextAnimator;

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
