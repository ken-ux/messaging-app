import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

function MessagePage() {
  const [userConnected, setUserConnected] = useState(false);
  const { user } = useParams();
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (socket.current === null) {
      socket.current = new WebSocket(import.meta.env.VITE_WS_URL);
      socket.current.onopen = () => {
        setUserConnected(true);
        console.log("websocket connection opened");
      };
    }

    const unloadCallback = () => {
      if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        socket.current.close();
        socket.current = null;
      }
    };
    window.addEventListener("beforeunload", unloadCallback);
    return () => {
      window.removeEventListener("beforeunload", unloadCallback);
    };
  });

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElements = e.currentTarget
      .elements as HTMLFormControlsCollection & {
      message: HTMLTextAreaElement;
    };

    const message = formElements.message.value;

    if (socket.current && message !== "") {
      const obj = {
        sender: localStorage.getItem("user"),
        recipient: user,
        message: message,
      };
      socket.current.send(JSON.stringify(obj));
    } else {
      console.error("Message not sent.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="max-h-96 bg-white p-2">
        <p>{user}: Hello</p>
        <p>me: hi</p>
      </div>

      <form onSubmit={formHandler} className="flex gap-2">
        <textarea
          name="message"
          id="message"
          aria-label="message"
          className="grow p-2"
          disabled={userConnected ? false : true}
        ></textarea>
        <button
          type="submit"
          className={
            "bg-slate-100 px-4" +
            (userConnected
              ? " bg-slate-100 text-black"
              : " bg-slate-500 text-slate-300")
          }
          disabled={userConnected ? false : true}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default MessagePage;
