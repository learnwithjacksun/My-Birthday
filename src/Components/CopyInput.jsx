import { useState } from "react";
import PropTypes from "prop-types";

const CopyInput = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Hide message after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="flex border border-line bg-secondary rounded-lg overflow-hidden">
      <input type="text" value={text} readOnly className="bg-transparent pl-4 text-[13px] flex-1" />
      <button className="py-3 px-4 text-sm shadow bg-white font-semibold text-green-500" onClick={copyToClipboard}>
        {copied ? (
          <>
            <i className="fa-solid fa-check text-green-500"></i> Copied
          </>
        ) : (
          <>
            <i className="fa-regular fa-clone text-green-500"></i> Copy
          </>
        )}
      </button>
    </div>
  );
};

CopyInput.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CopyInput;
