import { css } from "@linaria/core";
import { COLORS, RADIUS } from "../theme";

export const styles = {
  header: css`
    text-align: center;
  `,

  title: css`
    font-size: 30px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: ${COLORS.text};
  `,

  subtitle: css`
    margin-top: 6px;
    font-size: 14px;
    color: ${COLORS.textSecondary};
    text-transform: capitalize;
  `,

  score: css`
    & .ant-progress-text {
      font-size: 24px;
      font-weight: 600;
      color: ${COLORS.text};
      font-variant-numeric: tabular-nums;
    }
  `,

  sectionTitle: css`
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    color: ${COLORS.text};
  `,

  missedTag: css`
    padding: 4px 12px;
    border-radius: ${RADIUS.small}px;
    background: ${COLORS.accentTint};
    font-size: 14px;
    font-weight: 600;
    color: ${COLORS.accentText};
  `,
};
