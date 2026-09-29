// KeySight design tokens. Plain values only: Linaria styles read this file
// at build time, and antdTheme.ts maps it onto antd's theme.
//
// Balance to aim for: mostly soft neutral surfaces, some blue for
// interaction, dark text for content, and very little warm accent.

export const COLORS = {
  background: "#EEF4F7",
  surface: "#FFFFFF",
  // Quiet neutral fill for grouped controls and badges
  surfaceMuted: "#F5F8FA",
  badge: "#E3ECF1",

  primary: "#428FD1",
  primaryHover: "#347FC1",
  primaryActive: "#2E73B0",
  // Very light blue for selected options and hovered keys
  primaryTint: "#EEF5FC",
  // Progress bar and slider track
  primaryTrack: "#DCE9F4",

  text: "#343A40",
  textSecondary: "#7B858C",
  border: "#D9E1E5",
  borderStrong: "#C5D0D6",

  // Personality color, used sparingly: wrong answers and notes to review
  accent: "#E5A05F",
  accentTint: "#FBEEE1",
  // Darker shade for accent-colored text, readable on white
  accentText: "#A5652A",

  success: "#65B58A",
  successTint: "#E6F4EC",
  successText: "#3A8560",

  // Black piano keys
  keyBlack: "#2F3438",
  keyBlackHover: "#454C52",
};

export const RADIUS = {
  card: 18,
  button: 12,
  control: 10,
  small: 8,
};

export const SHADOW = {
  card: "0 2px 10px rgba(40, 60, 70, 0.06)",
  subtle: "0 1px 4px rgba(40, 60, 70, 0.05)",
};

// Hover, selection, buttons and controls
export const TRANSITION = "180ms ease";

export const FONT_FAMILY =
  '"Inter Variable", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
