import { useLocation, useNavigate } from "react-router-dom";
import { type ErrorInfo } from "../types/type";
export const Error = () => {
  const location = useLocation();
  const navigate = useNavigate();
  if (!location.state) {
    return (
      <>
        <div>Error</div>
        <button onClick={() => navigate("/login")}>Home</button>
      </>
    );
  }
  const error = location.state.error as ErrorInfo;
  console.error(error);
  return (
    <>
      <div>{`${error.code}: ${error.message}`}</div>
      <button onClick={() => navigate("/login")}>Home</button>
    </>
  );
};
