import { useDispatch } from "react-redux";
import { setLogout } from "../state";
import { useNavigate } from "react-router-dom";

function StuHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(setLogout());
    navigate("/student/login");
  };
  return (
    <>
      <h1>This is Student's Homepage.</h1>
      <button onClick={logOut}>log out</button>
    </>
  );
}

export default StuHome;
