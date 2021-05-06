import React from 'react'
import { Animated } from 'react-native'

const FadeInView: React.FC = ({ children }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start()
  }, [fadeAnim])

  return (
    <Animated.View
      style={{
        flex: 1,
        width: '100%',
        opacity: fadeAnim
      }}
    >
      {children}
    </Animated.View>
  )
}

export default FadeInView
