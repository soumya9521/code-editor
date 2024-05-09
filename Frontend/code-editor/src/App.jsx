import { useEffect, useState } from "react";
import io from "socket.io-client";

import "./App.css";
import Shell from "./components/Shell";
const data = [
  { id: 1, code: "", output: "", count: 0 },
  { id: 2, code: "", output: "", count: 0 },
  { id: 3, code: "", output: "", count: 0 },
  { id: 4, code: "", output: "", count: 0 },
  { id: 5, code: "", output: "", count: 0 },
];
function App() {
  const socket = io("http://localhost:3000");
  const [counter, setCounter] = useState(1);
  const [shellObject, setShellObject] = useState([...data]);
  const [lastModifiedId, setLastModifiedId] = useState();
  const [inProgress, setInProgress] = useState(false);

  const onchangeHandler = (id, value) => {
    console.log(id);
    setLastModifiedId(id);
    setShellObject((prevShellObject) => {
      return prevShellObject.map((obj) => {
        if (obj.id === id) {
          return { ...obj, code: value };
        }
        return obj;
      });
    });
  };

  const handleExecute = () => {
    const lattestCode = shellObject.filter((obj) => {
      return obj.id == lastModifiedId;
    });
    setCounter((pre) => {
      return (pre = pre + 1);
    });
    setInProgress((pre) => {
      return !pre;
    });
    socket.emit("execute", lattestCode[0].code);
    // console.log(lattestCode[0].code);
  };
  socket.on("connection", (socket) => {
    console.log("Connected to Server", socket.id);
  });
  socket.on("result", (result) => {
    setShellObject((prevShellObject) => {
      return prevShellObject.map((obj) => {
        if (obj.id === lastModifiedId) {
          return { ...obj, output: result, count: counter };
        }
        return obj;
      });
    });
    setInProgress((pre) => {
      return !pre;
    });
  });

  // useEffect(() => {
  //   return () => {
  //     socket.disconnect();
  //   };
  // });

  return (
    <>
      <div>
        <div className="heading">My Code Editor</div>
        <div
          className="code-shell"
          style={{
            width: "100vw",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {shellObject.map((obj) => {
            return (
              <Shell
                id={obj.id}
                key={obj.id}
                code={obj.code}
                output={obj.output}
                count={obj.count}
                inProgress={inProgress}
                onchangeHandler={(value) => {
                  onchangeHandler(obj.id, value);
                }}
              />
            );
          })}
          <button onClick={handleExecute}>Run</button>
        </div>
      </div>
    </>
  );
}

export default App;
