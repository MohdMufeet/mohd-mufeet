type TechChipProps = {
  children?: string;
  label?: string;
};

export function TechChip({ children, label }: TechChipProps) {
  return <span className="tech-chip">{label ?? children}</span>;
}
