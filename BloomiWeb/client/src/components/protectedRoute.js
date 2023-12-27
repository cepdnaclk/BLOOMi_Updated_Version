import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser} from "../redux/userSlice";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";


function ProtectedRoute(props) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "api/user/get-user-info-by-id",
        {token: localStorage.getItem("token")},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());

   

      if (response.data.success) {
        dispatch(setUser(response.data.data));
      
      } else {
        localStorage.clear();
        navigate("/login");
      }
    } catch (err) {
      dispatch(hideLoading());
      localStorage.clear();
      console.log(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user ) {
        await getUser();
      }
    };

    fetchData();
  }, [user, dispatch, navigate]);

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
