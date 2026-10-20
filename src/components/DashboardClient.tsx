
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import {
  Bot,
  Building2,
  Check,
  CircleHelp,
  ExternalLink,
  FileText,
  LoaderCircle,
  LogOut,
  Mail,
  Save,
  Settings2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

type DashboardClientProps = {
  ownerId: string;
};

type SettingsForm = {
  businessName: string;
  supportEmail: string;
  knowledge: string;
};

const initialForm: SettingsForm = {
  businessName: "",
  supportEmail: "",
  knowledge: "",
};

const DashboardClient = ({
  ownerId,
}: DashboardClientProps) => {
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();

  const [form, setForm] = useState<SettingsForm>(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/settings/get?ownerId=${encodeURIComponent(ownerId)}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );

      const result = await response.json();

      if (response.ok && result.success && result.data) {
        setForm({
          businessName: result.data.businessName ?? "",
          supportEmail: result.data.supportEmail ?? "",
          knowledge: result.data.knowledge ?? "",
        });
      } else if (response.status === 404) {
        // A first-time user has not saved settings yet.
        setForm(initialForm);
      } else {
        setError(result.message ?? "Unable to load your settings.");
      }
    } catch {
      setError("Could not connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [ownerId]);

  useEffect(() => {
    void loadSettings();
  }, [loadSettings]);

  const handleChange = (
    field: keyof SettingsForm,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.businessName.trim() || !form.supportEmail.trim()) {
      setError("Business name and support email are required.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerId,
          businessName: form.businessName.trim(),
          supportEmail: form.supportEmail.trim(),
          knowledge: form.knowledge,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message ?? "Failed to save your settings.");
        return;
      }

      setForm({
        businessName: result.data.businessName ?? "",
        supportEmail: result.data.supportEmail ?? "",
        knowledge: result.data.knowledge ?? "",
      });

      toast.success("Your settings have been saved successfully.")
      router.push("/embed");
    } catch {
      setError("Could not connect to the server. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

    const handleLogout = () => {
    window.location.href = "/api/auth/logout";
  };

  const enterAnimation = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: "easeOut" as const },
        };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#080817] text-white">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -left-48 top-20 h-[420px] w-[420px] rounded-full bg-violet-600/[0.12] blur-[140px]" />
        <div className="absolute -right-40 top-72 h-[380px] w-[380px] rounded-full bg-cyan-500/[0.08] blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-indigo-500/[0.08] blur-[120px]" />
      </div>

      {/* Header */}
      <motion.header
        initial={shouldReduceMotion ? false : { y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#080817]/85 backdrop-blur-2xl"
      >
        <nav className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Nexora AI home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 shadow-lg shadow-violet-500/20 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
              <Bot className="h-6 w-6 text-white" />
            </div>

            <div className="text-xl font-bold tracking-tight">
              nexora
              <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
                AI
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
           

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm text-slate-300 transition hover:border-rose-400/30 hover:bg-rose-500/10 hover:text-rose-300"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </nav>
      </motion.header>

      <div className="relative mx-auto flex max-w-[1600px] pt-[72px]">
        {/* Sidebar */}
      

        {/* Main content */}
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
          <motion.div {...enterAnimation()}>
            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.08] px-3 py-1.5 text-xs font-medium text-violet-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]" />
                  Workspace configuration
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Settings
                  <span className="text-violet-300">.</span>
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                  Configure your business profile and the knowledge Nexora AI
                  can use to assist your customers.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Workspace settings
              </div>
            </div>
          </motion.div>

          {/* Quick information cards */}
          {/* <motion.div
            {...enterAnimation(0.08)}
            className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-colors hover:border-violet-400/20">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
                  <Building2 className="h-5 w-5 text-violet-300" />
                </div>
                <span className="text-xs text-slate-500">Profile</span>
              </div>
              <p className="mt-4 text-sm font-medium text-white">
                Business information
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Manage your business name and support contact.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-colors hover:border-cyan-400/20">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10">
                  <FileText className="h-5 w-5 text-cyan-300" />
                </div>
                <span className="text-xs text-slate-500">AI context</span>
              </div>
              <p className="mt-4 text-sm font-medium text-white">
                Knowledge base
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Add information that helps guide AI responses.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-colors hover:border-indigo-400/20 sm:col-span-2 xl:col-span-1">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10">
                  <Mail className="h-5 w-5 text-indigo-300" />
                </div>
                <span className="text-xs text-slate-500">Contact</span>
              </div>
              <p className="mt-4 text-sm font-medium text-white">
                Support email
              </p>
              <p className="mt-1 break-all text-xs leading-5 text-slate-400">
                {form.supportEmail || email || "Add your support email"}
              </p>
            </div>
          </motion.div> */}

          {/* Settings form */}
          <motion.section
            {...enterAnimation(0.14)}
            className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#101020]/80 shadow-2xl shadow-black/20"
          >

            {isLoading ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center px-6 py-16">
                <LoaderCircle className="h-8 w-8 animate-spin text-violet-400" />
                <p className="mt-4 text-sm text-slate-400">
                  Loading your settings...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-7 p-5 sm:p-8">
                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-rose-400/20 bg-rose-500/[0.08] p-4 text-sm text-rose-200"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                {success && (
                  <div
                    role="status"
                    className="flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-500/[0.08] p-4 text-sm text-emerald-200"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>{success}</p>
                  </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="businessName"
                      className="text-sm font-medium text-slate-200"
                    >
                      Business name
                      <span className="ml-1 text-rose-300">*</span>
                    </label>

                    <div className="relative">
                      <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500" />
                      <input
                        id="businessName"
                        name="businessName"
                        type="text"
                        required
                        maxLength={150}
                        value={form.businessName}
                        onChange={(event) =>
                          handleChange("businessName", event.target.value)
                        }
                        placeholder="e.g. Nexora Solutions"
                        className="h-12 w-full rounded-xl border border-white/10 bg-[#090916] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/60 focus:ring-4 focus:ring-violet-500/10"
                      />
                    </div>
                    <p className="text-xs text-slate-500">
                      The name of your business or organization.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="supportEmail"
                      className="text-sm font-medium text-slate-200"
                    >
                      Support email
                      <span className="ml-1 text-rose-300">*</span>
                    </label>

                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500" />
                      <input
                        id="supportEmail"
                        name="supportEmail"
                        type="email"
                        required
                        maxLength={254}
                        value={form.supportEmail}
                        onChange={(event) =>
                          handleChange("supportEmail", event.target.value)
                        }
                        placeholder="support@example.com"
                        className="h-12 w-full rounded-xl border border-white/10 bg-[#090916] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/60 focus:ring-4 focus:ring-violet-500/10"
                      />
                    </div>
                    <p className="text-xs text-slate-500">
                      Where customers can reach your support team.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <label
                      htmlFor="knowledge"
                      className="text-sm font-medium text-slate-200"
                    >
                      Business knowledge
                    </label>
                    <span className="text-xs text-slate-500">
                      {form.knowledge.length.toLocaleString()} characters
                    </span>
                  </div>

                  <div className="relative">
                    <FileText className="pointer-events-none absolute left-4 top-4 h-[18px] w-[18px] text-slate-500" />
                    <textarea
                      id="knowledge"
                      name="knowledge"
                      rows={9}
                      maxLength={50000}
                      value={form.knowledge}
                      onChange={(event) =>
                        handleChange("knowledge", event.target.value)
                      }
                      placeholder={`Tell Nexora AI about your business.

For example:
• What products or services do you offer?
• What are your business hours?
• What are your return or refund policies?
• What are the most common customer questions?
• Are there any important instructions the AI should follow?`}
                      className="w-full resize-y rounded-xl border border-white/10 bg-[#090916] px-4 pb-4 pl-11 pt-4 text-sm leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/60 focus:ring-4 focus:ring-violet-500/10"
                    />
                  </div>

                  <div className="flex items-start gap-2 rounded-xl border border-cyan-400/10 bg-cyan-500/[0.04] p-3.5">
                    <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                    <p className="text-xs leading-5 text-slate-400">
                      Provide accurate, clear information such as FAQs, product
                      details, policies, and operating hours. Your AI workflow
                      must read this field for it to influence generated
                      responses.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col-reverse justify-between gap-4 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center">
                  <p className="text-xs leading-5 text-slate-500">
                    Fields marked <span className="text-rose-300">*</span> are
                    required.
                  </p>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:from-violet-500 hover:via-indigo-500 hover:to-cyan-500 focus:outline-none focus:ring-4 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSaving ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Saving settings...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.section>

          {/* Footer */}
          <motion.footer
            {...enterAnimation(0.2)}
            className="mt-8 flex flex-col justify-between gap-3 border-t border-white/[0.07] pt-6 text-xs text-slate-500 sm:flex-row sm:items-center"
          >
            <p>
              © {new Date().getFullYear()} Nexora AI. Built for better
              customer support.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 transition hover:text-cyan-300"
            >
              Back to home
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </motion.footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardClient;
