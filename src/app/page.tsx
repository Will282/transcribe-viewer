"use client";

import React, { useState } from "react";
import TranscriptionDisplay from "./components/TranscriptionDisplay";
import { ConversationItem } from "./types";
import { parseTranscription } from "./utils/parseTranscription";
import "./styles/Home.css";
import UploadSection from "./components/UploadSection";

const Home: React.FC = () => {
  const [Conversation, setConversation] = useState<ConversationItem[] | null>(
    null,
  );
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string;
          const json = JSON.parse(result);
          const parsedData = parseTranscription(json);
          setConversation(parsedData);
          setError(null);
        } catch (err) {
          setError(
            "Invalid file format. Please upload a valid JSON transcription file.",
          );
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Transcription Viewer</h1>
      </header>

      {!Conversation && (
        <UploadSection handleFileUpload={handleFileUpload} error={error} />
      )}

      {Conversation && (
        <TranscriptionDisplay conversation={Conversation} fileName={fileName} />
      )}
    </div>
  );
};

export default Home;
