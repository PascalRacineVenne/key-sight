import { theme, type ThemeConfig } from "antd";
import { COLORS, FONT_FAMILY, RADIUS } from "./theme";

// Maps KeySight's tokens onto antd so its components (Slider, Switch,
// Progress, Button…) match the rest of the UI without per-use overrides.
export const antdTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: COLORS.primary,
    colorPrimaryHover: COLORS.primaryHover,
    colorPrimaryActive: COLORS.primaryActive,
    colorInfo: COLORS.primary,
    colorSuccess: COLORS.success,
    colorWarning: COLORS.accent,
    colorText: COLORS.text,
    colorTextSecondary: COLORS.textSecondary,
    colorBorder: COLORS.border,
    colorBorderSecondary: COLORS.border,
    colorBgLayout: COLORS.background,
    fontFamily: FONT_FAMILY,
    borderRadius: RADIUS.control,
    borderRadiusLG: RADIUS.button,
    borderRadiusSM: RADIUS.small,
    motionDurationFast: "0.15s",
    motionDurationMid: "0.18s",
  },
  components: {
    Button: {
      primaryShadow: "none",
      fontWeight: 600,
    },
    Progress: {
      defaultColor: COLORS.primary,
      remainingColor: COLORS.primaryTrack,
    },
    Slider: {
      railBg: COLORS.primaryTrack,
      railHoverBg: COLORS.primaryTrack,
      trackBg: COLORS.primary,
      trackHoverBg: COLORS.primaryHover,
      handleColor: COLORS.primary,
      handleActiveColor: COLORS.primaryHover,
    },
  },
};
