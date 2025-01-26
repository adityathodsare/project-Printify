import React from "react";
import printerImg from "../assets/printer.png";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { CreateRoomApi, JoinRoomApi } from "../services/RoomService";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./logout"; // Correct path to logout.jsx

export const JoinCreateChat = () => {
  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  });

  function handleFormInputChange(event) {
    setDetail({ ...detail, [event.target.name]: event.target.value });
  }

  const { roomId, userName, setRoomId, setUserName, connected, setConnected } =
    useChatContext();

  const navigate = useNavigate();

  function validateForm() {
    if (detail.roomId === "" || detail.userName === "") {
      toast.error("Please fill all fields");
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (validateForm()) {
      const room = await JoinRoomApi(detail.roomId);
      toast.success("Joined room successfully");
      // join chat
      // console.log(detail);
      try {
        setUserName(detail.userName);
        setRoomId(room.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        console.log(error);
        if (error.response.status == 404) {
          toast.error("Room not found");
        } else {
          toast.error("Something went wrong");
        }
      }
    }
  }

  async function createRoom() {
    if (validateForm()) {
      // validate form

      console.log(detail);

      try {
        const response = await CreateRoomApi(detail.roomId);
        console.log(response);
        toast.success("Room created successfully");
        setUserName(detail.userName);
        setRoomId(response.roomId);
        setConnected(true);
        navigate("/chat");
        // forward to chat page
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          toast.error("Room already exists");
        } else {
          toast.error("Something went wrong");
        }
      }
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className=" border-2 dark:border-gray-900 rounded-lg p-10 w-full max-w-md flex flex-col gap-4 bg-gray-900">
        <div>
          <img src={printerImg} className="mx-auto w-20" alt="printer" />
        </div>
        <h1 className="text-2xl font-bold text-center text-orange-500">
          Join/create shop room
        </h1>
        <div className="">
          <label
            htmlFor="name"
            className="text-white font-semibold flex flex-col mb-2 text-b"
          >
            Your Name:
          </label>
          <input
            onChange={handleFormInputChange}
            value={detail.userName}
            placeholder="enter name here "
            type="text"
            name="userName"
            id="name"
            className="w-full p-2 rounded-md bg-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold"
          />
        </div>

        <div className="">
          <label
            htmlFor="roomId"
            className="text-white font-semibold flex flex-col mb-2 text-b"
          >
            Shop ID:
          </label>
          <input
            name="roomId"
            onChange={handleFormInputChange}
            value={detail.roomId}
            placeholder="enter shopID here "
            type="text"
            id="roomId"
            className="w-full p-2 rounded-md bg-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold"
          />
        </div>

        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={joinChat}
            className=" px-3 py-2 dark:bg-orange-500 hover:dark:bg-orange-400 rounded-lg dark:text-white font-bold"
          >
            Join
          </button>

          <button
            onClick={createRoom}
            className=" px-3 py-2  dark:bg-orange-500 hover:dark:bg-orange-400 rounded-lg dark:text-white font-bold "
          >
            Create
          </button>

          {/* <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/")}
          >
            logout
          </button> */}
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default JoinCreateChat;
