import * as React from "react";
interface Props extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  className?: string;
}
const XIcon = (props: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={100} height={100} viewBox="0 0 48 48" {...props}>
    <path fill="#212121" fillRule="evenodd" d="M38 42H10a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4z" clipRule="evenodd" />
    <path fill="#fff" d="M34.257 34H27.82L13.829 14h6.437l13.991 20zm-5.67-1.696h2.563L19.499 15.696h-2.563l11.651 16.608z" />
    <path fill="#fff" d="m15.866 34 7.203-8.344-.942-1.249L13.823 34zM24.45 21.721l.905 1.289L33.136 14h-2z" />
  </svg>
);
export default XIcon;
