import * as React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  className?: string;
}
const UserIcon = (props: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 512 512" {...props}>
    <path d="M406.5 399.6c-19.1-46.7-65-79.6-118.5-79.6h-64c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256c0-114.9 93.1-208 208-208s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7c-32 20.1-69.8 31.7-110.4 31.7s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0-176 0z" />
  </svg>
);
export default UserIcon;