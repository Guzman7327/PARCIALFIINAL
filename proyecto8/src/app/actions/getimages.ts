import { environment } from "../../environments/environment.development";
import { sleep } from "../helpers/sleep";
import { Iimages } from "../interfaces/images";

const URL = environment.url;

export const getimages = async (): Promise<Iimages> => {


  await sleep(2000);

  try {
  const response = await fetch(`${URL}/images`);
  if (!response.ok) {
    throw new Error("Error fetching images");
  }
  const data: Iimages  = await response.json();
  console.log(data);
  return data;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
};
