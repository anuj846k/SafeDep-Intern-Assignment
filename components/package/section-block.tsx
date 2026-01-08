import { cn } from "@/lib/utils";

type SectionProps = {
  title: string;
  blocks: {
    type: "text" | "note";
    value: string;
  }[];
  accent?: "primary" | "muted";
};

const accentStyles = {
  primary: "border-l-4 border-l-primary",
  muted: "border-l-4 border-l-border",
};

const SectionBlock = ({ title, blocks, accent = "muted" }: SectionProps) => {
  return (
    <div className={cn("flex flex-col gap-2 p-6", accentStyles[accent])}>
      <h2 className="text-xl font-medium leading-7 text-foreground">{title}</h2>

      {blocks.map((block, i) => {
        if (block.type === "note") {
          return (
            <p key={i} className="text-base leading-6 text-muted-foreground">
              <span className="font-medium text-foreground">Note:</span>{" "}
              {block.value}
            </p>
          );
        }

        return (
          <p key={i} className="text-base leading-6 text-muted-foreground">
            {block.value}
          </p>
        );
      })}
    </div>
  );
};

export default SectionBlock;
