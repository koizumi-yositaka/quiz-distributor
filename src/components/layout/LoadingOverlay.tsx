import React from "react";
import { useLoading } from "../../context/LoadingContext";

export const LoadingOverlay: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      backdropFilter: "blur(2px)"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        background: "white",
        padding: "16px 20px",
        borderRadius: 12,
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
      }}>
        <div className="spinner" style={{
          width: 28,
          height: 28,
          border: "3px solid #e5e7eb",
          borderTopColor: "#3b82f6",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite"
        }} />
        <div style={{ fontSize: 14, color: "#111827" }}>Loading...</div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
};


