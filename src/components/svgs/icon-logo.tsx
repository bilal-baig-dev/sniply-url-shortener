import * as React from "react";
interface Props extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  className?: string;
}

const SaaSPackLogoIcon = (props: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" viewBox="0 0 210 50" {...props}>
    <rect width={320} height={328.571} fill="#3e214f" rx={48} ry={48} transform="matrix(.15 0 0 .14 5.057 2)" />
    <path
      className="fill-black dark:fill-white"
      d="m82.348 16.364-3.082 2.391-.552-.184q-.23-1.748-1.334-2.99t-2.967-1.242q-1.518 0-2.438.943t-.92 2.3q0 .805.322 1.518t.76 1.242q.436.506 1.195 1.035t1.311.851q.575.322 1.472.782 1.265.644 2.116 1.127.828.483 1.656 1.104.851.644 1.311 1.242.483.598.782 1.38t.3 1.68q0 1.586-.898 2.99-.92 1.402-2.346 2.322t-3.174 1.472q-1.748.53-3.45.53-1.978 0-3.68-.852-1.725-.828-2.829-2.415l3.128-3.496.621.207q0 1.955 1.288 3.45 1.265 1.519 3.312 1.519 1.702 0 2.921-1.22 1.196-1.195 1.196-2.736 0-1.472-1.748-3.082-.483-.483-1.449-1.058t-1.955-1.058q-.966-.506-2.024-1.196-1.058-.714-1.84-1.427-.805-.69-1.334-1.701-.529-1.036-.529-2.14 0-1.679.713-2.99.713-1.287 1.91-2.046t2.667-1.127q1.45-.369 3.082-.369 2.576 0 4.163.737 1.587.759 2.323 2.507Zm14.95 5.382 1.932-1.22.46.3q-.529 5.358-.529 8.785 0 1.334.023 1.932 0 .598.115 1.311.092.69.322.943.207.23.621.23.736 0 2.231-1.334l.621.667q-.575.667-1.08 1.196-.53.53-1.22 1.081t-1.472.851-1.54.3q-1.726 0-2.002-2.14l-.414-.16q-3.15 2.391-5.98 2.391-1.242 0-2.162-.644-.943-.644-1.449-1.679t-.736-2.139q-.23-1.08-.23-2.162 0-4.899 1.978-7.406 1.978-2.484 5.796-2.484 2.438 0 4.715 1.38Zm-1.449 4.002q0-4.164-2.967-4.164-.897 0-1.61.345-.736.322-1.196.92t-.805 1.334q-.322.713-.506 1.587-.16.874-.253 1.656-.069.76-.069 1.564 0 .92.161 1.794t.506 1.702q.345.852 1.058 1.38.69.507 1.656.507 1.91 0 3.772-1.748.253-1.886.253-6.877Zm20.286-4.003 1.932-1.219.46.3q-.529 5.358-.529 8.785 0 1.334.023 1.932 0 .598.092 1.311.115.69.322.943.23.23.621.23.76 0 2.254-1.334l.621.667q-.575.667-1.08 1.196-.53.53-1.22 1.081t-1.472.851-1.54.3q-1.726 0-2.002-2.14l-.414-.16q-3.15 2.391-5.98 2.391-1.242 0-2.185-.644-.92-.644-1.426-1.679t-.736-2.139q-.23-1.08-.23-2.162 0-4.899 1.978-7.406 1.955-2.484 5.796-2.484 2.438 0 4.715 1.38Zm-1.449 4.002q0-4.163-2.967-4.163-.897 0-1.61.345-.736.322-1.196.92t-.805 1.334q-.322.713-.506 1.587-.16.874-.253 1.656-.069.76-.069 1.564 0 .92.161 1.794.138.874.506 1.702.345.852 1.058 1.38.69.507 1.656.507 1.886 0 3.772-1.748.253-1.886.253-6.877Zm23.828-9.383-3.059 2.391-.552-.184q-.23-1.748-1.357-2.99-1.104-1.242-2.944-1.242-1.518 0-2.438.943t-.92 2.3q0 .805.322 1.518.3.713.736 1.242.46.506 1.196 1.035.76.53 1.334.851.552.322 1.45.782 1.287.644 2.115 1.127t1.68 1.104q.827.644 1.31 1.242.46.598.76 1.38t.298 1.68q0 1.586-.897 2.99t-2.323 2.322q-1.449.92-3.197 1.472-1.725.53-3.427.53-1.978 0-3.703-.852-1.702-.828-2.806-2.415l3.128-3.496.598.207q0 1.956 1.288 3.45 1.288 1.519 3.335 1.519 1.702 0 2.898-1.22 1.22-1.195 1.22-2.736 0-1.472-1.749-3.082-.506-.483-1.472-1.058t-1.932-1.058q-.966-.506-2.024-1.196-1.058-.714-1.863-1.427-.782-.69-1.31-1.701-.53-1.036-.53-2.14 0-1.679.713-2.99.69-1.287 1.91-2.046 1.195-.76 2.644-1.127t3.082-.369q2.6 0 4.186.737 1.587.759 2.3 2.507Zm7.682 19.066-4.094 1.15-.368-.299q.23-5.589.23-14.674 0-4.278-.115-5.267-.092-.414-.368-.69-.276-.299-.736-.437-.46-.16-.782-.23-.345-.069-.874-.138v-.69l.253-.276h11.11q6.922 0 6.922 5.13 0 3.357-2.139 5.312-1.932 1.817-6.463 2.185-.299.023-.644 0t-.713 0-.69.07q-.299.045-.506.252-.184.184-.184.483 0 .69.161 8.12Zm-.16-10.649q0 .276.252.46t.621.184q2.714 0 4.301-1.679t1.587-4.163q0-1.955-1.196-3.266t-3.312-1.31h-.529q-.437-.024-.644 0-.23 0-.552.068t-.46.23q-.138.185-.138.438 0 3.058.07 9.038Zm25.644-3.036 1.955-1.219.437.3q-.506 5.358-.506 8.785 0 1.334.023 1.932 0 .598.092 1.311.092.69.322.943.23.23.621.23.76 0 2.254-1.334l.621.667q-.575.667-1.08 1.196-.53.53-1.22 1.081t-1.472.851-1.54.3q-1.726 0-2.002-2.14l-.414-.16q-3.15 2.391-5.98 2.391-1.242 0-2.185-.644-.92-.644-1.426-1.679t-.736-2.139q-.23-1.08-.23-2.162 0-4.899 1.955-7.406 1.978-2.484 5.82-2.484 2.437 0 4.691 1.38Zm-1.426 4.002q0-4.163-2.967-4.163-.897 0-1.61.345-.736.322-1.196.92t-.805 1.334q-.345.713-.506 1.587-.184.874-.253 1.656-.069.76-.069 1.564 0 .92.138 1.794.161.874.53 1.702.344.851 1.034 1.38.713.506 1.68.506 1.885 0 3.771-1.748.253-1.886.253-6.877Zm21.114-1.54-2.967 1.747-.552-.207q0-1.702-.69-2.875-.69-1.15-2.139-1.15-.989 0-1.725.713t-1.127 1.817q-.368 1.104-.529 2.162-.184 1.058-.184 2.001 0 .782.115 1.564.138.782.46 1.61t.782 1.472q.483.621 1.265 1.035.782.391 1.748.391 2.438 0 5.313-2.208l.391.092.322.46q-3.887 3.887-8.303 3.887-1.518 0-2.69-.575-1.174-.552-1.864-1.495-.667-.966-1.012-2.093-.322-1.127-.322-2.369 0-1.472.276-2.806.276-1.357.943-2.645.644-1.288 1.633-2.23.966-.944 2.484-1.519 1.495-.575 3.358-.575.943 0 1.771.207.828.184 1.564.598t1.173 1.173q.46.76.506 1.817Zm6.716 3.748-.276.3v7.336l-3.128.99-.529-.277q.092-2.898.092-11.592v-5.704q0-1.265-.184-2.093-.16-.713-.69-.92t-2.415-.368v-.92l.322-.253 6.463-.552.253.184-.138 5.244q-.138 5.221-.207 7.59h.437q.828-.644 3.703-3.289 2.875-2.622 4.646-3.818l1.886 1.196-.023.391q-4.83 2.576-7.935 4.945 4.968 7.2 6.371 7.2.598 0 1.081-.277.506-.276 1.196-.897l.713.76q-.713.804-1.265 1.402t-.966.966q-.414.345-.667.575-.276.207-.529.3-.23.091-.322.114t-.299 0q-.184-.023-.253-.023-.713 0-1.495-.598-.805-.598-1.587-1.633-.759-1.012-1.449-2.07-.667-1.058-1.472-2.277-.805-1.242-1.334-1.932Z"
    />
    <g fill="#e6767a">
      <path d="m25.26 21.423-1.45-3.773 1.77.403 1.055.241.031-.158-3.487-3.408c-4.085 1.19-8.17 2.383-12.254 3.576l5.807 6.07 8.529-2.95Zm9.254-6.654a13.167 13.167 0 0 0-.996 1.887 14.477 14.477 0 0 0-.912 3.009l1.179.27 1.507.343-.967 1.206-.4.499 6.913 2.39 5.803-6.07-5.486-1.6-6.641-1.934Z" />
      <path d="M28.783 29.385v12.738l-11.227-5.758-.825-11.992 12.052 5.012Zm11.228 6.98-11.228 5.758V29.385l12.054-5.012-.826 11.992Zm-8.504-15.959c.9-6.85 5.878-11.74 11.793-11.582-7.146-3.167-14.727 1.917-15.875 10.645-.685-.157-1.374-.316-2.06-.472 1.049 2.729 2.1 5.456 3.15 8.186l5.054-6.305-2.062-.472Z" />
    </g>
  </svg>
);
export default SaaSPackLogoIcon;