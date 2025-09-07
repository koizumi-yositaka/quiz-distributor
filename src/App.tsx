import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Test } from "./pages/Test";
import { Login } from "./pages/Login";
import { Quiz } from "./pages/Quiz";
import { Error } from "./pages/Error";
import { NotFound } from "./pages/NotFound";
import { Complete } from "./components/layout/Complete";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/error" element={<Error />} />
          <Route path="/complete" element={<Complete />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
