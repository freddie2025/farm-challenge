import { useState, useEffect } from "react";

export const useFetch = <T>(fetchFunction: () => Promise<T>) => {
  const [data, setData] = useState<T>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchFunction();
      setData(result);
    };

    fetchData();
  }, [fetchFunction]);

  return { data };
};
