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
      <span>
        Designed by{" "}
        <a
          href="https://capetivate.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit", textDecoration: "none", transition: "color 0.15s ease" }}
          onMouseEnter={e => e.currentTarget.style.color = "rgba(240, 236, 228, 0.6)"}
          onMouseLeave={e => e.currentTarget.style.color = "inherit"}
        >
          Capetivate, Inc.
        </a>
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7410 3900" style={{ height: 14, width: "auto", borderRadius: 1 }} aria-label="USA flag">
        <rect width="7410" height="3900" fill="#B22234"/>
        <path d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0" stroke="#fff" strokeWidth="300"/>
        <rect width="2964" height="2100" fill="#3C3B6E"/>
      </svg>
      {version && (
        <span style={{ color: "rgba(240, 236, 228, 0.25)" }}>{version}</span>
      )}
    </div>
  );
}
