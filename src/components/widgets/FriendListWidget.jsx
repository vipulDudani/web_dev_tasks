import Friend from "../Friend";
import { useEffect } from "react";
import { setFriends } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getEmailFromToken } from "../../helper/helper";

function FriendListWidget() {
  const dispatch = useDispatch();
  const Friends = useSelector((state) => state.auth.user?.friends);

  const getFriends = async () => {
    const token = localStorage.getItem("token");
    const { userId } = await getEmailFromToken();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/users/${userId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setFriends(data));
    } catch (error) {
      return Promise.reject();
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div className="dark:bg-gray-900 bg-gray-100 w-[20%] p-5 rounded-xl relative shadow-md max-h-fit md:w-full">
      <h3>Friend List</h3>
      {Friends?.length === 0 ? (
        <p>User don't have any friends</p>
      ) : (
        Friends.map((friend) => (
          <Friend key={friend._id} {...friend} friendId={friend._id} />
        ))
      )}
    </div>
  );
}

export default FriendListWidget;
