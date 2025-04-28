import { useEffect, useState } from "react";

const useFetch = <T, P = undefined>(
  fetchFunction: (params?: P) => Promise<T>,
  params?: P
) => {
  const [data, setData] = useState<T>([] as T);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const data = await fetchFunction(params);
        setData(data);
      } catch (error) {
        setError("Failed to fetch data, check console log for more details.");
      }
    };

    fetchData();
  }, [fetchFunction, params]);

  return { data, error };
};

export default useFetch;
