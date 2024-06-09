import { FaUpload, FaInfoCircle } from "react-icons/fa";

const UploadSection: React.FC<{
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
}> = ({ handleFileUpload, error }) => (
  <section className="upload-section">
    <div className="upload-box">
      <FaInfoCircle size={50} color="#007bff" className="icon" />
      <h2>Welcome to Transcription Viewer</h2>
      <p className="description">
        This app allows you to upload diarized transcription JSON output files
        from Amazon Transcribe and view the conversations in a user-friendly
        format.
        <br></br>
        See an example file in the Transcribe documentation{" "}
        <a href="https://docs.aws.amazon.com/transcribe/latest/dg/diarization.html">
          here
        </a>
        .<br></br>
        You can set custom names for the speakers and scrub through the
        conversation based on time.
      </p>
      <p className="upload-prompt">
        <label htmlFor="file-upload" className="upload-label">
          <FaUpload size={30} className="icon" /> Upload your transcription file
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="file-input"
        />
      </p>
      {error && <p className="error-message">{error}</p>}
    </div>
  </section>
);
export default UploadSection;
