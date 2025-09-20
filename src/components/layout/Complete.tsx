import { useLocation, useNavigate } from "react-router-dom";
import type { TQuizResult } from "../../api/quiz/quizApi";

export const Complete = () => {
  const result = useLocation().state.quizResult as TQuizResult;
  const navigate = useNavigate();
  const percentage = Math.round((result.score / result.totalQ) * 100);
  
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600 dark:text-green-400";
    if (percentage >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return "素晴らしいです！ 🎉";
    if (percentage >= 80) return "よくできました！ 👏";
    if (percentage >= 70) return "良い結果です！ 👍";
    if (percentage >= 60) return "まずまずです！ 💪";
    return "もう少し練習しましょう！ 📚";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Main Card */}
        <div className="bg-card border border-border rounded-xl shadow-lg p-8 text-center space-y-6">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">クイズ完了！</h1>
            <p className="text-muted-foreground text-lg">{getScoreMessage(percentage)}</p>
          </div>

          {/* Score Display */}
          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <div className="flex justify-center items-center space-x-4">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(percentage)}`}>
                  {result.score}
                </div>
                <div className="text-sm text-muted-foreground">正解</div>
              </div>
              <div className="text-2xl text-muted-foreground">/</div>
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground">
                  {result.totalQ}
                </div>
                <div className="text-sm text-muted-foreground">問題数</div>
              </div>
            </div>
            
            {/* Percentage */}
            <div className="space-y-2">
              <div className="text-2xl font-semibold text-foreground">
                {percentage}%
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    percentage >= 80 ? 'bg-green-500' : 
                    percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">回答詳細</h3>
            <div className="bg-muted/30 rounded-lg p-4 max-h-60 overflow-y-auto">
              <div className="space-y-2 text-left">
                {Object.entries(result.result).map(([questionId, answer], index) => (
                  <div key={questionId} className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
                    <span className="text-sm font-medium text-foreground">
                      問題 {index + 1}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {answer}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button 
              onClick={() => {
                // まずはログインページに戻る
                navigate('/login');
                // もしポップアップウィンドウの場合は閉じる
                if (window.opener) {
                  window.close();
                }
              }}
              className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              閉じる
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          クイズのご参加ありがとうございました！
        </div>
      </div>
    </div>
  );
};
