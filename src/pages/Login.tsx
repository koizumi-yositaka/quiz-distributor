import { useState } from "react";
import { useLocation } from "react-router-dom";
import TextBox from "../components/input/TextBox";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const preQuizId = searchParams.get("preQuizId");
  const preEmail = searchParams.get("preEmail");
  const [email, setEmail] = useState(preEmail ?? "");
  const [quizId, setQuizId] = useState(preQuizId ?? "");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !quizId) {
      setError("メールアドレスとパスワードを入力してください");
      return;
    }
    setError("");
    navigate(`/quiz`, { state: { quizId, email } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">ログイン</h2>

        <div className="space-y-4">
          <TextBox
            label="Email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!email && error ? "メールアドレスを入力してください" : ""}
            type="email"
          />

          <TextBox
            label="QuizID"
            placeholder="3_test"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
            error={!quizId && error ? "QuizIDを入力してください" : ""}
            type="text"
          />
        </div>

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <button
          onClick={handleLogin}
          className="mt-6 w-full py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
        >
          ログイン
        </button>
      </div>
    </div>
  );
};
