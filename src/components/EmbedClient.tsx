"use client";

import { useState } from "react";
import {
  Bot,
  Check,
  ChevronRight,
  Code2,
  Copy,
  ExternalLink,
  Globe,
  MessageCircle,
  Monitor,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

const EmbedClient = ({userId}:{userId:string}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"html" | "react">("html");
  const [showPreview, setShowPreview] = useState(true);

  const embedCode = `<script
  src="https://your-domain.com/nexora-widget.js"
  data-owner-id="${userId}"
  defer
></script>`;

  const reactCode = `import Script from "next/script";

export default function Layout() {
  return (
    <>
      {/* Your application */}
      <Script
        src="https://your-domain.com/nexora-widget.js"
        data-owner-id="${userId}"
        strategy="lazyOnload"
      />
    </>
  );
}`;

  const currentCode = activeTab === "html" ? embedCode : reactCode;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      toast.success("Embed code copied!", {
        description: "Paste it into your website to install Nexora AI.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Unable to copy the code", {
        description: "Please select and copy the code manually.",
      });
    }
  };

  return (
  <main className="min-h-screen bg-[#080817] px-4 py-6 text-white sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header — keep at the top */}
      {/* <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
            <Code2 className="size-6 text-white" />
          </div>

          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Embed Nexora AI
              </h1>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                Ready to install
              </span>
            </div>

            <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Integrate your AI-powered customer support assistant into any
              website with just a few lines of code.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-slate-300 sm:self-center">
          <ShieldCheck className="size-4 text-emerald-400" />
          Secure integration
        </div>
      </header> */}

      {/* Installation code — moved to the top */}
      <section className="overflow-hidden rounded-2xl border border-violet-400/20 bg-[#101024] shadow-2xl shadow-violet-950/20">
        <div className="border-b border-white/[0.08] p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 ring-1 ring-violet-400/20">
              <Code2 className="size-5 text-violet-300" />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                Installation code
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Choose your integration method and copy your personalized
                embed snippet.
              </p>
            </div>
          </div>

          {/* Integration tabs */}
          <div className="mt-5 inline-flex rounded-xl border border-white/[0.08] bg-[#080817] p-1">
            <button
              type="button"
              onClick={() => setActiveTab("html")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "html"
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/30"
                  : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              HTML
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("react")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "react"
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/30"
                  : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              React / Next.js
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {/* Code editor */}
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#080817]">
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.025] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-rose-400" />
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span className="size-2.5 rounded-full bg-emerald-400" />

                <span className="ml-2 text-xs text-slate-400">
                  {activeTab === "html" ? "index.html" : "layout.tsx"}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-lg border border-violet-400/20 bg-violet-500/10 px-3 py-2 text-xs font-medium text-violet-200 transition hover:border-violet-400/40 hover:bg-violet-500/20"
              >
                {copied ? (
                  <Check className="size-3.5 text-emerald-400" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                {copied ? "Copied!" : "Copy code"}
              </button>
            </div>

            <pre className="overflow-x-auto p-5 text-xs leading-7 text-violet-100 sm:text-sm">
              <code>{currentCode}</code>
            </pre>
          </div>

          {/* Helper message */}
          {/* <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-400/15 bg-amber-400/[0.06] p-4">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-amber-300" />

            <p className="text-xs leading-6 text-slate-300 sm:text-sm">
              Replace{" "}
              <code className="rounded-md bg-white/[0.08] px-1.5 py-0.5 text-amber-200">
                https://your-domain.com
              </code>{" "}
              with your deployed widget URL before installing it on your
              website.
            </p>
          </div> */}
        </div>
      </section>

      {/* Keep the remaining sections below this point:
          Overview cards, Live preview, Installation steps, Footer help.
          Use the same dark/violet styling for those sections. */}
    </div>
  </main>
);
};

export default EmbedClient;