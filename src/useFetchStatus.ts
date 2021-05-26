import { useState } from "react";

type FetchStatus = {
  loading: boolean;
  error: {
    message: string | null;
  } | null;
  data: any | null;
};

const defaultFetchStatus: FetchStatus = {
  loading: false,
  error: null,
  data: null,
};

const getData = (number: number) => {
  return {
    hats: {
      color: "blue",
      amount: 5,
      random: number,
    },
  };
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const mockFetch = new Promise((resolve, reject) => {
  setTimeout(() => {
    const random = getRandomInt(1000);
    const data = getData(random);
    if (random % 2 !== 0) {
      reject(`The number was not even, it was: ${random}`);
    } else {
      resolve(data);
    }
  }, 3000);
});

export const asyncRequest = async (setStatus: any) => {
  setStatus({ loading: true, error: null, data: null });
  try {
    const data = await mockFetch;
    setStatus({ loading: false, error: null, data: data });
  } catch (err) {
    setStatus({ loading: false, error: { message: err }, data: null });
  }
};

export const useFetchStatus = (): [FetchStatus, any] => {
  const [data, setFetchStatus] = useState<FetchStatus>(defaultFetchStatus);

  return [data, setFetchStatus];
};
