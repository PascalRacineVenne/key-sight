import { css } from "@linaria/core";
import { FEEDBACK_TEXT_COLORS } from "../constants";
import { COLORS, RADIUS, TRANSITION } from "../theme";

// Below this width the controls move under the notation, keeping the
// order notation → controls → keyboard
const NARROW = "(max-width: 767px)";

export const styles = {
  screen: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    height: 100dvh;
    min-height: 0;
    padding: 16px clamp(16px, 3vw, 32px);
    background: ${COLORS.background};

    @media ${NARROW} {
      gap: 12px;
      padding: 12px 16px;
    }
  `,

  topBar: css`
    display: flex;
    align-items: center;
    gap: 14px;
    width: min(100%, 960px);
    min-height: 32px;
    flex-shrink: 0;
  `,

  count: css`
    font-size: 13px;
    font-weight: 600;
    color: ${COLORS.textSecondary};
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  `,

  progress: css`
    && {
      flex: 1;
      min-width: 40px;
      margin: 0;
      line-height: 0;
    }
  `,

  // Small context capsule: "Advanced · Treble Clef"
  badge: css`
    padding: 4px 10px;
    border-radius: 999px;
    background: ${COLORS.badge};
    font-size: 12px;
    font-weight: 600;
    color: ${COLORS.textSecondary};
    text-transform: capitalize;
    white-space: nowrap;
  `,

  // Compact settings strip that belongs to the current exercise
  controls: css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px 16px;
    flex-shrink: 0;
    padding: 6px 16px;
    border-radius: ${RADIUS.button}px;
    background: rgba(255, 255, 255, 0.65);

    @media ${NARROW} {
      order: 3;
      width: 100%;
    }
  `,

  controlLabel: css`
    font-size: 13px;
    font-weight: 500;
    color: ${COLORS.textSecondary};
    white-space: nowrap;
  `,

  controlDivider: css`
    width: 1px;
    height: 18px;
    background: ${COLORS.border};

    @media ${NARROW} {
      display: none;
    }
  `,

  delayControl: css`
    width: 300px;
    max-width: 100%;
  `,

  delaySlider: css`
    && {
      flex: 1;
      min-width: 80px;
      margin: 0 4px;
    }
  `,

  // Fixed width so the slider doesn't resize as the value changes
  delayValue: css`
    width: 40px;
    text-align: right;
    font-variant-numeric: tabular-nums;
  `,

  notation: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    flex: 1;
    min-height: 0;
  `,

  // One line, reserved even when empty
  feedback: css`
    height: 24px;
    line-height: 24px;
    text-align: center;
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
  `,

  correct: css`
    color: ${FEEDBACK_TEXT_COLORS.correct};
    animation: feedbackIn 200ms ease-out;

    @keyframes feedbackIn {
      from {
        opacity: 0;
        transform: translateY(4px);
      }
    }
  `,

  incorrect: css`
    color: ${FEEDBACK_TEXT_COLORS.incorrect};
    animation: feedbackIn 200ms ease-out;

    @keyframes feedbackIn {
      from {
        opacity: 0;
        transform: translateY(4px);
      }
    }
  `,

  keyboardPanel: css`
    max-width: 100%;
    flex-shrink: 0;
    padding: 12px 12px 10px;
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.border};
    border-radius: ${RADIUS.card - 2}px;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    transition: border-color ${TRANSITION};

    @media ${NARROW} {
      order: 4;
      width: 100%;
    }
  `,
};
