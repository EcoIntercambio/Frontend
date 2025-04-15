import Svg, { Path } from "react-native-svg";

/**
 * This is a burguer icon
 * @param width - width of the icon
 * @param height - height of the icon
 * @param color - color of the icon
 * @param props - props of the icon
 */
export function SVGBurguer({
  width = 24,
  height = 24,
  color = "#000",
  ...props
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M4 18h6M4 12h12M4 6h16"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * This is a search icon
 * @param width - width of the icon
 * @param height - height of the icon
 * @param color - color of the icon
 * @param props - props of the icon
 * @returns JSX.Element
 */
export function SVGSearch({
  width = 24,
  height = 24,
  color = "#000",
  ...props
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M16.672 16.641L21 21m-2-10a8 8 0 11-16 0 8 8 0 0116 0z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * This is a filter icon
 * @param width - width of the icon
 * @param height - height of the icon
 * @param color - color of the icon
 * @param props - props of the icon
 */
export function SVGFilter({
  width = 24,
  height = 24,
  color = "#000",
  ...props
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 10.5A3.502 3.502 0 0018.355 8H21a1 1 0 100-2h-2.645a3.502 3.502 0 00-6.71 0H3a1 1 0 000 2h8.645A3.502 3.502 0 0015 10.5zM3 16a1 1 0 100 2h2.145a3.502 3.502 0 006.71 0H21a1 1 0 100-2h-9.145a3.502 3.502 0 00-6.71 0H3z"
        fill={color}
      />
    </Svg>
  );
}

export function SVGPlant({
  width = 24,
  height = 24,
  color = "#000",
  ...props
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M12 2L14 6L12 10L10 6L12 2Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 10V22"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SVGEco({ width = 24, height = 24, color = "#000", ...props }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke={color}
        strokeWidth={2}
      />
      <Path
        d="M12 7L12 17"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M17 12L7 12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SVGDecoration({
  width = 24,
  height = 24,
  color = "#000",
  ...props
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M4 21V14M4 14V3L20 14L12 17L4 14Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SVGRecycle({
  width = 24,
  height = 24,
  color = "#000",
  ...props
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M7 19L11 15M17 19L13 15M12 21V15"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 7L17 7L12 12L7 7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SVGLocation({
  width = 24,
  height = 24,
  color = "#000",
  ...props
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * This is a star icon
 * @param width - width of the icon
 * @param height - height of the icon
 * @param color - color of the icon
 * @param props - props of the icon
 */
export function SVGStar({ width = 24, height = 24, color = "#000", ...props }) {
  return (
    <Svg width={width} height={height} viewBox="0 -0.5 21 21" {...props}>
      <Path
        d="M60.556 172.206a1.877 1.877 0 00-.547 1.669l.678 3.916c.21 1.219-.766 2.209-1.874 2.209-.292 0-.593-.069-.885-.221l-3.544-1.849a1.918 1.918 0 00-1.769 0l-3.544 1.849a1.907 1.907 0 01-.885.221c-1.107 0-2.084-.99-1.873-2.209l.677-3.916a1.877 1.877 0 00-.547-1.669l-2.867-2.773c-1.128-1.091-.505-2.992 1.053-3.217l3.963-.571a1.897 1.897 0 001.43-1.032l1.773-3.562A1.88 1.88 0 0153.5 160c.679 0 1.357.35 1.706 1.051l1.772 3.562c.276.557.812.943 1.431 1.032l3.963.571c1.558.225 2.18 2.126 1.053 3.217l-2.868 2.773z"
        transform="translate(-99 -320) translate(56 160)"
        fill={color}
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      />
    </Svg>
  );
}

/**
 * This is a star icon
 * @param width - width of the icon
 * @param height - height of the icon
 * @param color - color of the icon
 * @param props - props of the icon
 */
export function SVGStarMiddle({
  width = 24,
  height = 24,
  color = "#000",
  ...props
}) {
  return (
    <Svg width={width} height={height} viewBox="-4.5 0 20 20" {...props}>
      <Path
        d="M374 120v17.714s-.429.072-.73.216l-3.631 1.849a2.228 2.228 0 01-.965.221c-1.208 0-2.274-.99-2.045-2.209l.737-3.915c.115-.612-.111-1.236-.6-1.67l-3.134-2.773c-1.23-1.091-.566-2.992 1.134-3.216l4.292-.572a1.965 1.965 0 001.502-1.031l1.816-3.563c.38-.701.525-1.051 1.624-1.051"
        transform="translate(-419 -280) translate(56 160)"
        fill={color}
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      />
    </Svg>
  );
}

/**
 * This is a picture icon
 * @param width - width of the icon
 * @param height - height of the icon
 * @param color - color of the icon
 * @param props - props of the icon
 */
export function SVGPicture({
  width = 24,
  height = 24,
  color = "#000",
  ...props
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M4 10V6a2 2 0 012-2h6M4.027 18.329A2 2 0 006 20h12a2 2 0 002-2v-3.81M4.027 18.33A2.014 2.014 0 014 18v-3m.027 3.329l3.82-3.82a2 2 0 012.427-.16l.51.34a2 2 0 002.358-.103l2.648-2.118a2 2 0 012.333-.12c.08.052.15.115.217.182L20 14.19m0 0V6a2 2 0 00-2-2h-1m-6 5a2 2 0 11-4 0 2 2 0 014 0z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
