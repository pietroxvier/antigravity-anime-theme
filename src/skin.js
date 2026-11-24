// --- NOCTURNE TACTICAL SKIN INJECTION FOR ANTIGRAVITY (DUAL MODE DARK/LIGHT & PREMIUM GRID) ---
try {
  (function initNocturneTacticalSkin() {
    let isMountedOnce = false;

    function getSavedThemeMode() {
      try {
        return localStorage.getItem('agy_skin_theme_mode') || 'dark';
      } catch (e) {
        return 'dark';
      }
    }

    function applyTitleBarOverlay(mode) {
      try {
        const isLight = mode === 'light' || document.body?.classList.contains('agy-theme-light');
        const color = isLight ? '#f6f2fc' : '#180d28';
        const symbolColor = isLight ? '#26123e' : '#ffffff';
        if (typeof electronNativeAPI !== 'undefined' && typeof electronNativeAPI.setTitleBarOverlay === 'function') {
          electronNativeAPI.setTitleBarOverlay({ color, symbolColor });
        } else if (typeof window !== 'undefined' && window.electronNative && typeof window.electronNative.setTitleBarOverlay === 'function') {
          window.electronNative.setTitleBarOverlay({ color, symbolColor });
        }
      } catch (e) {}
    }

    function ensureStyles() {
      if (!document.head) return;

      const legacyIds = [
        'antigravity-tactical-master-style',
        'antigravity-master-theme',
        'antigravity-active-theme',
        'test-transparency',
        'claude-tactical-master-style',
        'claude-anime-wallpaper',
        'claude-macbook-bar',
        'claude-grid-toggle-btn',
        'claude-macbook-grid-btn',
        'claude-project-grid-modal',
        'agy-win-buttons-cover'
      ];
      legacyIds.forEach(id => { const el = document.getElementById(id); if (el) el.remove(); });

      let style = document.getElementById('antigravity-nocturne-skin-style');
      if (!style) {
        style = document.createElement('style');
        style.id = 'antigravity-nocturne-skin-style';
        document.head.appendChild(style);
      }

      style.textContent = `
        /* ===== MODO DARK (PADRAO NOCTURNE TACTICAL) ===== */
        html.dark:not(.agy-theme-light), :root:not(.agy-theme-light) {
          --background: #140b24 !important;
          --foreground: #fcfaff !important;
          --card: rgba(34, 19, 60, 0.78) !important;
          --card-foreground: #fcfaff !important;
          --popover: rgba(28, 15, 50, 0.96) !important;
          --popover-foreground: #fcfaff !important;
          --primary: #c084fc !important;
          --primary-foreground: #120920 !important;
          --secondary: #321d54 !important;
          --secondary-foreground: #f3e8ff !important;
          --muted: rgba(36, 21, 61, 0.65) !important;
          --muted-foreground: #d8b4fe !important;
          --border: rgba(192, 132, 252, 0.24) !important;
          --input: rgba(192, 132, 252, 0.28) !important;
          --ring: #c084fc !important;
          --sidebar: rgba(20, 11, 36, 0.86) !important;
          --sidebar-foreground: #fcfaff !important;
          --sidebar-primary: #c084fc !important;
          --sidebar-border: rgba(192, 132, 252, 0.20) !important;
          --sidebar-muted: rgba(54, 30, 92, 0.78) !important;
        }

        body:not(.agy-theme-light) {
          background-color: #10071e !important;
          color: #fcfaff !important;
          padding-top: 0 !important;
          margin: 0 !important;
        }

        body:not(.agy-theme-light)::before {
          content: "" !important;
          position: fixed !important;
          inset: 0 !important;
          z-index: 0 !important;
          background-image:
            linear-gradient(to right, rgba(16, 8, 28, 0.45) 0%, rgba(16, 8, 28, 0.16) 48%, rgba(16, 8, 28, 0.04) 100%),
            linear-gradient(to top, rgba(14, 7, 26, 0.50) 0%, transparent 35%),
            url("data:image/jpeg;base64,__DARK_B64__") !important;
          background-size: cover !important;
          background-position: right center !important;
          background-repeat: no-repeat !important;
          pointer-events: none !important;
          opacity: 1 !important;
          transition: opacity 0.25s ease;
        }

        body:not(.agy-theme-light) [class*="sticky"][class*="bg-background"] {
          background: rgba(20, 11, 36, 0.88) !important;
          backdrop-filter: blur(16px) !important;
        }

        body:not(.agy-theme-light) [data-testid="title-menu-bar"] {
          background: rgba(24, 13, 40, 0.78) !important;
          backdrop-filter: blur(20px) saturate(160%) !important;
          border-bottom: 1px solid rgba(192, 132, 252, 0.22) !important;
        }

        body:not(.agy-theme-light) #agy-win-buttons-cover {
          background: rgba(24, 13, 40, 0.99);
        }

        body:not(.agy-theme-light) [data-testid="title-menu-bar-item"] {
          color: rgba(245, 240, 255, 0.88) !important;
        }
        body:not(.agy-theme-light) [data-testid="title-menu-bar-item"]:hover {
          background: rgba(192, 132, 252, 0.18) !important;
          color: #ffffff !important;
        }

        body:not(.agy-theme-light) [role="navigation"],
        body:not(.agy-theme-light) .bg-sidebar {
          background: rgba(20, 11, 36, 0.72) !important;
          backdrop-filter: blur(18px) !important;
          border-right: 1px solid rgba(192, 132, 252, 0.20) !important;
        }

        body:not(.agy-theme-light) .agy-sidebar-row:hover {
          background: rgba(58, 34, 96, 0.65) !important;
          border-color: rgba(216, 180, 254, 0.35) !important;
        }

        body:not(.agy-theme-light) .agy-sidebar-row[data-selected="true"] {
          background: linear-gradient(135deg, rgba(88, 28, 135, 0.78), rgba(55, 20, 88, 0.88)) !important;
          border-color: rgba(216, 180, 254, 0.70) !important;
          box-shadow: 0 2px 10px rgba(10, 3, 20, 0.40), 0 0 12px rgba(192, 132, 252, 0.25) !important;
        }

        body:not(.agy-theme-light) .agy-sidebar-row[data-selected="true"]::before {
          background: #d8b4fe !important;
          box-shadow: 0 0 8px #c084fc !important;
        }

        body:not(.agy-theme-light) [data-testid="user-message-bubble"],
        body:not(.agy-theme-light) .agy-user-bubble {
          background: rgba(76, 38, 128, 0.52) !important;
          border: 1px solid rgba(216, 180, 254, 0.42) !important;
          color: #fcfaff !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.12) !important;
        }

        body:not(.agy-theme-light) [data-testid="agent-response"] {
          background: rgba(24, 12, 46, 0.56) !important;
          border: 1px solid rgba(216, 180, 254, 0.24) !important;
          color: #fcfaff !important;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
        }

        body:not(.agy-theme-light) #antigravity\.agentSidePanelInputBox,
        body:not(.agy-theme-light) div[data-testid="chat-input-container"] {
          background: rgba(48, 24, 84, 0.62) !important;
          border: 1px solid rgba(216, 180, 254, 0.42) !important;
        }

        /* ===== MODO LIGHT (AURORA CELESTIAL NOCTURNE) ===== */
        html.light, html.agy-theme-light, :root.agy-theme-light {
          --background: #faf8ff !important;
          --foreground: #22123b !important;
          --card: rgba(255, 255, 255, 0.88) !important;
          --card-foreground: #22123b !important;
          --popover: rgba(255, 255, 255, 0.97) !important;
          --popover-foreground: #22123b !important;
          --primary: #9333ea !important;
          --primary-foreground: #ffffff !important;
          --secondary: #f3e8ff !important;
          --secondary-foreground: #581c87 !important;
          --muted: rgba(245, 240, 255, 0.80) !important;
          --muted-foreground: #6b21a8 !important;
          --border: rgba(147, 51, 234, 0.22) !important;
          --input: rgba(147, 51, 234, 0.28) !important;
          --ring: #9333ea !important;
          --sidebar: rgba(255, 255, 255, 0.88) !important;
          --sidebar-foreground: #22123b !important;
          --sidebar-primary: #9333ea !important;
          --sidebar-border: rgba(147, 51, 234, 0.18) !important;
          --sidebar-muted: rgba(243, 232, 255, 0.85) !important;
        }

        body.agy-theme-light {
          background-color: #f7f4fc !important;
          color: #22123b !important;
          padding-top: 0 !important;
          margin: 0 !important;
        }

        body.agy-theme-light::before {
          content: "" !important;
          position: fixed !important;
          inset: 0 !important;
          z-index: 0 !important;
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.58) 0%, rgba(255, 255, 255, 0.24) 48%, rgba(255, 255, 255, 0.08) 100%),
            linear-gradient(to top, rgba(247, 244, 252, 0.65) 0%, transparent 35%),
            url("data:image/jpeg;base64,__LIGHT_B64__") !important;
          background-size: cover !important;
          background-position: right center !important;
          background-repeat: no-repeat !important;
          pointer-events: none !important;
          opacity: 1 !important;
          transition: opacity 0.25s ease;
        }

        body.agy-theme-light [class*="sticky"][class*="bg-background"] {
          background: rgba(255, 255, 255, 0.90) !important;
          backdrop-filter: blur(16px) !important;
        }

        body.agy-theme-light [data-testid="title-menu-bar"] {
          background: rgba(255, 255, 255, 0.88) !important;
          backdrop-filter: blur(20px) saturate(160%) !important;
          border-bottom: 1px solid rgba(147, 51, 234, 0.18) !important;
        }

        body.agy-theme-light #agy-win-buttons-cover {
          background: rgba(248, 245, 253, 0.99) !important;
        }

        body.agy-theme-light [data-testid="title-menu-bar-item"] {
          color: #3b1d60 !important;
        }
        body.agy-theme-light [data-testid="title-menu-bar-item"]:hover {
          background: rgba(147, 51, 234, 0.12) !important;
          color: #1a0830 !important;
        }

        body.agy-theme-light [role="navigation"],
        body.agy-theme-light .bg-sidebar {
          background: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(18px) !important;
          border-right: 1px solid rgba(147, 51, 234, 0.16) !important;
        }

        body.agy-theme-light .agy-sidebar-row:hover {
          background: rgba(237, 233, 254, 0.75) !important;
          border-color: rgba(168, 85, 247, 0.35) !important;
        }

        body.agy-theme-light .agy-sidebar-row[data-selected="true"] {
          background: linear-gradient(135deg, rgba(233, 213, 255, 0.95), rgba(216, 180, 254, 0.98)) !important;
          border-color: rgba(147, 51, 234, 0.55) !important;
          box-shadow: 0 2px 10px rgba(147, 51, 234, 0.15) !important;
          color: #3b0764 !important;
        }

        body.agy-theme-light .agy-sidebar-row[data-selected="true"]::before {
          background: #7e22ce !important;
          box-shadow: 0 0 8px rgba(126, 34, 206, 0.5) !important;
        }

        body.agy-theme-light [data-testid="user-message-bubble"],
        body.agy-theme-light .agy-user-bubble {
          background: rgba(243, 232, 255, 0.92) !important;
          border: 1px solid rgba(192, 132, 252, 0.55) !important;
          color: #2e1065 !important;
          box-shadow: 0 4px 16px rgba(147, 51, 234, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
        }

        body.agy-theme-light [data-testid="agent-response"] {
          background: rgba(255, 255, 255, 0.90) !important;
          border: 1px solid rgba(192, 132, 252, 0.38) !important;
          color: #1e1133 !important;
          box-shadow: 0 6px 24px rgba(147, 51, 234, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
        }

        body.agy-theme-light [data-testid="agent-response"] p,
        body.agy-theme-light [data-testid="agent-response"] li,
        body.agy-theme-light [data-testid="agent-response"] span,
        body.agy-theme-light [data-testid="agent-response"] div {
          color: #1e1133 !important;
        }

        body.agy-theme-light #antigravity\.agentSidePanelInputBox,
        body.agy-theme-light div[data-testid="chat-input-container"] {
          background: rgba(255, 255, 255, 0.92) !important;
          border: 1px solid rgba(168, 85, 247, 0.45) !important;
          color: #1e1133 !important;
          box-shadow: 0 4px 18px rgba(147, 51, 234, 0.10) !important;
        }

        body.agy-theme-light pre,
        body.agy-theme-light code {
          color: #3b0764 !important;
        }

        /* ===== ELEMENTOS COMUNS E ESTRUTURA GERAL ===== */
        .agy-inset-shell, .agy-sheet, .browser-hole-opaque, .browser-hole-ancestor,
        .flex-1.min-h-0.flex.flex-col,
        .agy-shell, [class*="bg-background"]:not([class*="sticky"]):not([role="dialog"]) {
          background-color: transparent !important;
        }

        #root, .agy-shell {
          position: relative;
          z-index: 1;
        }

        [data-testid="title-menu-bar"] {
          padding-left: 12px !important;
          padding-right: 144px !important;
          height: 35px !important;
          position: relative !important;
        }

        .mac-traffic-lights {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-right: 12px;
          -webkit-app-region: no-drag;
          flex-shrink: 0;
        }
        .mac-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          cursor: pointer;
          display: inline-block;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.35);
          transition: transform 0.15s ease, filter 0.15s ease;
        }
        .mac-dot:hover { transform: scale(1.12); filter: brightness(1.15); }
        .mac-dot.mac-close { background: #ff5f56; border: 1px solid #e0443e; }
        .mac-dot.mac-min { background: #ffbd2e; border: 1px solid #dea123; }
        .mac-dot.mac-max { background: #27c93f; border: 1px solid #1aab29; }

        #agy-win-buttons-cover {
          position: fixed;
          top: 0;
          right: 0;
          width: 138px;
          height: 35px;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 14px;
          pointer-events: auto;
          -webkit-app-region: no-drag;
        }

        [data-testid="title-menu-bar-item"] {
          font-size: 12.5px !important;
          font-weight: 500 !important;
          border-radius: 6px !important;
          padding: 2px 8px !important;
          height: 24px !important;
          transition: background 0.15s ease, color 0.15s ease !important;
        }

        /* BADGE CENTRAL COM BOTAO AO LADO */
        .agy-center-badge {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 3px 6px 3px 12px;
          border-radius: 9999px;
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.3px;
          pointer-events: auto !important;
          -webkit-app-region: no-drag !important;
          backdrop-filter: blur(14px);
          user-select: none;
          z-index: 100;
          transition: all 0.2s ease;
        }

        body:not(.agy-theme-light) .agy-center-badge {
          background: rgba(35, 18, 60, 0.75);
          border: 1px solid rgba(192, 132, 252, 0.32);
          color: #e9d5ff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.30);
        }

        body.agy-theme-light .agy-center-badge {
          background: rgba(255, 255, 255, 0.90) !important;
          border: 1px solid rgba(147, 51, 234, 0.28) !important;
          color: #4c1d95 !important;
          box-shadow: 0 2px 12px rgba(147, 51, 234, 0.12) !important;
        }

        .agy-badge-text {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.2px;
          pointer-events: none;
          white-space: nowrap;
        }

        /* BOTAO DE ALTERNANCIA DARK/LIGHT */
        .agy-theme-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          height: 22px;
          padding: 0 10px;
          border-radius: 9999px;
          font-size: 10.5px;
          font-weight: 600;
          cursor: pointer;
          -webkit-app-region: no-drag;
          transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
        }

        body:not(.agy-theme-light) .agy-theme-toggle-btn {
          background: rgba(192, 132, 252, 0.18);
          border: 1px solid rgba(216, 180, 254, 0.40);
          color: #f5f3ff;
        }
        body:not(.agy-theme-light) .agy-theme-toggle-btn:hover {
          background: rgba(192, 132, 252, 0.32);
          border-color: rgba(216, 180, 254, 0.70);
          color: #ffffff;
          transform: translateY(-0.5px);
          box-shadow: 0 0 10px rgba(192, 132, 252, 0.35);
        }

        body.agy-theme-light .agy-theme-toggle-btn {
          background: rgba(147, 51, 234, 0.12);
          border: 1px solid rgba(147, 51, 234, 0.35);
          color: #581c87;
        }
        body.agy-theme-light .agy-theme-toggle-btn:hover {
          background: rgba(147, 51, 234, 0.24);
          border-color: rgba(147, 51, 234, 0.60);
          color: #3b0764;
          transform: translateY(-0.5px);
          box-shadow: 0 0 10px rgba(147, 51, 234, 0.25);
        }

        @media (max-width: 860px) {
          .agy-center-badge { display: none; }
        }

        .agy-sidebar-row {
          margin-top: 0 !important;
          margin-bottom: 0 !important;
          border-radius: 8px !important;
          border: 1px solid transparent !important;
          background: transparent !important;
          transition: background 0.15s ease, border-color 0.15s ease !important;
        }

        .agy-sidebar-row[data-selected="true"]::before {
          content: "" !important;
          position: absolute !important;
          left: 0 !important;
          top: 18% !important;
          height: 64% !important;
          width: 3px !important;
          border-radius: 0 3px 3px 0 !important;
        }

        [data-testid="user-message-bubble"], .agy-user-bubble {
          border-radius: 12px !important;
          backdrop-filter: blur(14px) saturate(150%) !important;
        }

        [data-testid="agent-response"] {
          border-radius: 14px !important;
          backdrop-filter: blur(12px) saturate(140%) !important;
          padding: 14px 18px !important;
        }

        #antigravity\.agentSidePanelInputBox, div[data-testid="chat-input-container"] {
          border-radius: 14px !important;
          backdrop-filter: blur(18px) saturate(150%) !important;
        }

        .agy-new-msg-beacon {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #f59e0b;
          box-shadow: 0 0 8px #f59e0b;
          animation: agyPulseBeacon 1.5s infinite ease-in-out;
        }
        @keyframes agyPulseBeacon {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 8px #f59e0b; }
          50% { opacity: 0.45; transform: scale(0.85); box-shadow: 0 0 2px #f59e0b; }
        }

        /* MODAL DOS QUADRADINHOS DE CONVERSAS */
        #agy-project-grid-modal {
          position: fixed;
          inset: 0;
          z-index: 999999;
          background: rgba(10, 5, 22, 0.72);
          backdrop-filter: blur(22px) saturate(160%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          animation: agyFadeInGrid 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }
        body.agy-theme-light #agy-project-grid-modal {
          background: rgba(230, 220, 248, 0.72) !important;
        }

        #agy-cards-grid-container::-webkit-scrollbar {
          width: 7px;
        }
        #agy-cards-grid-container::-webkit-scrollbar-track {
          background: transparent;
        }
        #agy-cards-grid-container::-webkit-scrollbar-thumb {
          background: rgba(192, 132, 252, 0.32);
          border-radius: 9999px;
        }
        #agy-cards-grid-container::-webkit-scrollbar-thumb:hover {
          background: rgba(216, 180, 254, 0.60);
        }
        @keyframes agyFadeInGrid {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* MODO CONFORTO VISUAL (ALT + N) */
        html.agy-eye-comfort body::before {
          filter: brightness(0.40) sepia(0.28) saturate(0.72) !important;
          opacity: 0.72 !important;
        }
        html.agy-eye-comfort body::after {
          content: "" !important;
          position: fixed !important;
          inset: 0 !important;
          z-index: 0 !important;
          pointer-events: none !important;
          background: radial-gradient(circle at 75% 20%, rgba(28, 20, 16, 0.42), rgba(14, 10, 16, 0.76)) !important;
        }
        html.agy-eye-comfort [data-testid="title-menu-bar"],
        html.agy-eye-comfort #agy-win-buttons-cover {
          background: rgba(18, 13, 22, 0.96) !important;
          border-bottom-color: rgba(214, 188, 160, 0.14) !important;
        }
        html.agy-eye-comfort [data-testid="agent-response"] {
          background: rgba(22, 16, 26, 0.86) !important;
          border-color: rgba(214, 188, 160, 0.18) !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35) !important;
          color: #e6ddd0 !important;
        }
        html.agy-eye-comfort [data-testid="agent-response"] p,
        html.agy-eye-comfort [data-testid="agent-response"] li,
        html.agy-eye-comfort [data-testid="agent-response"] span,
        html.agy-eye-comfort [data-testid="user-message-bubble"],
        html.agy-eye-comfort .agy-user-bubble {
          color: #e6ddd0 !important;
        }
        html.agy-eye-comfort [data-testid="user-message-bubble"],
        html.agy-eye-comfort .agy-user-bubble {
          background: rgba(38, 28, 44, 0.80) !important;
          border-color: rgba(214, 188, 160, 0.22) !important;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.28) !important;
        }
        html.agy-eye-comfort #antigravity\.agentSidePanelInputBox,
        html.agy-eye-comfort div[data-testid="chat-input-container"] {
          background: rgba(24, 18, 28, 0.88) !important;
          border-color: rgba(214, 188, 160, 0.22) !important;
        }
        html.agy-eye-comfort .agy-sidebar-row[data-selected="true"] {
          background: rgba(52, 38, 56, 0.78) !important;
          border-color: rgba(214, 188, 160, 0.34) !important;
          box-shadow: none !important;
        }
        html.agy-eye-comfort .agy-sidebar-row[data-selected="true"]::before {
          background: #d6bc9c !important;
          box-shadow: none !important;
        }
        html.agy-eye-comfort #agy-project-grid-modal {
          background: rgba(10, 8, 12, 0.78) !important;
        }
        html.agy-eye-comfort #agy-project-grid-modal > div {
          background: linear-gradient(160deg, rgba(26, 20, 30, 0.94), rgba(16, 12, 20, 0.96)) !important;
          border-color: rgba(214, 188, 160, 0.22) !important;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.78) !important;
        }
        html.agy-eye-comfort #agy-project-grid-modal * {
          text-shadow: none !important;
        }
        html.agy-eye-comfort pre,
        html.agy-eye-comfort code {
          filter: brightness(0.92) sepia(0.08);
        }
      `;
    }

    function applyThemeMode(mode) {
      const isLight = mode === 'light';
      if (isLight) {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        document.documentElement.classList.add('agy-theme-light');
        document.body.classList.remove('agy-theme-dark');
        document.body.classList.add('agy-theme-light');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('agy-theme-light');
        document.body.classList.remove('agy-theme-light');
        document.body.classList.add('agy-theme-dark');
      }

      try {
        localStorage.setItem('agy_skin_theme_mode', mode);
      } catch (e) {}

      applyTitleBarOverlay(mode);

      const btn = document.getElementById('agy-theme-toggle-btn');
      if (btn) {
        if (isLight) {
          btn.innerHTML = '<span class="agy-theme-icon">🌙</span><span class="agy-theme-text">Modo Dark</span>';
          btn.title = 'Alternar para Modo Dark (Alt + L)';
        } else {
          btn.innerHTML = '<span class="agy-theme-icon">☀️</span><span class="agy-theme-text">Modo Light</span>';
          btn.title = 'Alternar para Modo Light (Alt + L)';
        }
      }
    }
    window.__setAgyThemeMode = applyThemeMode;

    function ensureTopBar() {
      const bar = document.querySelector('[data-testid="title-menu-bar"]');
      if (bar) {
        if (!bar.querySelector('.mac-traffic-lights')) {
          const lights = document.createElement('div');
          lights.className = 'mac-traffic-lights';
          lights.innerHTML = `
            <span class="mac-dot mac-close" title="Fechar"></span>
            <span class="mac-dot mac-min" title="Minimizar"></span>
            <span class="mac-dot mac-max" title="Maximizar / Restaurar"></span>
          `;
          const api = typeof electronNativeAPI !== 'undefined' ? electronNativeAPI : (typeof window !== 'undefined' ? window.electronNative : null);
          lights.querySelector('.mac-close').addEventListener('click', () => api?.close?.());
          lights.querySelector('.mac-min').addEventListener('click', () => api?.minimize?.());
          lights.querySelector('.mac-max').addEventListener('click', async () => {
            if (await api?.isMaximized?.()) api?.unmaximize?.();
            else api?.maximize?.();
          });
          bar.insertBefore(lights, bar.firstChild);
        }

        // Badge Nocturne Tactical com Botao ao lado
        let badge = bar.querySelector('.agy-center-badge');
        if (!badge) {
          badge = document.createElement('div');
          badge.className = 'agy-center-badge';
          bar.appendChild(badge);
        }

        let badgeText = badge.querySelector('.agy-badge-text');
        if (!badgeText) {
          badgeText = document.createElement('span');
          badgeText.className = 'agy-badge-text';
          badgeText.textContent = '✦ Nocturne Tactical · Antigravity';
          badge.appendChild(badgeText);
        }

        let themeToggleBtn = badge.querySelector('#agy-theme-toggle-btn');
        if (!themeToggleBtn) {
          themeToggleBtn = document.createElement('button');
          themeToggleBtn.id = 'agy-theme-toggle-btn';
          themeToggleBtn.className = 'agy-theme-toggle-btn';
          themeToggleBtn.type = 'button';
          themeToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isCurrentlyLight = document.body.classList.contains('agy-theme-light');
            applyThemeMode(isCurrentlyLight ? 'dark' : 'light');
          });
          badge.appendChild(themeToggleBtn);
        }

        const isCurrentlyLight = document.body.classList.contains('agy-theme-light');
        if (isCurrentlyLight) {
          themeToggleBtn.innerHTML = '<span class="agy-theme-icon">🌙</span><span class="agy-theme-text">Modo Dark</span>';
          themeToggleBtn.title = 'Alternar para Modo Dark (Alt + L)';
        } else {
          themeToggleBtn.innerHTML = '<span class="agy-theme-icon">☀️</span><span class="agy-theme-text">Modo Light</span>';
          themeToggleBtn.title = 'Alternar para Modo Light (Alt + L)';
        }

        if (!document.getElementById('agy-win-buttons-cover')) {
          const winCover = document.createElement('div');
          winCover.id = 'agy-win-buttons-cover';
          const eyeBtn = document.createElement('button');
          eyeBtn.id = 'agy-eye-comfort-btn';
          eyeBtn.type = 'button';
          eyeBtn.title = 'Modo Conforto Visual para leitura noturna (Alt + N)';
          eyeBtn.style.cssText = 'display: inline-flex; align-items: center; gap: 5px; height: 22px; padding: 0 9px; border-radius: 9999px; font-size: 10.5px; font-weight: 600; cursor: pointer; transition: all 0.15s ease;';
          winCover.appendChild(eyeBtn);
          document.body.appendChild(winCover);

          const applyEyeComfort = (enabled) => {
            document.documentElement.classList.toggle('agy-eye-comfort', !!enabled);
            try { localStorage.setItem('agy_eye_comfort_mode', enabled ? '1' : '0'); } catch (e) {}
            if (enabled) {
              eyeBtn.textContent = '🌙 Noturno ON';
              eyeBtn.style.background = 'rgba(245, 158, 11, 0.18)';
              eyeBtn.style.border = '1px solid rgba(251, 191, 36, 0.45)';
              eyeBtn.style.color = '#fde68a';
            } else {
              eyeBtn.textContent = '🌙 Conforto';
              eyeBtn.style.background = 'rgba(192, 132, 252, 0.12)';
              eyeBtn.style.border = '1px solid rgba(192, 132, 252, 0.28)';
              eyeBtn.style.color = '#d8b4fe';
            }
          };
          window.__setEyeComfortMode = applyEyeComfort;

          eyeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            applyEyeComfort(!document.documentElement.classList.contains('agy-eye-comfort'));
          });

          applyEyeComfort(localStorage.getItem('agy_eye_comfort_mode') === '1');
        }
      }
    }

    async function fetchAgyQuota() {
      try {
        let csrf = (typeof window !== 'undefined' && window.__APP_CONFIG__?.csrfToken) || '';
        if (!csrf && typeof electron_1 !== 'undefined' && electron_1.webFrame && typeof electron_1.webFrame.executeJavaScript === 'function') {
          try {
            csrf = await electron_1.webFrame.executeJavaScript('window.__APP_CONFIG__?.csrfToken || ""');
          } catch (e) {}
        }
        const bodyBytes = new Uint8Array([0, 0, 0, 0, 2, 123, 125]);
        const response = await fetch('/exa.language_server_pb.LanguageServerService/RetrieveUserQuotaSummary', {
          method: 'POST',
          cache: 'no-store',
          headers: {
            'content-type': 'application/grpc-web+json',
            'x-grpc-web': '1',
            'x-codeium-csrf-token': csrf
          },
          body: bodyBytes
        });
        const buf = await response.arrayBuffer();
        const str = new TextDecoder('utf-8').decode(new Uint8Array(buf));
        const start = str.indexOf('{');
        const end = str.lastIndexOf('}') + 1;
        if (start >= 0 && end > start) {
          const data = JSON.parse(str.slice(start, end));
          return data.response?.groups || null;
        }
      } catch (e) {
        console.warn('Quota fetch error:', e);
      }
      return null;
    }

    async function fetchCascadeStatuses() {
      try {
        let csrf = (typeof window !== 'undefined' && window.__APP_CONFIG__?.csrfToken) || '';
        if (!csrf && typeof electron_1 !== 'undefined' && electron_1.webFrame && typeof electron_1.webFrame.executeJavaScript === 'function') {
          try {
            csrf = await electron_1.webFrame.executeJavaScript('window.__APP_CONFIG__?.csrfToken || ""');
          } catch (e) {}
        }
        const bodyBytes = new Uint8Array([0, 0, 0, 0, 2, 123, 125]);
        const response = await fetch('/exa.language_server_pb.LanguageServerService/GetAllCascadeTrajectories', {
          method: 'POST',
          cache: 'no-store',
          headers: {
            'content-type': 'application/grpc-web+json',
            'x-grpc-web': '1',
            'x-codeium-csrf-token': csrf
          },
          body: bodyBytes
        });
        const buf = await response.arrayBuffer();
        const str = new TextDecoder('utf-8').decode(new Uint8Array(buf));
        const start = str.indexOf('{');
        const end = str.lastIndexOf('}') + 1;
        if (start >= 0 && end > start) {
          const data = JSON.parse(str.slice(start, end));
          return data.trajectorySummaries || data.response?.trajectorySummaries || {};
        }
      } catch (e) {
        console.warn('Cascade status fetch error:', e);
      }
      return {};
    }

    function getReadConvos() {
      try {
        return new Set(JSON.parse(localStorage.getItem('agy_read_convos') || '[]'));
      } catch (e) {
        return new Set();
      }
    }

    function saveReadConvos(set) {
      try {
        localStorage.setItem('agy_read_convos', JSON.stringify(Array.from(set)));
      } catch (e) {}
    }

    function parseAgeMinutes(timeStr, isSelected) {
      if (isSelected) return -1;
      if (!timeStr) return 0;
      const s = timeStr.trim().toLowerCase();
      if (s === 'now' || s === 'agora' || s === 'recente' || s === 'just now') return 0;
      const match = s.match(/^(\d+)\s*([a-z]+)$/i);
      if (!match) return 999999;
      const num = parseInt(match[1], 10);
      const unit = match[2];
      if (unit.startsWith('m') && !unit.startsWith('mo')) return num;
      if (unit.startsWith('h')) return num * 60;
      if (unit.startsWith('d')) return num * 1440;
      if (unit.startsWith('w')) return num * 10080;
      if (unit.startsWith('mo')) return num * 43200;
      return 999999;
    }

    function formatResetTime(resetStr) {
      if (!resetStr) return '';
      try {
        const diffMs = new Date(resetStr) - Date.now();
        if (diffMs <= 0) return 'pronto';
        const diffMins = Math.floor(diffMs / 60000);
        const hours = Math.floor(diffMins / 60);
        const mins = diffMins % 60;
        const days = Math.floor(hours / 24);
        if (days > 0) return `renova em ${days}d ${hours % 24}h`;
        if (hours > 0) return `renova em ${hours}h ${mins}m`;
        return `renova em ${mins}m`;
      } catch (e) {
        return '';
      }
    }

    // ==========================================
    // REFINAMENTO VISUAL PREMIUM DOS QUADRADINHOS
    // ==========================================
    async function openProjectGridModal() {
      const existing = document.getElementById('agy-project-grid-modal');
      if (existing) { existing.remove(); return; }

      const isLightMode = document.body.classList.contains('agy-theme-light');

      const [quotaGroups, cascadeMap] = await Promise.all([
        fetchAgyQuota(),
        fetchCascadeStatuses()
      ]);

      const readSet = getReadConvos();
      const rows = Array.from(document.querySelectorAll('.agy-sidebar-row'));
      const convos = rows.map((r, i) => {
        const cascadeId = r.getAttribute('data-cascade-id') || ('convo-' + i);
        const selected = r.getAttribute('data-selected') === 'true';
        const titleEl = r.querySelector('.grow span.truncate') || r.querySelector('span.truncate');
        const title = titleEl ? titleEl.textContent.trim() : (r.innerText || '').split('\n')[0].trim();
        const timeEl = r.querySelector('span.tabular-nums') || r.querySelector('[data-screenshot-volatile="true"]');
        const time = timeEl ? timeEl.textContent.trim() : (selected ? 'ativa' : 'recente');
        const ageMinutes = parseAgeMinutes(time, selected);

        if (selected) {
          readSet.add(cascadeId);
          saveReadConvos(readSet);
        }

        const isRead = readSet.has(cascadeId) || selected;
        const summary = cascadeMap[cascadeId] || {};
        const rawStatus = (summary.status || '').toUpperCase();
        const isProcessing = rawStatus.includes('RUNNING') || rawStatus.includes('PROCESSING') || rawStatus.includes('IN_PROGRESS');
        const isBackendWaiting = rawStatus.includes('WAITING') || rawStatus.includes('PENDING') || rawStatus.includes('USER') || rawStatus.includes('PAUSED');
        const isWaitingResponse = !isProcessing && (isBackendWaiting || (!isRead && (ageMinutes <= 1440 || time === 'recente')));
        const state = isProcessing ? 'processing' : (isWaitingResponse ? 'needs_me' : 'finished');

        return { id: cascadeId, title, time, selected, ageMinutes, isRead, isProcessing, isBackendWaiting, isWaitingResponse, state, el: r };
      }).filter(c => c.title && !c.title.includes('New Conversation'));

      convos.sort((a, b) => a.ageMinutes - b.ageMinutes);

      const processingCount = convos.filter(c => c.state === 'processing').length;
      const waitingCount = convos.filter(c => c.state === 'needs_me').length;
      const finishedCount = convos.filter(c => c.state === 'finished').length;
      const triggerBeacon = document.querySelector('#agy-grid-toggle-btn .agy-new-msg-beacon');
      if (triggerBeacon) triggerBeacon.style.display = waitingCount > 0 ? 'inline-block' : 'none';

      const modal = document.createElement('div');
      modal.id = 'agy-project-grid-modal';

      const content = document.createElement('div');
      content.style.cssText = `
        width: 95%;
        max-width: 1060px;
        max-height: 88vh;
        background: ${isLightMode ? 'linear-gradient(165deg, rgba(255, 255, 255, 0.98), rgba(246, 240, 255, 0.96))' : 'radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.16), transparent 70%), linear-gradient(165deg, rgba(30, 15, 56, 0.92), rgba(16, 8, 30, 0.96))'};
        border: 1px solid ${isLightMode ? 'rgba(147, 51, 234, 0.28)' : 'rgba(216, 180, 254, 0.35)'};
        border-radius: 24px;
        box-shadow: ${isLightMode ? '0 32px 90px rgba(76, 29, 149, 0.16), 0 0 40px rgba(147, 51, 234, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)' : '0 32px 90px rgba(0, 0, 0, 0.85), 0 0 50px rgba(168, 85, 247, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.20)'};
        backdrop-filter: blur(32px) saturate(180%);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      `;

      // HEADER
      const header = document.createElement('div');
      header.style.cssText = `padding: 14px 22px; border-bottom: 1px solid ${isLightMode ? 'rgba(147, 51, 234, 0.14)' : 'rgba(192, 132, 252, 0.18)'}; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-shrink: 0; background: ${isLightMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(12, 5, 24, 0.35)'};`;
      header.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; min-width: 0;">
          <div style="width: 38px; height: 38px; border-radius: 11px; background: linear-gradient(135deg, #c084fc, #7c3aed); display: flex; align-items: center; justify-content: center; font-size: 18px; color: #ffffff; flex-shrink: 0; box-shadow: 0 4px 14px rgba(168, 85, 247, 0.4);">⊞</div>
          <div style="min-width: 0;">
            <h2 style="margin: 0; font-size: 16px; font-weight: 700; color: ${isLightMode ? '#22123b' : '#fcfaff'}; display: flex; align-items: center; gap: 9px; letter-spacing: -0.01em;">
              Quadradinhos de Conversas
              <span style="font-size: 10.5px; font-weight: 700; padding: 2px 8px; border-radius: 9999px; background: ${isLightMode ? 'rgba(147, 51, 234, 0.12)' : 'rgba(192, 132, 252, 0.2)'}; border: 1px solid ${isLightMode ? 'rgba(147, 51, 234, 0.3)' : 'rgba(192, 132, 252, 0.45)'}; color: ${isLightMode ? '#7e22ce' : '#e9d5ff'};">Antigravity</span>
            </h2>
            <p style="margin: 3px 0 0; font-size: 12px; color: ${isLightMode ? '#6b21a8' : '#c084fc'}; font-weight: 500;">Ordenadas pela resposta mais recente · ${convos.length} chats</p>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
          <button id="agy-refresh-quota-btn" title="Atualizar cotas em tempo real" style="background: ${isLightMode ? 'rgba(147, 51, 234, 0.10)' : 'rgba(192, 132, 252, 0.14)'}; border: 1px solid ${isLightMode ? 'rgba(147, 51, 234, 0.28)' : 'rgba(192, 132, 252, 0.32)'}; color: ${isLightMode ? '#6b21a8' : '#e9d5ff'}; border-radius: 9999px; padding: 6px 14px; font-size: 11.5px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 5px; transition: all 0.15s ease;">🔄 Cotas</button>
          <button id="agy-mark-all-read-btn" title="Marcar todas as conversas como lidas" style="background: ${isLightMode ? 'rgba(16, 185, 129, 0.12)' : 'rgba(52, 211, 153, 0.14)'}; border: 1px solid ${isLightMode ? 'rgba(16, 185, 129, 0.3)' : 'rgba(52, 211, 153, 0.35)'}; color: ${isLightMode ? '#047857' : '#a7f3d0'}; border-radius: 9999px; padding: 6px 14px; font-size: 11.5px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 5px; transition: all 0.15s ease;">✓ Marcar lidas</button>
          <button id="agy-close-grid-btn" title="Fechar (Esc)" style="background: ${isLightMode ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.08)'}; border: 1px solid ${isLightMode ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.16)'}; color: ${isLightMode ? '#22123b' : '#fcfaff'}; border-radius: 10px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 15px; font-weight: 700; transition: all 0.15s ease;">✕</button>
        </div>
      `;

      // SEÇÃO DE COTAS REDESENHADA (HUD MODERNO)
      const quotaSection = document.createElement('div');
      quotaSection.id = 'agy-quota-section';
      quotaSection.style.cssText = `padding: 12px 22px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; background: ${isLightMode ? 'rgba(246, 240, 255, 0.5)' : 'rgba(14, 6, 28, 0.50)'}; border-bottom: 1px solid ${isLightMode ? 'rgba(147, 51, 234, 0.12)' : 'rgba(192, 132, 252, 0.14)'}; flex-shrink: 0;`;

      function getGroupVisuals(name, minPct) {
        const n = (name || '').toLowerCase();
        if (n.includes('gemini 4') || n.includes('argon')) {
          return {
            accent: minPct <= 15 ? '#fb7185' : '#f59e0b',
            iconBg: minPct <= 15 ? 'rgba(244, 63, 94, 0.20)' : 'rgba(245, 158, 11, 0.20)',
            iconBorder: minPct <= 15 ? 'rgba(251, 113, 133, 0.55)' : 'rgba(251, 191, 36, 0.55)',
            svg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
          };
        }
        if (n.includes('claude') || n.includes('gpt')) {
          return {
            accent: '#c084fc',
            iconBg: 'rgba(192, 132, 252, 0.20)',
            iconBorder: 'rgba(216, 180, 254, 0.50)',
            svg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M9 9h.01"/><path d="M15 9h.01"/><path d="M9 14c1.5 1.2 4.5 1.2 6 0"/></svg>'
          };
        }
        return {
          accent: '#38bdf8',
          iconBg: 'rgba(56, 189, 248, 0.18)',
          iconBorder: 'rgba(56, 189, 248, 0.48)',
          svg: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/></svg>'
        };
      }

      function renderQuotaCards(groups) {
        quotaSection.innerHTML = '';
        if (!groups || !Array.isArray(groups) || groups.length === 0) {
          quotaSection.style.display = 'none';
          return;
        }
        quotaSection.style.display = 'grid';
        groups.forEach(g => {
          const buckets = g.buckets || [];
          const minPct = buckets.length ? Math.min(...buckets.map(b => Math.round((b.remainingFraction || 0) * 100))) : 100;
          const vis = getGroupVisuals(g.displayName, minPct);
          const isCrit = minPct <= 15;
          const isWarn = minPct > 15 && minPct <= 40;
          const statusPill = isCrit
            ? '<span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;letter-spacing:0.04em;padding:2px 8px;border-radius:9999px;background:rgba(244,63,94,0.18);border:1px solid rgba(251,113,133,0.5);color:#fda4af;box-shadow:0 0 10px rgba(244,63,94,0.25);">⚠ CRÍTICO</span>'
            : (isWarn
              ? '<span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;letter-spacing:0.04em;padding:2px 8px;border-radius:9999px;background:rgba(245,158,11,0.18);border:1px solid rgba(251,191,36,0.5);color:#fde68a;box-shadow:0 0 10px rgba(245,158,11,0.2);">● ATENÇÃO</span>'
              : '<span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;letter-spacing:0.04em;padding:2px 8px;border-radius:9999px;background:rgba(16,185,129,0.16);border:1px solid rgba(52,211,153,0.45);color:#6ee7b7;box-shadow:0 0 10px rgba(16,185,129,0.2);">● NORMAL</span>');

          const card = document.createElement('div');
          card.style.cssText = `
            background: ${isLightMode ? 'linear-gradient(155deg, rgba(255, 255, 255, 0.95), rgba(245, 238, 255, 0.90))' : 'linear-gradient(155deg, rgba(46, 23, 82, 0.72), rgba(22, 11, 44, 0.82))'};
            border: 1px solid ${isCrit ? 'rgba(251, 113, 133, 0.48)' : (isLightMode ? 'rgba(147, 51, 234, 0.22)' : 'rgba(216, 180, 254, 0.25)')};
            border-radius: 16px;
            padding: 12px 14px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            box-shadow: ${isLightMode ? '0 4px 16px rgba(147, 51, 234, 0.08)' : '0 6px 20px rgba(0, 0, 0, 0.30), inset 0 1px 0 rgba(255, 255, 255, 0.12)'};
          `;

          let bucketsHtml = '';
          buckets.forEach(b => {
            const pct = Math.round((b.remainingFraction || 0) * 100);
            const color = pct > 40 ? '#34d399' : (pct > 15 ? '#fbbf24' : '#fb7185');
            const grad = pct > 40
              ? 'linear-gradient(90deg, #059669, #34d399)'
              : (pct > 15 ? 'linear-gradient(90deg, #d97706, #fbbf24)' : 'linear-gradient(90deg, #e11d48, #fb7185)');
            const glow = pct > 40 ? 'rgba(52, 211, 153, 0.4)' : (pct > 15 ? 'rgba(251, 191, 36, 0.4)' : 'rgba(251, 113, 133, 0.5)');
            const resetTxt = formatResetTime(b.resetTime);
            const is5h = b.window === '5h';
            const winLabel = is5h ? '5 Horas' : (b.window === 'weekly' ? 'Semanal' : b.displayName);
            const winIcon = is5h
              ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.85;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
              : '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.85;"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';

            bucketsHtml += `
              <div style="display: flex; flex-direction: column; gap: 5px; background: ${isLightMode ? 'rgba(238, 230, 252, 0.6)' : 'rgba(14, 6, 28, 0.48)'}; border: 1px solid ${isLightMode ? 'rgba(147, 51, 234, 0.14)' : 'rgba(192, 132, 252, 0.14)'}; border-radius: 10px; padding: 7px 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px;">
                  <span style="color: ${isLightMode ? '#3b1d60' : '#e9d5ff'}; font-size: 11.5px; font-weight: 600; display: inline-flex; align-items: center; gap: 5px;">${winIcon}${winLabel}</span>
                  <div style="display: flex; align-items: center; gap: 7px;">
                    ${resetTxt ? `<span style="color: ${isLightMode ? '#6b21a8' : '#c084fc'}; font-size: 10px; font-weight: 500; background: ${isLightMode ? 'rgba(147, 51, 234, 0.08)' : 'rgba(139, 92, 246, 0.15)'}; padding: 2px 7px; border-radius: 9999px;">↻ ${resetTxt}</span>` : ''}
                    <span style="color: ${color}; font-size: 13.5px; font-weight: 800; font-variant-numeric: tabular-nums; text-shadow: 0 0 10px ${glow};">${pct}%</span>
                  </div>
                </div>
                <div style="width: 100%; height: 7px; background: ${isLightMode ? 'rgba(0, 0, 0, 0.08)' : 'rgba(10, 4, 20, 0.85)'}; border-radius: 9999px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06);">
                  <div style="width: ${Math.max(pct, 2)}%; height: 100%; background: ${grad}; border-radius: 9999px; box-shadow: 0 0 10px ${glow};"></div>
                </div>
              </div>
            `;
          });

          card.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
              <div style="display: flex; align-items: center; gap: 9px; min-width: 0;">
                <div style="width: 30px; height: 30px; border-radius: 9px; background: ${vis.iconBg}; border: 1px solid ${vis.iconBorder}; color: ${vis.accent}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 0 14px ${vis.iconBg};">
                  ${vis.svg}
                </div>
                <span style="font-size: 13px; font-weight: 700; color: ${isLightMode ? '#22123b' : '#fcfaff'}; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${g.displayName}</span>
              </div>
              ${statusPill}
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              ${bucketsHtml}
            </div>
          `;
          quotaSection.appendChild(card);
        });
      }
      renderQuotaCards(quotaGroups);

      // BARRA DE FILTROS (SEGMENTED CONTROL MODERNO)
      const filterBar = document.createElement('div');
      filterBar.style.cssText = `padding: 10px 22px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; background: ${isLightMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(16, 7, 32, 0.45)'}; border-bottom: 1px solid ${isLightMode ? 'rgba(147, 51, 234, 0.12)' : 'rgba(192, 132, 252, 0.14)'}; flex-shrink: 0;`;
      filterBar.innerHTML = `
        <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 6px; background: ${isLightMode ? 'rgba(147, 51, 234, 0.08)' : 'rgba(12, 5, 24, 0.55)'}; padding: 4px; border-radius: 9999px; border: 1px solid ${isLightMode ? 'rgba(147, 51, 234, 0.15)' : 'rgba(192, 132, 252, 0.18)'};">
          <button id="agy-filter-waiting" data-filter="needs_me" style="padding: 5px 13px; border-radius: 9999px; font-size: 11.5px; font-weight: 600; cursor: pointer; background: ${isLightMode ? 'rgba(147, 51, 234, 0.20)' : 'rgba(192, 132, 252, 0.25)'}; border: 1px solid ${isLightMode ? 'rgba(147, 51, 234, 0.4)' : 'rgba(192, 132, 252, 0.5)'}; color: ${isLightMode ? '#22123b' : '#fcfaff'}; display: flex; align-items: center; gap: 6px; transition: all 0.15s ease;">
            Precisam de mim (${waitingCount})
            ${waitingCount > 0 ? '<span class="agy-new-msg-beacon" style="width:6px;height:6px;background:#fbbf24;box-shadow:0 0 8px #fbbf24;"></span>' : ''}
          </button>
          <button id="agy-filter-processing" data-filter="processing" style="padding: 5px 13px; border-radius: 9999px; font-size: 11.5px; font-weight: 600; cursor: pointer; background: transparent; border: 1px solid transparent; color: ${isLightMode ? '#0284c7' : '#bae6fd'}; display: flex; align-items: center; gap: 6px; transition: all 0.15s ease;">
            Em processamento (${processingCount})
            ${processingCount > 0 ? '<span style="width:6px;height:6px;border-radius:9999px;background:#38bdf8;box-shadow:0 0 8px #38bdf8;display:inline-block;"></span>' : ''}
          </button>
          <button id="agy-filter-finished" data-filter="finished" style="padding: 5px 13px; border-radius: 9999px; font-size: 11.5px; font-weight: 600; cursor: pointer; background: transparent; border: 1px solid transparent; color: ${isLightMode ? '#059669' : '#a7f3d0'}; display: flex; align-items: center; gap: 6px; transition: all 0.15s ease;">
            Terminaram (${finishedCount})
          </button>
          <button id="agy-filter-all" data-filter="all" style="padding: 5px 13px; border-radius: 9999px; font-size: 11.5px; font-weight: 600; cursor: pointer; background: transparent; border: 1px solid transparent; color: ${isLightMode ? '#6b21a8' : '#d8b4fe'}; transition: all 0.15s ease;">Todas (${convos.length})</button>
        </div>
        <span style="font-size: 11.5px; color: ${isLightMode ? '#6b21a8' : '#c084fc'}; display: flex; align-items: center; gap: 6px;">Atalho: <kbd style="background: ${isLightMode ? 'rgba(147, 51, 234, 0.14)' : 'rgba(192, 132, 252, 0.22)'}; padding: 2px 8px; border-radius: 6px; border: 1px solid ${isLightMode ? 'rgba(147, 51, 234, 0.3)' : 'rgba(192, 132, 252, 0.35)'}; font-weight: 600; font-size: 11px;">Alt + G</kbd></span>
      `;

      // GRID CONTAINER DOS QUADRADINHOS
      const grid = document.createElement('div');
      grid.id = 'agy-cards-grid-container';
      grid.style.cssText = 'padding: 18px 22px; display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); grid-auto-rows: max-content; align-content: start; gap: 14px; overflow-y: auto; flex: 1; min-height: 0;';

      function renderCards(list) {
        grid.innerHTML = '';
        if (list.length === 0) {
          grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 48px; color: #c084fc; font-size: 14px; font-weight: 500;">Nenhuma conversa nesta visualização.</div>';
          return;
        }

        list.forEach((c, idx) => {
          const card = document.createElement('div');
          card.className = 'agy-grid-card-box';

          let baseBg, hoverBg, baseBorder, topGlow, statusDesc;

          if (isLightMode) {
            baseBg = c.selected
              ? 'linear-gradient(155deg, rgba(243, 232, 255, 0.95), rgba(233, 213, 255, 0.98))'
              : 'linear-gradient(155deg, rgba(255, 255, 255, 0.95), rgba(248, 244, 255, 0.95))';
            hoverBg = 'linear-gradient(155deg, #ffffff, rgba(243, 232, 255, 1))';
            baseBorder = c.state === 'processing'
              ? 'rgba(14, 165, 233, 0.55)'
              : (c.selected ? 'rgba(147, 51, 234, 0.70)' : (c.state === 'needs_me' ? 'rgba(245, 158, 11, 0.55)' : 'rgba(147, 51, 234, 0.22)'));
            topGlow = c.state === 'needs_me' ? 'rgba(245, 158, 11, 0.35)' : 'rgba(147, 51, 234, 0.25)';
          } else {
            baseBg = c.selected
              ? 'linear-gradient(155deg, rgba(126, 34, 206, 0.52), rgba(67, 20, 118, 0.68))'
              : 'linear-gradient(155deg, rgba(46, 22, 82, 0.60), rgba(22, 10, 42, 0.72))';
            hoverBg = c.selected
              ? 'linear-gradient(155deg, rgba(147, 51, 234, 0.68), rgba(88, 28, 135, 0.80))'
              : 'linear-gradient(155deg, rgba(68, 34, 120, 0.72), rgba(36, 17, 66, 0.82))';
            baseBorder = c.state === 'processing'
              ? 'rgba(56, 189, 248, 0.55)'
              : (c.selected ? 'rgba(233, 213, 255, 0.80)' : (c.state === 'needs_me' ? 'rgba(251, 191, 36, 0.48)' : 'rgba(216, 180, 254, 0.22)'));
            topGlow = c.state === 'needs_me' ? 'rgba(245, 158, 11, 0.45)' : 'rgba(192, 132, 252, 0.30)';
          }

          const baseShadow = c.selected
            ? (isLightMode ? '0 8px 24px rgba(147, 51, 234, 0.18)' : '0 10px 28px rgba(168, 85, 247, 0.35), inset 0 1px 0 rgba(255,255,255,0.25)')
            : (isLightMode ? '0 4px 16px rgba(147, 51, 234, 0.08)' : '0 6px 20px rgba(0, 0, 0, 0.32), inset 0 1px 0 rgba(255,255,255,0.10)');

          card.style.cssText = `
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
            background: ${baseBg};
            border: 1px solid ${baseBorder};
            border-radius: 18px;
            padding: 15px 17px 13px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 12px;
            cursor: pointer;
            backdrop-filter: blur(16px);
            transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: ${baseShadow};
          `;

          // TOP ROW COM STATUS PILL E TEMPO
          const topRow = document.createElement('div');
          topRow.style.cssText = 'display: flex; align-items: center; justify-content: space-between; gap: 6px; flex-shrink: 0;';

          let leftBadge = '';
          if (c.state === 'processing') {
            leftBadge = `<span style="display: inline-flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 700; letter-spacing: 0.04em; padding: 3px 9px; border-radius: 9999px; background: rgba(56, 189, 248, 0.16); border: 1px solid rgba(56, 189, 248, 0.48); color: #38bdf8; box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);"><span style="width:6px;height:6px;border-radius:50%;background:#38bdf8;box-shadow:0 0 6px #38bdf8;animation:agyPulseBeacon 1.2s infinite ease-in-out;"></span>PROCESSANDO</span>`;
            statusDesc = `<div style="display:flex;align-items:center;gap:6px;font-size:11.5px;font-weight:500;color:${isLightMode ? '#0284c7' : '#7dd3fc'};background:${isLightMode ? 'rgba(14,165,233,0.1)' : 'rgba(56,189,248,0.10)'};padding:4px 9px;border-radius:8px;margin-top:6px;border:1px solid ${isLightMode ? 'rgba(14,165,233,0.25)' : 'rgba(56,189,248,0.22)'};"><span>⟳</span> Em execução autônoma...</div>`;
          } else if (c.selected) {
            leftBadge = `<span style="display: inline-flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 700; letter-spacing: 0.04em; padding: 3px 9px; border-radius: 9999px; background: rgba(168, 85, 247, 0.22); border: 1px solid rgba(216, 180, 254, 0.55); color: #f5d0fe; box-shadow: 0 0 12px rgba(168, 85, 247, 0.3);">✦ ATIVA AGORA</span>`;
            statusDesc = `<div style="display:flex;align-items:center;gap:6px;font-size:11.5px;font-weight:500;color:${isLightMode ? '#6b21a8' : '#e9d5ff'};background:${isLightMode ? 'rgba(147,51,234,0.1)' : 'rgba(168,85,247,0.12)'};padding:4px 9px;border-radius:8px;margin-top:6px;border:1px solid ${isLightMode ? 'rgba(147,51,234,0.25)' : 'rgba(192,132,252,0.25)'};"><span>●</span> Janela atual focada</div>`;
          } else if (c.state === 'needs_me') {
            leftBadge = `<span style="display: inline-flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 700; letter-spacing: 0.04em; padding: 3px 9px; border-radius: 9999px; background: rgba(245, 158, 11, 0.18); border: 1px solid rgba(251, 191, 36, 0.48); color: #fbbf24; box-shadow: 0 0 12px rgba(245, 158, 11, 0.25);"><span class="agy-new-msg-beacon" style="width:6px;height:6px;background:#fbbf24;box-shadow:0 0 8px #fbbf24;"></span>PRECISA DE VOCÊ</span>`;
            statusDesc = `<div style="display:flex;align-items:center;gap:6px;font-size:11.5px;font-weight:600;color:${isLightMode ? '#b45309' : '#fde68a'};background:${isLightMode ? 'rgba(245,158,11,0.12)' : 'rgba(245,158,11,0.12)'};padding:4px 9px;border-radius:8px;margin-top:6px;border:1px solid ${isLightMode ? 'rgba(245,158,11,0.35)' : 'rgba(251,191,36,0.30)'};"><span>⚡</span> Aguardando sua resposta</div>`;
          } else {
            leftBadge = `<span style="display: inline-flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 9999px; background: ${isLightMode ? 'rgba(147,51,234,0.08)' : 'rgba(192,132,252,0.12)'}; border: 1px solid ${isLightMode ? 'rgba(147,51,234,0.2)' : 'rgba(192,132,252,0.22)'}; color: ${isLightMode ? '#6b21a8' : '#d8b4fe'};">✓ Concluída</span>`;
            statusDesc = `<div style="display:flex;align-items:center;gap:6px;font-size:11.5px;font-weight:500;color:${isLightMode ? '#6b7280' : 'rgba(216,180,254,0.68)'};background:${isLightMode ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'};padding:4px 9px;border-radius:8px;margin-top:6px;border:1px solid ${isLightMode ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)'};"><span>✓</span> Histórico pronto para consulta</div>`;
          }

          topRow.innerHTML = `
            <div style="display: flex; align-items: center; gap: 6px;">${leftBadge}</div>
            <span style="font-size: 10.5px; font-weight: 600; padding: 2px 8px; background: ${isLightMode ? 'rgba(147, 51, 234, 0.08)' : 'rgba(12, 5, 24, 0.50)'}; border: 1px solid ${isLightMode ? 'rgba(147, 51, 234, 0.18)' : 'rgba(192, 132, 252, 0.20)'}; border-radius: 9999px; color: ${isLightMode ? '#4c1d95' : '#e9d5ff'}; font-variant-numeric: tabular-nums;">⏱ ${c.time}</span>
          `;

          // BODY COM TITULO E DESCRICAO CONTEXTUAL
          const titleWrap = document.createElement('div');
          titleWrap.style.cssText = 'flex: 1; display: flex; flex-direction: column; justify-content: flex-start;';
          const titleDiv = document.createElement('div');
          titleDiv.style.cssText = `font-size: 14px; font-weight: 700; letter-spacing: -0.01em; color: ${isLightMode ? '#1e1133' : '#fcfaff'}; line-height: 1.38; min-height: 38px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word;`;
          titleDiv.title = c.title;
          titleDiv.textContent = c.title;
          titleWrap.appendChild(titleDiv);
          titleWrap.innerHTML += statusDesc;

          // FOOTER COM INDICE E BOTAO ABRIR
          const footerRow = document.createElement('div');
          footerRow.style.cssText = `display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: ${isLightMode ? '#6b21a8' : '#c4b5fd'}; border-top: 1px solid ${isLightMode ? 'rgba(147, 51, 234, 0.12)' : 'rgba(216, 180, 254, 0.12)'}; padding-top: 9px; flex-shrink: 0;`;

          const indexSpan = document.createElement('span');
          indexSpan.style.cssText = `font-size: 11px; font-weight: 600; color: ${isLightMode ? 'rgba(107, 33, 168, 0.65)' : 'rgba(216, 180, 254, 0.55)'}; font-variant-numeric: tabular-nums;`;
          indexSpan.textContent = '#' + String(idx + 1).padStart(2, '0');

          const statusSpan = document.createElement('span');
          statusSpan.className = 'agy-card-open-btn';
          statusSpan.style.cssText = `display: inline-flex; align-items: center; gap: 5px; font-size: 11px; padding: 3px 12px; border-radius: 9999px; font-weight: 700; ${c.selected ? (isLightMode ? 'background: rgba(147, 51, 234, 0.18); color: #7e22ce; border: 1px solid rgba(147, 51, 234, 0.35);' : 'background: rgba(253, 224, 71, 0.18); color: #fde047; border: 1px solid rgba(253, 224, 71, 0.45);') : (isLightMode ? 'background: rgba(147, 51, 234, 0.12); color: #581c87; border: 1px solid rgba(147, 51, 234, 0.3);' : 'background: linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(126, 34, 206, 0.35)); color: #fcfaff; border: 1px solid rgba(216, 180, 254, 0.38);')} transition: all 0.15s ease;`;
          statusSpan.innerHTML = c.selected ? 'Em uso' : 'Abrir <span class="agy-arrow" style="display:inline-block;transition:transform 0.15s ease;">↗</span>';

          footerRow.appendChild(indexSpan);
          footerRow.appendChild(statusSpan);

          card.appendChild(topRow);
          card.appendChild(titleWrap);
          card.appendChild(footerRow);

          // HOVER MICROINTERACOES
          card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-3px)';
            card.style.borderColor = isLightMode ? 'rgba(147, 51, 234, 0.65)' : 'rgba(233, 213, 255, 0.88)';
            card.style.background = hoverBg;
            card.style.boxShadow = isLightMode
              ? '0 12px 28px rgba(147, 51, 234, 0.16), 0 0 16px rgba(147, 51, 234, 0.12)'
              : `0 12px 30px rgba(0, 0, 0, 0.45), 0 0 24px ${topGlow}, inset 0 1px 0 rgba(255,255,255,0.22)`;
            const arrow = card.querySelector('.agy-arrow');
            if (arrow) arrow.style.transform = 'translate(2px, -2px)';
          });
          card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.borderColor = baseBorder;
            card.style.background = baseBg;
            card.style.boxShadow = baseShadow;
            const arrow = card.querySelector('.agy-arrow');
            if (arrow) arrow.style.transform = 'translate(0, 0)';
          });

          card.addEventListener('click', () => {
            readSet.add(c.id);
            saveReadConvos(readSet);
            modal.remove();
            if (c.el) {
              const a = c.el.querySelector('a');
              if (a) a.click();
              else c.el.click();
            }
          });

          grid.appendChild(card);
        });
      }

      let currentFilter = 'needs_me';
      const filterBtns = Array.from(filterBar.querySelectorAll('button[data-filter]'));
      const btnWait = filterBar.querySelector('#agy-filter-waiting');
      const btnFin = filterBar.querySelector('#agy-filter-finished');

      function applyFilter(filterName) {
        currentFilter = filterName;
        filterBtns.forEach(b => {
          const active = b.getAttribute('data-filter') === filterName;
          if (isLightMode) {
            b.style.background = active ? 'rgba(147, 51, 234, 0.22)' : 'transparent';
            b.style.borderColor = active ? 'rgba(147, 51, 234, 0.45)' : 'transparent';
            b.style.color = active ? '#22123b' : '#6b21a8';
          } else {
            b.style.background = active ? 'rgba(192, 132, 252, 0.25)' : 'transparent';
            b.style.borderColor = active ? 'rgba(192, 132, 252, 0.5)' : 'transparent';
            b.style.color = active ? '#fcfaff' : '#d8b4fe';
          }
        });
        if (filterName === 'all') renderCards(convos);
        else renderCards(convos.filter(c => c.state === filterName));
      }

      applyFilter('needs_me');

      filterBtns.forEach(b => {
        b.addEventListener('click', () => applyFilter(b.getAttribute('data-filter')));
      });

      header.querySelector('#agy-refresh-quota-btn')?.addEventListener('click', async (ev) => {
        const b = ev.currentTarget;
        b.textContent = '⏳...';
        const fresh = await fetchAgyQuota();
        if (fresh) renderQuotaCards(fresh);
        b.textContent = '🔄 Cotas';
      });

      header.querySelector('#agy-mark-all-read-btn')?.addEventListener('click', () => {
        convos.forEach(c => {
          readSet.add(c.id);
          c.isRead = true;
          if (!c.isProcessing) {
            c.isWaitingResponse = c.isBackendWaiting;
            c.state = c.isBackendWaiting ? 'needs_me' : 'finished';
          }
        });
        saveReadConvos(readSet);
        const newWait = convos.filter(c => c.state === 'needs_me').length;
        const newFin = convos.filter(c => c.state === 'finished').length;
        if (btnWait) btnWait.innerHTML = `Precisam de mim (${newWait})${newWait > 0 ? '<span class="agy-new-msg-beacon" style="width:6px;height:6px;background:#fbbf24;box-shadow:0 0 8px #fbbf24;"></span>' : ''}`;
        if (btnFin) btnFin.textContent = `Terminaram (${newFin})`;
        const tb = document.querySelector('#agy-grid-toggle-btn .agy-new-msg-beacon');
        if (tb) tb.style.display = newWait > 0 ? 'inline-block' : 'none';
        applyFilter(currentFilter);
      });

      content.appendChild(header);
      content.appendChild(quotaSection);
      content.appendChild(filterBar);
      content.appendChild(grid);
      modal.appendChild(content);

      modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
      document.body.appendChild(modal);
      document.getElementById('agy-close-grid-btn')?.addEventListener('click', () => modal.remove());
    }

    function mountSquareGridButton() {
      const settingsBtn = Array.from(document.querySelectorAll('button')).find(
        b => b.innerText && b.innerText.trim().includes('Settings')
      );
      if (!settingsBtn || !settingsBtn.parentElement) return;

      const parent = settingsBtn.parentElement;
      parent.style.display = 'flex';
      parent.style.flexDirection = 'row';
      parent.style.alignItems = 'center';
      parent.style.gap = '6px';

      settingsBtn.style.flex = '1';
      settingsBtn.style.minWidth = '0';

      let btn = document.getElementById('agy-grid-toggle-btn');
      if (!btn) {
        btn = document.createElement('button');
        btn.id = 'agy-grid-toggle-btn';
        btn.type = 'button';
        btn.title = 'Quadradinhos de Conversas (Alt + G)';
        btn.innerHTML = `
          <span style="font-size: 15px; line-height: 1;">⊞</span>
          <span class="agy-new-msg-beacon" style="position: absolute; top: 3px; right: 3px; width: 6px; height: 6px; display: none;"></span>
        `;
        btn.style.cssText = `
          position: relative;
          width: 32px;
          height: 32px;
          min-width: 32px;
          border-radius: 8px;
          background: rgba(55, 26, 90, 0.80);
          border: 1px solid rgba(192, 132, 252, 0.42);
          color: #fcfaff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease;
          flex-shrink: 0;
        `;
        btn.onmouseenter = () => {
          btn.style.background = 'rgba(88, 28, 135, 0.92)';
          btn.style.borderColor = 'rgba(216, 180, 254, 0.85)';
        };
        btn.onmouseleave = () => {
          btn.style.background = 'rgba(55, 26, 90, 0.80)';
          btn.style.borderColor = 'rgba(192, 132, 252, 0.42)';
        };
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          openProjectGridModal();
        });
        parent.appendChild(btn);
      }

      const readSet = getReadConvos();
      const rows = document.querySelectorAll('.agy-sidebar-row');
      let unreadCount = 0;
      rows.forEach((r, i) => {
        const id = r.getAttribute('data-cascade-id') || ('convo-' + i);
        const sel = r.getAttribute('data-selected') === 'true';
        if (sel) {
          readSet.add(id);
        } else if (!readSet.has(id)) {
          unreadCount++;
        }
      });
      if (btn) {
        const beacon = btn.querySelector('.agy-new-msg-beacon');
        if (beacon) beacon.style.display = unreadCount > 0 ? 'inline-block' : 'none';
      }
    }

    function injectSkin() {
      if (typeof document === 'undefined' || !document.head || !document.body) {
        setTimeout(injectSkin, 50);
        return;
      }

      ensureStyles();
      const savedMode = getSavedThemeMode();
      applyThemeMode(savedMode);
      ensureTopBar();
      mountSquareGridButton();

      if (!isMountedOnce) {
        isMountedOnce = true;

        window.addEventListener('keydown', (e) => {
          if (e.altKey && e.key.toLowerCase() === 'g') {
            e.preventDefault();
            openProjectGridModal();
          } else if (e.altKey && e.key.toLowerCase() === 'l') {
            e.preventDefault();
            const isCurrentlyLight = document.body.classList.contains('agy-theme-light');
            applyThemeMode(isCurrentlyLight ? 'dark' : 'light');
          } else if (e.altKey && e.key.toLowerCase() === 'n') {
            e.preventDefault();
            window.__setEyeComfortMode?.(!document.documentElement.classList.contains('agy-eye-comfort'));
          } else if (e.key === 'Escape') {
            document.getElementById('agy-project-grid-modal')?.remove();
          }
        });

        setInterval(() => {
          if (!document.getElementById('antigravity-nocturne-skin-style')) ensureStyles();
          ensureTopBar();
          mountSquareGridButton();
        }, 1500);
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', injectSkin);
    } else {
      injectSkin();
    }
  })();
} catch (e) {
  console.error('Failed to load Nocturne Tactical Skin:', e);
}
// --- END NOCTURNE TACTICAL SKIN INJECTION (DUAL MODE DARK/LIGHT & PREMIUM GRID) ---
