const LEVEL_CLASSES = [
  "bg-[#232320]",
  "bg-[#123321]",
  "bg-[#1d5e33]",
  "bg-[#2c9146]",
  "bg-accent-2",
];

export default function Heatmap({ data }: { data: number[] }) {
  return (
    <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
      {data.map((level, i) => (
        <div key={i} className={`w-[11px] h-[11px] rounded-[2px] ${LEVEL_CLASSES[level]}`} />
      ))}
    </div>
  );
}