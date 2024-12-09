export function Highlight({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <span className={`font-bold text-primary-foreground p-1 bg-primary`}>{children}</span>;
}
