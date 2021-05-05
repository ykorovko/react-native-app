import styled from '@emotion/native'

type TextProps = {
  fontSize?: number
  bold?: boolean
  centered?: boolean
}

export const Container = styled.View({
  flex: 1,
  backgroundColor: '#fff',
  paddingHorizontal: 15
})

export const ContainerCentered = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginHorizontal: 30
})

export const Title = styled.Text({
  fontSize: 32,
  marginBottom: 8,
  fontWeight: 'bold'
})

export const TextStyled = styled.Text<TextProps>((props) => ({
  fontSize: props.fontSize || 20,
  fontWeight: props.bold ? '600' : '400',
  textAlign: props.centered ? 'center' : 'left'
}))

export const Divider = styled.View({
  marginVertical: 15,
  borderBottomWidth: 1,
  borderColor: '#ccc'
})

export const Label = styled.Text({
  fontSize: 20
})

export const Grid = styled.View(
  ({
    spacing,
    style = {}
  }: {
    spacing: number
    style?: Record<string, unknown>
  }) => ({
    width: '100%',
    paddingVertical: spacing * 8,
    ...style
  })
)
