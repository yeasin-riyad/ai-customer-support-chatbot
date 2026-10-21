(function () {
  const api_url = "https://ai-customer-support-chatbot-mauve.vercel.app/api/chat";
  const scriptTag = document.currentScript;
  const ownerId = scriptTag?.getAttribute("data-owner-id");

  if (!ownerId) {
    console.error("Nexora AI: Missing data-owner-id.");
    return;
  }

  // Prevent duplicate widgets.
  if (document.getElementById("nexora-chat-widget")) return;

  // ---- Styles for the animated typing indicator ----
  const style = document.createElement("style");
  style.textContent = `
    @keyframes nexora-bounce {
      0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
      40%           { transform: translateY(-5px); opacity: 1; }
    }
    .nexora-typing {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      height: 14px;
    }
    .nexora-typing span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #a5b4fc;
      animation: nexora-bounce 1.2s infinite ease-in-out;
    }
    .nexora-typing span:nth-child(2) { animation-delay: 0.15s; }
    .nexora-typing span:nth-child(3) { animation-delay: 0.30s; }
    @media (prefers-reduced-motion: reduce) {
      .nexora-typing span { animation: none; opacity: 0.6; }
    }
  `;
  document.head.appendChild(style);

  const root = document.createElement("div");
  root.id = "nexora-chat-widget";

  Object.assign(root.style, {
    position: "fixed",
    right: "24px",
    bottom: "24px",
    zIndex: "999999",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
    color: "#ffffff",
  });

  // Floating chat button.
  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("aria-label", "Open Nexora AI chat");
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = "🗨️";

  Object.assign(button.style, {
    width: "60px",
    height: "60px",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "27px",
    background: "linear-gradient(135deg, #8b5cf6, #4f46e5, #06b6d4)",
    boxShadow: "0 10px 35px rgba(99, 102, 241, 0.4)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
  });

  button.addEventListener("mouseenter", () => {
    button.style.transform = "scale(1.07)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1)";
  });

  // Chat panel.
  const panel = document.createElement("section");
  panel.setAttribute("aria-label", "Nexora AI customer support");
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "false");

  Object.assign(panel.style, {
    position: "absolute",
    right: "0",
    bottom: "76px",
    width: "min(370px, calc(100vw - 32px))",
    height: "min(540px, calc(100dvh - 130px))",
    minHeight: "320px",
    display: "none",
    flexDirection: "column",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "20px",
    background: "#0c0c1d",
    boxShadow: "0 25px 80px rgba(0,0,0,0.45)",
    opacity: "0",
    transform: "translateY(12px) scale(0.98)",
    transition: "opacity 0.2s ease, transform 0.2s ease",
  });

  // Header.
  const header = document.createElement("div");

  Object.assign(header.style, {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    background:
      "linear-gradient(110deg, rgba(139,92,246,0.25), rgba(6,182,212,0.10))",
    borderBottom: "1px solid rgba(255,255,255,0.09)",
  });

  const brand = document.createElement("div");

  Object.assign(brand.style, {
    display: "flex",
    alignItems: "center",
    gap: "11px",
  });

  const logo = document.createElement("div");
  logo.textContent = "✦";

  Object.assign(logo.style, {
    width: "40px",
    height: "40px",
    display: "grid",
    placeItems: "center",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
    fontSize: "22px",
    fontWeight: "bold",
  });

  const brandText = document.createElement("div");
  const brandName = document.createElement("div");
  brandName.textContent = "Nexora AI";

  Object.assign(brandName.style, {
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "-0.3px",
  });

  const brandStatus = document.createElement("div");
  brandStatus.textContent = "AI customer support";

  Object.assign(brandStatus.style, {
    marginTop: "4px",
    fontSize: "11px",
    color: "#a5b4fc",
  });

  brandText.append(brandName, brandStatus);
  brand.append(logo, brandText);

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.textContent = "×";
  closeButton.setAttribute("aria-label", "Close chat");

  Object.assign(closeButton.style, {
    border: "none",
    background: "transparent",
    color: "#cbd5e1",
    fontSize: "27px",
    cursor: "pointer",
    padding: "0 4px",
    lineHeight: "1",
  });

  header.append(brand, closeButton);

  // Messages area.
  const messages = document.createElement("div");
  messages.setAttribute("aria-live", "polite");
  messages.setAttribute("aria-relevant", "additions text");

  Object.assign(messages.style, {
    flex: "1",
    minHeight: "0",
    overflowY: "auto",
    padding: "18px 14px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    scrollbarWidth: "thin",
    scrollbarColor: "#37305a transparent",
  });

  // Input form.
  const form = document.createElement("form");

  Object.assign(form.style, {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    padding: "12px",
    borderTop: "1px solid rgba(255,255,255,0.09)",
    background: "#101020",
  });

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Ask us anything...";
  input.autocomplete = "off";
  input.maxLength = 5000;
  input.setAttribute("aria-label", "Your message");
  input.required = true;

  Object.assign(input.style, {
    flex: "1",
    minWidth: "0",
    height: "43px",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "12px",
    padding: "0 12px",
    background: "#080817",
    color: "#ffffff",
    fontSize: "13px",
    outline: "none",
  });

  const sendButton = document.createElement("button");
  sendButton.type = "submit";
  sendButton.setAttribute("aria-label", "Send message");
  sendButton.textContent = "➤";

  Object.assign(sendButton.style, {
    width: "43px",
    height: "43px",
    flexShrink: "0",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #8b5cf6, #4f46e5)",
    color: "#ffffff",
    fontSize: "19px",
    cursor: "pointer",
  });

  form.append(input, sendButton);
  panel.append(header, messages, form);
  root.append(panel, button);
  document.body.appendChild(root);

  let isOpen = false;
  let isSending = false;

  function addMessage(text, sender) {
    const row = document.createElement("div");

    Object.assign(row.style, {
      display: "flex",
      justifyContent: sender === "user" ? "flex-end" : "flex-start",
      width: "100%",
    });

    const bubble = document.createElement("div");

    Object.assign(bubble.style, {
      maxWidth: "85%",
      padding: "11px 13px",
      borderRadius:
        sender === "user"
          ? "15px 15px 4px 15px"
          : "15px 15px 15px 4px",
      background:
        sender === "user"
          ? "linear-gradient(135deg, #6d45d8, #4f46e5)"
          : "#19192c",
      border:
        sender === "user"
          ? "1px solid rgba(167,139,250,0.2)"
          : "1px solid rgba(255,255,255,0.07)",
      color: "#f1f5f9",
      fontSize: "13px",
      lineHeight: "1.65",
      whiteSpace: "pre-wrap",
      overflowWrap: "anywhere",
    });

    bubble.textContent = text;
    row.appendChild(bubble);
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;

    return bubble;
  }

  // Animated three-dot typing indicator inside a bot bubble.
  function addTypingIndicator() {
    const row = document.createElement("div");

    Object.assign(row.style, {
      display: "flex",
      justifyContent: "flex-start",
      width: "100%",
    });

    const bubble = document.createElement("div");

    Object.assign(bubble.style, {
      maxWidth: "85%",
      padding: "11px 13px",
      borderRadius: "15px 15px 15px 4px",
      background: "#19192c",
      border: "1px solid rgba(255,255,255,0.07)",
    });

    const dots = document.createElement("div");
    dots.className = "nexora-typing";
    dots.setAttribute("role", "status");
    dots.setAttribute("aria-label", "Nexora AI is typing");
    dots.innerHTML = "<span></span><span></span><span></span>";

    bubble.appendChild(dots);
    row.appendChild(bubble);
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;

    return {
      row,
      bubble,
      remove() {
        row.remove();
      },
      setText(text) {
        bubble.textContent = text;
        messages.scrollTop = messages.scrollHeight;
      },
    };
  }

  function setOpen(open) {
    isOpen = open;
    button.setAttribute("aria-expanded", String(open));

    if (open) {
      panel.style.display = "flex";

      requestAnimationFrame(() => {
        panel.style.opacity = "1";
        panel.style.transform = "translateY(0) scale(1)";
      });

      button.innerHTML = "×";
      button.setAttribute("aria-label", "Close Nexora AI chat");
      input.focus();
    } else {
      panel.style.opacity = "0";
      panel.style.transform = "translateY(12px) scale(0.98)";
      button.innerHTML = "🗨️";
      button.setAttribute("aria-label", "Open Nexora AI chat");

      window.setTimeout(() => {
        if (!isOpen) panel.style.display = "none";
      }, 200);
    }
  }

  function addWelcomeMessage() {
    if (messages.childElementCount === 0) {
      addMessage(
        "Hi there! 👋 Welcome to our support chat. How can I help you today?",
        "bot",
      );
    }
  }

  button.addEventListener("click", () => {
    setOpen(!isOpen);

    if (isOpen) {
      addWelcomeMessage();
    }
  });

  closeButton.addEventListener("click", () => setOpen(false));

  // ✅ FIXED: timeout raised to 200s so the client waits for Gemini's slow response.
  const REQUEST_TIMEOUT_MS = 200000;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = input.value.trim();

    if (!message || isSending) return;

    addMessage(message, "user");
    input.value = "";
    isSending = true;
    sendButton.disabled = true;
    input.disabled = true;
    sendButton.style.opacity = "0.6";
    sendButton.style.cursor = "wait";

    const typing = addTypingIndicator();

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      console.warn(
        "[Nexora] Request timed out after",
        REQUEST_TIMEOUT_MS,
        "ms",
      );
      controller.abort();
    }, REQUEST_TIMEOUT_MS);

    const t0 = performance.now();

    try {
      const response = await fetch(api_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerId,
          message,
        }),
        signal: controller.signal,
      });

      const result = await response.json();

      console.debug("[Nexora] response", {
        status: response.status,
        elapsedMs: Math.round(performance.now() - t0),
      });

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to get a response. Please try again.",
        );
      }

      typing.setText(
        result.data?.reply || "Sorry, I couldn't generate a response.",
      );
    } catch (error) {
      console.error("[Nexora] request failed", {
        name: error?.name,
        message: error?.message,
        elapsedMs: Math.round(performance.now() - t0),
      });

      typing.setText(
        error?.name === "AbortError"
          ? "That took too long. Please try again."
          : error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      );
    } finally {
      window.clearTimeout(timeoutId);
      isSending = false;
      sendButton.disabled = false;
      input.disabled = false;
      sendButton.style.opacity = "1";
      sendButton.style.cursor = "pointer";
      messages.scrollTop = messages.scrollHeight;
      input.focus();
    }
  });

  // Remove the widget if its script host page is unloaded.
  window.addEventListener(
    "pagehide",
    () => {
      root.remove();
    },
    { once: true },
  );
})();