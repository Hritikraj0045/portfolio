const LEVEL_CLASSES = [
  "bg-black/10 dark:bg-white/10",
  "bg-green-200 dark:bg-green-950",
  "bg-green-300 dark:bg-green-800",
  "bg-green-500 dark:bg-green-500",
  "bg-green-700 dark:bg-green-300",
];

export default function Heatmap({ data }: { data: number[] }) {
  return (
    <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
      {data.map((level, i) => (
        <div
          key={i}
          className={`w-[11px] h-[11px] rounded-[2px] ${LEVEL_CLASSES[level] ?? LEVEL_CLASSES[0]}`}
        />
      ))}
    </div>
  );
}