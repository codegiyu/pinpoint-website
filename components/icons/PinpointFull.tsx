import type { SVGProps } from 'react';
const SvgPinpointFull = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width="1em"
    height="1em"
    style={{
      shapeRendering: 'geometricPrecision',
      textRendering: 'geometricPrecision',
      imageRendering: 'auto',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
    }}
    viewBox="0 0 584 123"
    {...props}>
    <path
      // fill="#fd7702"
      className="coloured-text"
      d="M223.5-.5h21q53.603 17.16 42.5 73-14.127 36.697-53.5 38.5a178 178 0 0 0-11 11.5h-5a561 561 0 0 1 .5-74q6.818-13.122 21.5-9.5 15.005 7.503 9.5 23.5-3.977 7.736-12.5 9v14q33.61-8.355 25.5-42-13.406-24.97-40.5-16.5-13.53 6.785-17.5 21.5l-1 49q-2.382 3.701-5.5.5-31.842-32.06-11.5-72.5 13.563-20.643 37.5-26"
    />
    <path
      className="black-text"
      d="M347.5 4.5q44.685-1.55 60.5 40 10.596 51.067-37.5 70.5-51.058 10.599-70.5-37.5-9.931-41.72 25.5-65.5 10.617-5.454 22-7.5m5 20q33.491 3.243 38 36.5-4.203 32.203-36.5 36.5-32.25-4.25-36.5-36.5 4.122-31.367 35-36.5"
    />
    <path
      className="black-text"
      d="M-.5 7.5q16.008-.25 32 .5 29.01 5.512 32 35-5.66 37.905-44 35.5v36h-20zm20 20q19.405-3.334 23 15.5-3.607 18.839-23 15.5z"
    />
    <path className="black-text" d="M66.5 7.5h20v107h-20z" />
    <path
      className="black-text"
      d="M91.5 7.5a1521 1521 0 0 1 56.5 57q.75-28.495.5-57h20q.5 53.01-1 106a4486 4486 0 0 1-55.5-57q-.75 28.495-.5 57h-20z"
    />
    <path className="black-text" d="M415.5 7.5h20v107h-20z" />
    <path
      className="black-text"
      d="M497.5 7.5h20q.25 53.502-.5 107a2255 2255 0 0 0-56-57q-.75 28.495-.5 57h-20q-.5-53.01 1-106a4486 4486 0 0 1 55.5 57q.75-28.996.5-58"
    />
    <path className="black-text" d="M583.5 7.5v21h-20v86h-20v-86h-20v-21z" />
  </svg>
);
export default SvgPinpointFull;
