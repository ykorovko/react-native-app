import React from 'react'
import {
  NativeSyntheticEvent,
  TargetedEvent,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  Animated,
  View,
  StyleProp,
  TextInputProps,
  TextStyle
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

type Props = {
  style?: StyleProp<TextStyle>
  label: string
  value: string
  onChangeText: () => void
  inputProps?: TextInputProps
  endAdornment?: JSX.Element
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void
}

const TextInput: React.FC<Props> = React.forwardRef((props, ref) => {
  const {
    style,
    label,
    value,
    onChangeText,
    inputProps,
    endAdornment,
    onBlur,
    onFocus
  } = props

  const innerRef = React.useRef(ref)

  const [isFocused, setFocused] = React.useState(false)

  const animatedOpacity = React.useRef(new Animated.Value(0)).current
  const animatedTop = React.useRef(new Animated.Value(30)).current

  const withLabel = isFocused || !!value

  const handleFocus = React.useCallback(
    (event) => {
      Animated.timing(animatedTop, {
        toValue: 10,
        duration: 150,
        useNativeDriver: true,
        isInteraction: true
      }).start()

      setFocused(true)

      if (onFocus) onFocus(event)
    },
    [withLabel, animatedOpacity, animatedTop]
  )

  const handleBlur = React.useCallback(
    (event) => {
      if (!value) {
        Animated.timing(animatedTop, {
          toValue: 30,
          duration: 150,
          useNativeDriver: true,
          isInteraction: true
        }).start()

        setFocused(false)
      }

      if (onBlur) onBlur(event)
    },
    [value, animatedOpacity]
  )

  const placeholder = !isFocused ? label : ''

  return (
    <View style={s.container}>
      <TouchableOpacity
        style={[s.wrapper, withLabel ? s.focused : {}, style]}
        onPress={() => (innerRef as any).current.focus()}
      >
        <Animated.Text
          style={{
            ...s.label,
            transform: [{ translateY: animatedTop }],
            opacity: animatedTop.interpolate({
              inputRange: [10, 30],
              outputRange: [1, 0]
            })
          }}
        >
          {label}
        </Animated.Text>

        <RNTextInput
          ref={innerRef}
          style={[s.input, isFocused ? s.inputFocused : {}]}
          placeholder={placeholder}
          value={value}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...inputProps}
        />
      </TouchableOpacity>

      {endAdornment &&
        React.cloneElement(endAdornment, {
          style: s.endAdornment
        })}
    </View>
  )
})

const s = StyleSheet.create({
  container: {
    position: 'relative'
  },

  wrapper: {
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 25
  },

  focused: {
    backgroundColor: '#fff'
  },

  label: {
    position: 'absolute',
    left: 15,
    fontSize: 16
  },

  input: {
    minWidth: '100%',
    fontSize: 20
  },

  inputFocused: {
    marginTop: 10,
    marginBottom: -10
  },

  endAdornment: {
    position: 'absolute',
    top: 25,
    right: 10
  }
})

export default TextInput
