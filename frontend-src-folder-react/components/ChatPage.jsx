import React, { useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { ImExit } from "react-icons/im";
import { useState, useRef } from "react";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import { baseURL } from "../config/AxiosHelper";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import toast from "react-hot-toast";
import { LoadMessages } from "../services/RoomService";
import { timeAgo } from "../config/helper";
import { IoMdCloudUpload } from "react-icons/io";

export const ChatPage = () => {
  const { roomId, userName, connected } = useChatContext();
  // console.log(roomId);
  // console.log(userName);
  // console.log(connected);

  const navigate = useNavigate();
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, userName, roomId]);

  const [messages, setMessages] = useState([
    // {
    //   sender: "Aditya",
    //   content: "Hi There",
    // },
    // {
    //   sender: "Aditya",
    //   content: "Hi There",
    // },
    // {
    //   sender: "Aditya",
    //   content: "Hi There",
    // },
    // {
    //   sender: "om",
    //   content: "Hi There",
    // },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  // page init == msg load

  useEffect(() => {
    async function loadMessages() {
      try {
        const messages = await LoadMessages(roomId);
        setMessages(messages);
      } catch (error) {}
    }
    loadMessages();
  }, []);

  // stomp client init == msg load

  useEffect(() => {
    const ConnectWebSocket = () => {
      // sock js object
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);
      client.connect({}, () => {
        setStompClient(client);
        toast.success("Connected to server");
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          console.log(message);

          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };
    ConnectWebSocket();
  }, [roomId]);

  // send msg handler

  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      console.log(input);
      const message = { sender: userName, content: input.trim() };
      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInput("");
    }
  };

  // Function to detect and replace URLs with clickable links
  const parseMessageContent = (content) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return content.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
  };

  return (
    <div>
      <header className="dark:border-gray-700  fixed w-full dark:bg-gray-900 py-5 shadow flex justify-around items-center">
        <div className="">
          {/* room is */}
          <h1 className="text-xl font-bold  text-orange-500">
            ShopID: <span>{roomId}</span>
          </h1>
        </div>
        <div>
          {/* user name */}
          <h1 className="text-xl font-bold  text-orange-500">
            User: <span>{userName}</span>
          </h1>
        </div>
        <div>
          {/* leave room */}
          <button
            onClick={() => navigate("/")}
            className="ml-4 dark:bg-red-500 dark:text-black dark:font-bold dark:hover:bg-red-400 rounded-lg px-3 py-1 w-16 border-2 border-red-300 mx-auto"
          >
            <ImExit className="text-2xl font-bold " size={30} />
          </button>
        </div>
      </header>

      <main className="py-20 px-10   w-4/5 dark:bg-gray-900 mx-auto h-screen overflow-auto ">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex my-2 ${
              message.sender === userName ? "justify-end" : "justify-start"
            }`}
          >
            <div>
              {message.sender === userName ? (
                <div className="flex flex-row-reverse gap-2">
                  <img
                    className="h-7 w-7"
                    src="https://avatar.iran.liara.run/public/17"
                    alt=""
                  />
                  <div className="border flex flex-col gap-1 p-1 rounded-lg bg-gray-950">
                    <p className="font-bold text-sm">{message.sender}</p>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: parseMessageContent(message.content),
                      }}
                    ></p>
                    <p className="text-xs text-gray-400">
                      {timeAgo(message.timeStamp)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row gap-2">
                  <img
                    className="h-7 w-7"
                    src="https://avatar.iran.liara.run/public/17"
                    alt=""
                  />
                  <div className="border flex flex-col gap-1 p-1 rounded-lg bg-gray-950">
                    <p className="font-bold text-sm">{message.sender}</p>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: parseMessageContent(message.content),
                      }}
                    ></p>
                    <p className="text-xs text-gray-400">
                      {timeAgo(message.timeStamp)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </main>

      <div className="fixed flex justify-between w-full h-12 bottom-2">
        <div className="flex w-2/3 border mx-auto  border-gray-900 bg-gray-900 h-full rounded-lg ">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 rounded-lg  bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold"
            type="text"
            placeholder="Type your message here"
          />

          <button className="ml-4 dark:bg-orange-500 dark:text-black dark:font-bold dark:hover:bg-orange-400 rounded-lg px-3 py-1 w-16 border-2 border-orange-300">
            <a href="https://cms1.publuu.com" target="_blank">
              <IoMdCloudUpload className="text-2xl font-bold " size={30} />
            </a>
          </button>

          <button
            className="ml-4 dark:bg-orange-500 dark:text-black dark:font-bold dark:hover:bg-orange-400 rounded-lg px-3 py-1 w-16 border-2 border-orange-300"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <GrAttachment className="text-2xl font-bold " size={30} />
          </button>

          <input type="file" id="fileInput" style={{ display: "none" }} />

          <button
            onClick={sendMessage}
            className=" ml-4 dark:bg-orange-500 dark:text-black dark:font-bold dark:hover:bg-orange-400 rounded-lg px-3 py-1 w-16 border-2 border-orange-300"
          >
            <IoIosSend className="text-2xl font-bold " size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
