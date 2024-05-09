import React from "react";

const Shell = ({ code, output, count, inProgress, onchangeHandler }) => {
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        {inProgress ? (
          <span> * </span>
        ) : (
          <input
            type="text"
            className="code-output"
            readOnly={true}
            value={count}
          />
        )}
        <textarea
          name=""
          placeholder="Write your code here"
          className="code-area"
          rows={5}
          value={code}
          onChange={(e) => {
            onchangeHandler(e.target.value);
          }}
        ></textarea>
      </div>

      <input
        type="text"
        className="code-output"
        readOnly={true}
        value={output}
      />
    </div>
  );
};

export default Shell;
