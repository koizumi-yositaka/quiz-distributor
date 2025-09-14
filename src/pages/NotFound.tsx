import { useNavigate } from "react-router-dom";
export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>NotFound</div>
      <button onClick={() => navigate("/login")}>Home</button>
    </>
  );
};
