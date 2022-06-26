/*
  ---
  XS (phones) – 600px and below
  SM (small to medium tablets) – 601px to 960px
  MD (large tablets to laptop) – 961px to 1264px
  LG (desktop) – 1265px to 1904px
  XL (4k and ultra-wides) – 1905px and above
  ---
  Reference: https://material-ui.com/customization/breakpoints/
*/
const vw = {
  xs: 600, sm: 960, md: 1264, lg: 1904,
};

/*
  breakpoints is detecting the min-width of the viewport
  ex: 601px is the breakpoint for SM
*/
const breakpoints = [
  '1px', // xs
  `${vw.xs + 1}px`, // sm
  `${vw.sm + 1}px`, // md
  `${vw.md + 1}px`, // lg
  `${vw.lg + 1}px`, // xl
];
[
  breakpoints.xs, breakpoints.sm, breakpoints.md, breakpoints.lg, breakpoints.xl,
] = breakpoints; // aliases
breakpoints.mobile = vw.xs;

const metrics = {
  widthXS: vw.xs,
  widthSM: vw.sm,
  widthMD: vw.md,
  widthLG: vw.lg,
};

const {
  widthXS, widthSM, widthMD, widthLG,
} = metrics;

// Viewport query ranges
const v = {
  xs: {
    max: `(max-width: ${widthXS}px)`,
  },
  sm: {
    min: `(min-width: ${widthXS + 1}px)`,
    max: `(max-width: ${widthSM}px)`,
  },
  md: {
    min: `(min-width: ${widthSM + 1}px)`,
    max: `(max-width: ${widthMD}px)`,
  },
  lg: {
    min: `(min-width: ${widthMD + 1}px)`,
    max: `(max-width: ${widthLG}px)`,
  },
  xl: {
    min: `(min-width: ${widthLG + 1}px)`,
  },
};

// Standard queries
export const XS_QUERY = v.xs.max;
export const SM_QUERY = `${v.sm.min} and ${v.sm.max}`;
export const MD_QUERY = `${v.md.min} and ${v.md.max}`;
export const LG_QUERY = `${v.lg.min} and ${v.lg.max}`;
export const XL_QUERY = v.xl.min;

export const SM_AND_MD_QUERY = `${v.sm.min} and ${v.md.max}`;
export const SM_AND_UP_QUERY = v.sm.min;
export const SM_AND_DOWN_QUERY = v.sm.max;
export const MD_AND_DOWN_QUERY = v.md.max;
export const MD_AND_UP_QUERY = v.md.min;
export const LG_AND_UP_QUERY = v.lg.min;
