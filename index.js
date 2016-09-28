import React from 'react'
import { Text, StyleSheet, Animated, View, Easing } from 'react-native'
import nodeEmoji from 'node-emoji'

class EmojiSpinner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      angle: new Animated.Value(0),
    }
  }

  static propTypes = {
    emojiName: React.PropTypes.string.isRequired,
    emojiSize: React.PropTypes.number,
  }

  componentDidMount() {
    this._animate()
  }

  _animate = () => {
    this.state.angle.setValue(0)
    this._anim = Animated.timing(this.state.angle, {
      toValue: 360 * 400,
      duration: 720 * 400,
      easing: Easing.linear
    }).start(this._animate)
  }

  getRotationAnimation() {
    return [styles.rotateCard,
      {transform: [
        {rotate: this.state.angle.interpolate({
          inputRange: [0, 360],
          outputRange: ['0deg', '360deg']
        })},
      ]}
    ]
  }

  render() {
    const { emojiName, emojiSize, containerStyles } = this.props

    const emoji = nodeEmoji.get(emojiName)
    return (
      <View style={[styles.container, containerStyles]}>
        <Animated.View style={this.getRotationAnimation()}>
          <Text style={{fontSize: emojiSize}}>{ emoji }</Text>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rotateCard: {
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
})

export default EmojiSpinner
