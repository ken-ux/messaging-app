// import { useEffect } from "react";
import { useParams } from "react-router-dom";

function MessagePage() {
  const { user } = useParams();
  let socket: WebSocket;

  // useEffect(() => {
  //   const unloadCallback = () => {
  //     if (socket.readyState === WebSocket.OPEN) {
  //       socket.close();
  //     }
  //   };
  //   window.addEventListener("beforeunload", unloadCallback);
  //   return () => {
  //     window.removeEventListener("beforeunload", unloadCallback);
  //   };
  // });

  const clickHandler = () => {
    socket = new WebSocket(import.meta.env.VITE_WS_URL);
    socket.onopen = () => console.log("connection opened");
    socket.onmessage = (e) => {
      console.log(e.data);
    };
  };

  const clickHandlerTwo = () => {
    socket.send("pong from the client");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="max-h-96 bg-white p-2">
        <p>{user}: Hello</p>
        <p>me: hi</p>
      </div>

      <form action="" className="flex gap-2">
        <textarea
          name="message"
          id="message"
          aria-label="message"
          className="grow"
        ></textarea>
        <button type="submit" className="bg-slate-100 px-4">
          Send
        </button>
      </form>
      <button type="button" onClick={clickHandler}>
        Open Websocket Connection
      </button>
      <button type="button" onClick={clickHandlerTwo}>
        Send Websocket Message
      </button>
      <button type="button" onClick={() => socket.close()}>
        Close Websocket Connection
      </button>
      <button type="button" onClick={() => console.log(socket.readyState)}>
        Check Websocket State
      </button>
    </div>
  );
}

export default MessagePage;
