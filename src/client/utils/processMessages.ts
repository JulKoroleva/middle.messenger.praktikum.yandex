export default function processMessages(messages: Array<Message>): Array<Message> {
    return messages.map((message, index, arr) => {
      if (index === 0 || message.time.split(' ')[0] !== arr[index - 1].time.split(' ')[0]) {
        return { ...message, showDate: true };
      } else {
        return { ...message, showDate: false };
      }
    });
  }