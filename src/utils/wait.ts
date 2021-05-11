const wait = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export default wait
