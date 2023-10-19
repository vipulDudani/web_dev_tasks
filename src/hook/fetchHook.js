import axios from "axios";
import { useEffect, useState } from "react";
import { getEmailFromToken } from "../helper/helper";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER_URL;

/** CUSTOM HOOK TO FETCH USER DETAILS */
export default async function useFetch(query) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [getData, setData] = useState({
    isLoading: false,
    // apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        if (!query) {
          const { userId } = await getEmailFromToken();
          const { data, status } = await axios.get(`/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (status === 201) {
            setData((prev) => ({
              ...prev,
              isLoading: false,
              // apiData: data,
              status,
            }));
            dispatch(setUser(data));
          }
        } else {
          const { data, status } = await axios.get(`/users/${query}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (status === 201) {
            setData((prev) => ({
              ...prev,
              isLoading: false,
              // apiData: data,
              status,
            }));
            dispatch(setUser(data));
          }
        }
        setData((prev) => ({ ...prev, isLoading: false }));
      } catch (error) {
        setData((prev) => ({
          ...prev,
          // apiData: undefined,
          isLoading: false,
          serverError: error,
        }));
      }
    };
    fetchData();
  }, [token, dispatch, query]);
  return [getData, setData];
}
