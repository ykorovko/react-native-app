import React from 'react'
import {
  NativeSyntheticEvent,
  TargetedEvent,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  Animated,
  View
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

type Props = {
  label: string
  value: string
  onChangeText: () => void
  inputProps?: { [key: string]: any }
  endAdornment?: JSX.Element
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void
}

const TextInput: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  inputProps,
  endAdornment,
  onBlur,
  onFocus
}) => {
  const [isFocused, setFocused] = React.useState(false)

  const inputRef = React.useRef()

  const animatedOpacity = React.useRef(new Animated.Value(0)).current
  const animatedTop = React.useRef(new Animated.Value(30)).current

  const withLabel = isFocused || !!value

  React.useEffect(() => {}, [])

  const handleFocus = React.useCallback(
    (event) => {
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
        isInteraction: true
      }).start()

      Animated.timing(animatedTop, {
        toValue: 10,
        duration: 100,
        useNativeDriver: false,
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
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
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
        style={[s.wrapper, withLabel ? s.focused : {}]}
        onPress={() => (inputRef as any).current.focus()}
      >
        <Animated.Text
          style={{
            ...s.label,
            top: animatedTop,
            opacity: animatedOpacity
          }}
        >
          {label}
        </Animated.Text>

        <RNTextInput
          ref={inputRef}
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
}

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
