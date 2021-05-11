import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RNModal from 'react-native-modal'

import LocalizationContext from '../context/LocalizationContext'

import TextButton from './TextButton'

type Props = {
  isVisible: boolean
  title: string
  onSubmit: () => void
  onClose: () => void
}

const Modal: React.FC<Props> = ({ isVisible, title, onSubmit, onClose }) => {
  const { t } = React.useContext(LocalizationContext)

  const handleSubmit = React.useCallback(() => {
    onSubmit()
    onClose()
  }, [])

  return (
    <RNModal isVisible={isVisible}>
      <View style={s.content}>
        <Text style={s.title}>{title}</Text>

        <View
          style={{ flex: 1, justifyContent: 'flex-end', marginLeft: '50%' }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TextButton title={t('buttons.yes')} onPress={handleSubmit} />
            <TextButton title={t('buttons.cancel')} onPress={onClose} />
          </View>
        </View>
      </View>
    </RNModal>
  )
}

const s = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    minHeight: 200
  },

  title: {
    fontSize: 26,
    fontWeight: '500'
  }
})

export default Modal
