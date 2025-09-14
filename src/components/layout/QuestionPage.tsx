import React from "react";
export type QuestionPageProps = {
  total: number;
  current: number;
  children: React.ReactNode;
  prev: React.ReactNode;
  next: React.ReactNode;
  className: string;
};
export const QuestionPage = ({
  children,
  total,
  current,
  prev,
  next,
  className,
}: QuestionPageProps) => {
  return (
    <div className={`h-full flex flex-col ${className}`}>
      <header className="p-4 border-b sticky top-0 bg-white">{`${current}/${total}`}</header>
      {/* メインコンテンツ：スクロール可能 */}
      <main className="flex-grow p-4 overflow-auto">{children}</main>

      {/* Footer：常に画面下に固定 */}
      <footer className="flex justify-between items-center p-4 border-t sticky bottom-0 bg-white">
        <div>{prev}</div>
        <div>{next}</div>
      </footer>
    </div>
  );
};
