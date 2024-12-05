import { environment } from "../../environments/environment.development";
import { sleep } from "../helpers/sleep";
import { Iimage } from "../interfaces/Iimage";

const URL = environment.url;

export const getimages = async (id: string): Promise<Iimage> => {
  console.log({ URL });
  await sleep(1500);

  try {
  const resp = await fetch(`${URL}/images/${id}`);
   if (!resp.ok) throw "Can't load character";
    const character: Iimage = await resp.json();
    console.log({ image });
    return image;
  }
  catch (error) {
    throw "Can't load image";
  }
}
