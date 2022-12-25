const loadMessages = async () => {
  const response = await fetch('/api/chat/load-messages')
  const messages = await response.json()

  const formattedLoadedMessages = messages.data.map((item) => ({
    ...item,
    messageId: item._id,
  }))

  return formattedLoadedMessages
}

export default loadMessages