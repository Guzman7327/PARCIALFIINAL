export interface Iimages {
    id:           string;
    author:       string;
    width:        number;
    height:       number;
    url:          string;
    download_url: string;
}

export const getimages = (): Promise<Image[]> => {
  return fetch('URL_DEL_ENDPOINT')
    .then(response => response.json());
