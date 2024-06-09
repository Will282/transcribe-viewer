import { Transcription, ConversationItem } from "../types";

export const parseTranscription = (data: Transcription): ConversationItem[] => {
  const conversation: ConversationItem[] = [];
  let currentSpeaker = "";
  let currentContent = "";
  let startTime = "";
  let endTime = "";

  data.results.items.forEach((item) => {
    if (item.speaker_label !== currentSpeaker) {
      if (currentSpeaker) {
        conversation.push({
          speaker: currentSpeaker,
          content: currentContent.trim(),
          startTime,
          endTime,
        });
      }
      currentSpeaker = item.speaker_label;
      currentContent = item.alternatives[0].content;
      startTime = item.start_time || "";
      endTime = item.end_time || "";
    } else {
      currentContent +=
        item.type === "pronunciation"
          ? ` ${item.alternatives[0].content}`
          : item.alternatives[0].content;
      endTime = item.end_time || endTime;
    }
  });

  if (currentSpeaker) {
    conversation.push({
      speaker: currentSpeaker,
      content: currentContent.trim(),
      startTime,
      endTime,
    });
  }

  return conversation;
};
