"use client";

import React, { useState, useEffect } from "react";
import { ConversationItem } from "../types";
import ChatMessage from "./ChatMessage";
import { formatTime } from "../utils/time";

interface Props {
  conversation: ConversationItem[];
  fileName: string;
}

const colors = [
  "bg-red-200",
  "bg-green-200",
  "bg-blue-200",
  "bg-yellow-200",
  "bg-pink-200",
  "bg-teal-200",
  "bg-purple-200",
  "bg-lightGreen-200",
  "bg-indigo-200",
  "bg-lime-200",
  "bg-lightBlue-200",
  "bg-amber-200",
  "bg-cyan-200",
  "bg-orange-200",
  "bg-blueGray-200",
  "bg-deepOrange-200",
  "bg-gray-200",
  "bg-brown-200",
];

const TranscriptionDisplay: React.FC<Props> = ({
  conversation,
  fileName,
}) => {
  const [speakerNames, setSpeakerNames] = useState<{ [key: string]: string }>(
    {},
  );
  const [tempSpeakerNames, setTempSpeakerNames] = useState<{
    [key: string]: string;
  }>({});
  const [speakers, setSpeakers] = useState<string[]>([]);
  const [scrollTime, setScrollTime] = useState<number>(0);
  const maxTime = conversation.length
    ? parseFloat(conversation[conversation.length - 1].endTime)
    : 0;

  useEffect(() => {
    const uniqueSpeakers = Array.from(
      new Set(conversation.map((item) => item.speaker)),
    );
    setSpeakers(uniqueSpeakers);
  }, [conversation]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollTime = (scrollPosition / maxScroll) * maxTime;
      setScrollTime(scrollTime);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [maxTime]);

  const handleNameChange = (
    speaker: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTempSpeakerNames({ ...tempSpeakerNames, [speaker]: event.target.value });
  };

  const handleSaveNames = () => {
    setSpeakerNames({ ...speakerNames, ...tempSpeakerNames });
  };

  const getSpeakerColor = (speaker: string) => {
    const index = speakers.indexOf(speaker);
    return colors[index % colors.length];
  };

  const getDefaultName = (speaker: string) => {
    const index = speakers.indexOf(speaker) + 1;
    return `Speaker ${index}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="fixed top-0 w-full bg-white z-10 border-b border-gray-300 p-4 shadow">
        <h2 className="text-xl font-semibold">{fileName}</h2>
        <div className="flex flex-wrap mt-2">
          {speakers.map((speaker) => (
            <div key={speaker} className="mr-4 mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Set name for {getDefaultName(speaker)}:
              </label>
              <input
                type="text"
                value={tempSpeakerNames[speaker] || speakerNames[speaker] || ""}
                onChange={(event) => handleNameChange(speaker, event)}
                className="mt-1 p-2 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleSaveNames}
          className="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700"
        >
          Save All Names
        </button>
        <div className="fixed top-20 right-4 bg-white p-2 border border-gray-300 rounded shadow">
          Current Time: {formatTime(scrollTime)}
        </div>
      </div>
      <div className="pt-40 pb-10 px-4">
        {conversation.map((item, index) => (
          <ChatMessage
            key={index}
            speaker={
              speakerNames[item.speaker] ||
              tempSpeakerNames[item.speaker] ||
              getDefaultName(item.speaker)
            }
            content={item.content}
            color={getSpeakerColor(item.speaker)}
            startTime={formatTime(parseFloat(item.startTime))}
            endTime={formatTime(parseFloat(item.endTime))}
          />
        ))}
      </div>
    </div>
  );
};

export default TranscriptionDisplay;
