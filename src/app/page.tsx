"use client";

import React, { useState } from "react";
import TranscriptionDisplay from "./components/TranscriptionDisplay";
import { ConversationItem } from "./types";
import { FaUpload, FaInfoCircle } from "react-icons/fa"; // Importing Font Awesome icons
import { parseTranscription } from "./utils/parseTranscription";

const Home: React.FC = () => {
  const [Conversation, setConversation] =
    useState<ConversationItem[] | null>(null);
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
          const parsedData = parseTranscription(json); // Parse the data immediately
          setConversation(parsedData); // Update the state with parsed data
          setError(null);
        } catch (err) {
          setError("Invalid file format. Please upload a valid JSON transcription file.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1>Transcription Viewer</h1>
      </header>

      {!Conversation && (
        <section style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              padding: "40px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              display: "inline-block",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <FaInfoCircle
              size={50}
              color="#007bff"
              style={{ marginBottom: "20px" }}
            />
            <h2>Welcome to Transcription Viewer</h2>
            <p style={{ fontSize: "1.1em" }}>
              This app allows you to upload JSON transcription files from AWS
              Transcribe and view the conversations in a user-friendly format.
              You can set custom names for the speakers and scrub through the
              conversation based on time.
            </p>
            <p style={{ marginTop: "30px" }}>
              <label
                htmlFor="file-upload"
                style={{
                  cursor: "pointer",
                  color: "#007bff",
                  display: "inline-block",
                }}
              >
                <FaUpload size={30} style={{ verticalAlign: "middle" }} />{" "}
                Upload your transcription file
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </p>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </section>
      )}

      {Conversation && (
        <TranscriptionDisplay
          conversation={Conversation}
          fileName={fileName}
        />
      )}
    </div>
  );
};

export default Home;
