import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = ({param}) => {
  let navigate = useNavigate();
  useEffect(() => {
    // navigate(`/welcome?origin=notfound-${param}`);
  },[])
  
  return <>Not Found</>;
};

export default NotFound;