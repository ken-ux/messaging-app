import {
  ExclamationCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/20/solid";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Message } from "../types";
import { storeRecents } from "../utils";

function MessagePage() {
  const [userConnected, setUserConnected] = useState(false);
  const [messagesLoaded, setMessagesLoaded] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { user } = useParams();
  const socket = useRef<WebSocket | null>(null);
  const messages = useRef<Message[] | null>(null);

  // Handles fetching previous messages and opening WebSocket connection.
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
      };
      // socket.current.onmessage = (e) => {
      //   console.log(e.data);
      // };
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

  // Handles sending new message.
  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

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
        const textArea = document.querySelector("textarea");
        if (textArea) {
          textArea.value = "";
        }
        const newMessage: Message = {
          sender: localStorage.getItem("user") as string,
          recipient: user as string,
          message_body: message_body,
          creation_date: new Date(),
        };
        if (messages.current) {
          messages.current.unshift(newMessage);
        } else {
          messages.current = [newMessage];
        }
      } else {
        setErrorMessage(
          "Message could not be sent. Wait a few seconds and try again.",
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
    }
    setDisabled(false);
  };

  let messageList;
  if (messagesLoaded) {
    if (messages.current !== null) {
      messageList = (
        <ul className="flex max-h-96 flex-col-reverse gap-2 overflow-auto">
          {messages.current.map((message, id) => {
            return (
              <li
                key={id}
                className={
                  `rounded border p-2 ` +
                  (message.sender === user
                    ? "self-start bg-white"
                    : "self-end border-indigo-400 bg-indigo-500 text-white")
                }
              >
                {message.message_body}
              </li>
            );
          })}
        </ul>
      );
    } else {
      messageList = <p>No messages. :-(</p>;
    }
  }

  return (
    <div className="page flex grow flex-col gap-4 p-6 md:max-w-3xl">
      <div className="flex gap-2">
        <UserCircleIcon className="h-10 w-10" />
        <p className="text-2xl font-semibold">{user}</p>
      </div>
      <div className="rounded-lg border border-slate-300 bg-slate-100 p-2">
        {messagesLoaded ? messageList : <p>Messages loading...</p>}
      </div>
      <form onSubmit={formHandler} className="flex gap-2">
        <textarea
          name="message"
          id="message"
          aria-label="message"
          className="h-14 grow rounded border border-slate-300 p-2"
          disabled={!userConnected || disabled}
          required
        ></textarea>
        <button
          type="submit"
          className={
            "h-14 rounded px-4" +
            (!userConnected || !disabled
              ? " bg-indigo-500 text-white"
              : " bg-slate-500 text-slate-300")
          }
          disabled={!userConnected || disabled}
          aria-label="send"
        >
          <PaperAirplaneIcon className="h-6 w-6" />
        </button>
      </form>
      {errorMessage && (
        <div className="flex items-center gap-2 rounded bg-red-100 px-2 py-1 font-medium text-red-700">
          <ExclamationCircleIcon className="h-5 w-5" />
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default MessagePage;
