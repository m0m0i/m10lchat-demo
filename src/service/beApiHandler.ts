import { Room } from "../types";

const createURLSearchParams = (data: string) => {
  const params = new URLSearchParams();
  params.append("name", data);
  return params;
};

export const roomCreateHandler = async (url: string, data: string) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: createURLSearchParams(data),
  };

  const createdRoom: Promise<Room> = await fetch(url, options)
    .then((response) => response.json())
    .then((room) => room)
    .catch((err) => console.log(err));

  return createdRoom;
};
