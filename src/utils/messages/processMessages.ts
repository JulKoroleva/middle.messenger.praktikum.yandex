export default function processMessages(
  messages: Array<Message>
): Array<Message> {
  return messages.map((message, index, arr) => {
    const currentDate = new Date(message.time).toDateString();
    const previousDate =
      index > 0 ? new Date(arr[index - 1].time).toDateString() : null;

    if (index === 0 || currentDate !== previousDate) {
      return { ...message, showDate: true };
    } else {
      return { ...message, showDate: false };
    }
  });
}
