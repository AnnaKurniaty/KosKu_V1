import React from "react";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { getUserId } from "../utils";
import { setUser } from "../state";


const PrivateRoute = ({ children, redirectPath}) => {
  const dispatch = useDispatch()
    // const {token, loading } = useSelector((state) => state.user);

    if( getUserId() ){
      dispatch(setUser(getUserId()))
    }

    return (
      getUserId()? [children] : <Navigate to='/login' state={redirectPath}/>
      );
}

export default PrivateRoute;