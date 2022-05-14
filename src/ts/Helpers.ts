import randomWords from "random-words";

export function rw(min = 3, max = 7, maxLength = 7): string[] {
  return randomWords({ min, max, maxLength });
}

export function color(): string {
  const colors = [
    "bg-red-400/50",
    "bg-orange-400/50",
    "bg-amber-400/50",
    "bg-yellow-400/50",
    "bg-lime-400/50",
    "bg-green-400/50",
    "bg-emerald-400/50",
    "bg-teal-400/50",
    "bg-cyan-400/50",
    "bg-sky-400/50",
    "bg-blue-400/50",
    "bg-indigo-400/50",
    "bg-violet-400/50",
    "bg-purple-400/50",
    "bg-fuchsia-400/50",
    "bg-pink-400/50",
    "bg-rose-400/50",
    "bg-red-600/50",
    "bg-orange-600/50",
    "bg-amber-600/50",
    "bg-yellow-600/50",
    "bg-lime-600/50",
    "bg-green-600/50",
    "bg-emerald-600/50",
    "bg-teal-600/50",
    "bg-cyan-600/50",
    "bg-sky-600/50",
    "bg-blue-600/50",
    "bg-indigo-600/50",
    "bg-violet-600/50",
    "bg-purple-600/50",
    "bg-fuchsia-600/50",
    "bg-pink-600/50",
    "bg-rose-600/50",
  ];
  const value = colors[(+(Math.random() * 10000).toFixed()) % colors.length];
  return value;
}
