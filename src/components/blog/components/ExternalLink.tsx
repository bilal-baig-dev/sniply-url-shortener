const ExternalLink = ({ href, children }: { href: string; children: React.ReactElement }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

export default ExternalLink;
