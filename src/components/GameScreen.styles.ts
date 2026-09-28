import { css } from "@linaria/core";
import { FEEDBACK_COLORS } from "../constants";

export const styles = {
  screen: css`
    height: 100dvh;
    min-height: 0;
    padding: 16px clamp(12px, 3vw, 32px) 12px;
    background: linear-gradient(135deg, #e6f4ff 0%, #f0f5ff 100%);
  `,

  header: css`
    margin: 0 auto;
    width: min(100%, 1040px);
    min-height: 34px;
    flex-shrink: 0;
  `,

  meta: css`
    white-space: nowrap;
    color: #59636b;
    font-size: 14px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  `,

  capitalize: css`
    text-transform: capitalize;
  `,

  progress: css`
    flex: 1;
    margin: 0;
    min-width: 40px;
  `,

  playArea: css`
    min-height: 0;
    width: 100%;
  `,

  // One line, reserved even when empty
  feedback: css`
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    height: 24px;
    white-space: nowrap;
  `,

  correct: css`
    color: ${FEEDBACK_COLORS.correct};
  `,

  incorrect: css`
    color: ${FEEDBACK_COLORS.incorrect};
  `,

  practiceControls: css`
    width: min(100%, 620px);
    margin: 0 auto;
    flex-shrink: 0;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px 20px;
  `,

  delayControl: css`
    width: min(100%, 400px);
    margin: 0;
    flex-shrink: 0;
  `,

  delaySlider: css`
    flex: 1;
    min-width: 80px;
  `,

  audioControl: css`
    flex-shrink: 0;
  `,

  // Fixed width so the slider doesn't resize as the value changes
  delayValue: css`
    width: 44px;
    text-align: right;
    font-variant-numeric: tabular-nums;
  `,

  keyboardPanel: css`
    width: min(100%, 1180px);
    min-width: 0;
    margin: 0 auto;
    background: #fff;
    border: 1px solid #dce2e5;
    border-radius: 10px;
    padding: 12px 12px 8px;
    box-shadow: 0 5px 18px rgba(39, 57, 67, 0.08);
    overflow-x: auto;
    overscroll-behavior-x: contain;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    flex-shrink: 0;
  `,
};
