import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Message } from "../types";
import { storeRecents } from "../utils";

function MessagePage() {
  const [userConnected, setUserConnected] = useState(false);
  const [messagesLoaded, setMessagesLoaded] = useState(false);
  const { user } = useParams();
  const socket = useRef<WebSocket | null>(null);
  const messages = useRef<Message[] | null>(null);

  useEffect(() => {
    // Add user to list of recent chats.
    if (user) {
      storeRecents(user);
    }

    // Open websocket connection.
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

    // Add event listener to remove websocket connection when page unloads.
    window.addEventListener("beforeunload", unloadCallback);

    // Get messages between both users.
    const getMessages = async () => {
      try {
        const sender = localStorage.getItem("user");
        const url =
          import.meta.env.VITE_API_URL +
          `/message?sender=${sender}&recipient=${user}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        messages.current = data;
        setMessagesLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();

    return () => {
      window.removeEventListener("beforeunload", unloadCallback);
    };
  }, [user]);

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElements = e.currentTarget
      .elements as HTMLFormControlsCollection & {
      message: HTMLTextAreaElement;
    };

    const message_body = formElements.message.value;

    const formData = {
      sender: localStorage.getItem("user"),
      recipient: user,
      message_body: message_body,
    };

    try {
      const url = import.meta.env.VITE_API_URL + "/message";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        console.log("message sent");
      }
    } catch (error) {
      console.log(error);
    }
  };

  let messageList;
  if (messagesLoaded) {
    if (messages.current !== null) {
      messageList = messages.current.map((message, id) => {
        return (
          <p key={id}>
            {message.sender}: {message.message_body}
          </p>
        );
      });
    } else {
      messageList = <p>No messages. :-(</p>;
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="max-h-96 bg-white p-2">
        {messagesLoaded ? messageList : <p>Messages loading...</p>}
      </div>

      <form onSubmit={formHandler} className="flex gap-2">
        <textarea
          name="message"
          id="message"
          aria-label="message"
          className="grow p-2"
          disabled={userConnected ? false : true}
          required
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
