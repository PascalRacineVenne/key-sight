import { css } from "@linaria/core";
import { COLORS, RADIUS } from "../theme";

export const styles = {
  header: css`
    text-align: center;
  `,

  // The wordmark carries the brand for now: "Sight" in the primary blue
  wordmark: css`
    font-size: 36px;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.1;
    color: ${COLORS.text};
  `,

  wordmarkSight: css`
    color: ${COLORS.primary};
  `,

  subtitle: css`
    margin-top: 6px;
    font-size: 15px;
    color: ${COLORS.textSecondary};
  `,

  clefOptions: css`
    grid-template-columns: 1fr 1fr;
  `,

  clefOption: css`
    height: 104px;
  `,

  // Clef symbols from VexFlow's Bravura music font. Unselected they're
  // charcoal; selected they inherit the blue from the option.
  clef: css`
    display: block;
    font-family: Bravura;
    font-size: 44px;
    line-height: 1;
  `,

  // The glyphs sit at different heights around the baseline, so each is
  // nudged to look vertically centered
  trebleClef: css`
    transform: translateY(0.19em);
  `,

  bassClef: css`
    transform: translateY(-0.19em);
  `,

  levelOptions: css`
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  `,

  levelOption: css`
    gap: 2px;
    min-height: 64px;
    padding: 10px 8px;
    border-radius: ${RADIUS.control}px;
    text-align: center;

    /* On phones the options stack: name left, description right */
    @media (max-width: 480px) {
      flex-direction: row;
      justify-content: space-between;
      min-height: 52px;
      padding: 0 16px;
    }
  `,

  levelName: css`
    font-size: 14px;
    font-weight: 600;
  `,

  levelDescription: css`
    font-size: 12px;
    color: ${COLORS.textSecondary};

    label:has(:checked) & {
      color: ${COLORS.primary};
    }
  `,
};
