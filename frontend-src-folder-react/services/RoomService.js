import { httpClient } from "../config/AxiosHelper";
export const CreateRoomApi = async (roomDetail) => {
  const response = await httpClient.post("/api/v1/rooms", roomDetail);
  return response.data;
};

export const JoinRoomApi = async (roomId) => {
  const response = await httpClient.get(`/api/v1/rooms/${roomId}`, roomId);
  return response.data;
};

export const LoadMessages = async (roomId) => {
  const response = await httpClient.get(`/api/v1/rooms/${roomId}/messages`);
  return response.data;
};
