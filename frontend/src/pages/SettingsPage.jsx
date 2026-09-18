import { Check, Palette } from "lucide-react";

import { useThemeStore } from "../store/useThemeStore.js";

const themes = [
  "light",
  "dark",
  "night",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "forest",
  "aqua",
  "luxury",
  "dracula",
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <main className="mx-auto min-h-[calc(100vh-65px)] max-w-5xl px-4 py-8">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <Palette className="size-7 text-primary" />

          <h1 className="text-2xl font-bold">
            Theme Settings
          </h1>
        </div>

        <p className="text-base-content/60">
          Choose a theme for your chat application.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {themes.map((themeName) => {
          const isSelected = theme === themeName;

          return (
            <button
              key={themeName}
              type="button"
              data-theme={themeName}
              onClick={() => setTheme(themeName)}
              className={`relative overflow-hidden rounded-xl border-2 bg-base-100 p-3 text-left transition-all hover:-translate-y-1 hover:shadow-lg ${
                isSelected
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-base-300"
              }`}
            >
              {isSelected && (
                <span className="absolute right-2 top-2 z-10 flex size-6 items-center justify-center rounded-full bg-primary text-primary-content">
                  <Check className="size-4" />
                </span>
              )}

              <div className="mb-3 space-y-2 rounded-lg bg-base-200 p-3">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-primary" />

                  <div className="h-2 w-16 rounded bg-base-content/30" />
                </div>

                <div className="flex justify-end">
                  <div className="h-6 w-16 rounded-lg bg-primary" />
                </div>

                <div className="flex justify-start">
                  <div className="h-6 w-20 rounded-lg bg-base-300" />
                </div>
              </div>

              <p className="truncate text-center font-medium capitalize">
                {themeName}
              </p>
            </button>
          );
        })}
      </div>

      <section className="mt-10 rounded-xl border border-base-300 bg-base-100 p-6">
        <h2 className="mb-4 text-lg font-semibold">
          Preview
        </h2>

        <div className="rounded-xl bg-base-200 p-4">
          <div className="chat chat-start">
            <div className="chat-header mb-1 text-xs opacity-60">
              Friend
            </div>

            <div className="chat-bubble">
              How does this theme look?
            </div>
          </div>

          <div className="chat chat-end">
            <div className="chat-header mb-1 text-xs opacity-60">
              You
            </div>

            <div className="chat-bubble chat-bubble-primary">
              It looks great!
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SettingsPage;