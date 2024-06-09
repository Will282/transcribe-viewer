import React from "react";

interface Props {
  speaker: string;
  content: string;
  color: string;
  startTime: string;
  endTime: string;
}

const ChatMessage: React.FC<Props> = ({
  speaker,
  content,
  color,
  startTime,
  endTime,
}) => {
  return (
    <div className="mb-4">
      <div className="text-xs text-gray-500">
        <span>
          {startTime} - {endTime}
        </span>
      </div>
      <div className={`p-4 rounded-lg shadow-sm ${color} max-w-xl`}>
        <div className="text-sm font-semibold text-gray-700">{speaker}</div>
        <div className="mt-1 text-gray-800">{content}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
