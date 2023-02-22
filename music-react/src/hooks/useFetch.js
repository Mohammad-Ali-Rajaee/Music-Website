import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = ({ url }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setResponse(res.data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return {
    loading,
    error,
    response,
  };
};

export default useFetch;
