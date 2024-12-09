import * as React from "react";
interface Props extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  className?: string;
}

const LogoSvgIcon = (props: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" viewBox="0 0 60 50" {...props}>
    <rect width={320} height={328.571} className="text-primary fill-primary" rx={48} ry={48} transform="matrix(.15 0 0 .14 5.057 2)" />

    <g fill="#fff">
      <path d="m25.26 21.423-1.45-3.773 1.77.403 1.055.241.031-.158-3.487-3.408c-4.085 1.19-8.17 2.383-12.254 3.576l5.807 6.07 8.529-2.95Zm9.254-6.654a13.167 13.167 0 0 0-.996 1.887 14.477 14.477 0 0 0-.912 3.009l1.179.27 1.507.343-.967 1.206-.4.499 6.913 2.39 5.803-6.07-5.486-1.6-6.641-1.934Z" />
      <path d="M28.783 29.385v12.738l-11.227-5.758-.825-11.992 12.052 5.012Zm11.228 6.98-11.228 5.758V29.385l12.054-5.012-.826 11.992Zm-8.504-15.959c.9-6.85 5.878-11.74 11.793-11.582-7.146-3.167-14.727 1.917-15.875 10.645-.685-.157-1.374-.316-2.06-.472 1.049 2.729 2.1 5.456 3.15 8.186l5.054-6.305-2.062-.472Z" />
    </g>
  </svg>
);
export default LogoSvgIcon;
