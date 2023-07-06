import { IFolder } from "../components/Tree";

const SERVER_URL_DEV = "http://localhost:3004/";

const jsonRequest = (url: string, options = {}) => {
  return fetch(url, {
    headers: { "content-type": "application/json" },
    ...options,
  }).then((response) => response.json());
};

export const getRequest = (url: string, o = {}) => {
  const options = {
    method: "GET",
    ...o,
  };

  const req = jsonRequest(url, options);

  return req;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postRequest = (url: string, data: any) => {
  const options = {
    method: "POST",
    body: JSON.stringify(data),
  };

  const req = jsonRequest(url, options);

  return req;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const putRequest = (url: string, data: any) => {
  const options = {
    method: "PUT",
    body: JSON.stringify(data),
  };

  const req = jsonRequest(url, options);

  return req;
};

export const deleteRequest = (url: string, o = {}) => {
  const options = {
    method: "DELETE",
    ...o,
  };

  const req = jsonRequest(url, options);

  return req;
};

export const fetchFolders = () => {
  const req = getRequest(`${SERVER_URL_DEV}folders`);

  return req;
};

export const fetchFolder = (id: string) => {
  const req = getRequest(`${SERVER_URL_DEV}folders/${id}`);

  return req;
};

export const createFolder = (folder: IFolder) => {
  const req = postRequest(`${SERVER_URL_DEV}folders`, folder);

  return req;
};

export const updateFolder = (folder: IFolder) => {
  const req = putRequest(`${SERVER_URL_DEV}folders/${folder.id}`, folder);

  return req;
};

export const deleteFolder = (folder: IFolder) => {
  const req = deleteRequest(`${SERVER_URL_DEV}folders/${folder.id}`, folder);

  return req;
};
