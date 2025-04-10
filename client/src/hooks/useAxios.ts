// src/hooks/useAxios.ts
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

interface UseAxiosProps {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

interface UseAxiosResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useAxios<T>({
  url,
  method,
  body = null,
  headers = {},
}: UseAxiosProps): UseAxiosResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance({
          url,
          method,
          data: body,
          headers,
        });
        setData(response.data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body, headers]);

  return { data, loading, error };
}

export default useAxios;
