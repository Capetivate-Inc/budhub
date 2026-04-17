export function CapetivateFooter() {
  const version = import.meta.env.VITE_BUILD_VERSION || "";

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      padding: "24px 0",
      fontSize: 12,
      color: "rgba(240, 236, 228, 0.4)",
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <a
        href="https://capetivate.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{ transition: "opacity 0.15s ease" }}
        onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
      >
        <img
          src="/capetivate-white.png"
          alt="Capetivate"
          style={{ height: 24, width: "auto", opacity: 0.5 }}
        />
      </a>
      <a
        href="https://capetivate.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "inherit", textDecoration: "none", transition: "color 0.15s ease" }}
        onMouseEnter={e => e.currentTarget.style.color = "rgba(240, 236, 228, 0.6)"}
        onMouseLeave={e => e.currentTarget.style.color = "inherit"}
      >
        Designed by Capetivate, Inc.
      </a>
      {version && (
        <span style={{ color: "rgba(240, 236, 228, 0.25)" }}>{version}</span>
      )}
    </div>
  );
}
