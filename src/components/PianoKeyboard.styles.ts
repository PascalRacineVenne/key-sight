import { css } from "@linaria/core";
import { COLORS, TRANSITION } from "../theme";

// Key sizes are set by the component as CSS variables on the keyboard:
// --key-width, --white-height, --black-width, --black-height.
//
// Feedback uses a light tint plus a colored bar along the bottom edge of
// the key: clear at a glance without flooding the keyboard with color.
export const styles = {
  keyboard: css`
    position: relative;
    width: max-content;
    min-width: max-content;
    height: calc(var(--white-height) + 2px);
    touch-action: manipulation;
  `,

  whiteKey: css`
    position: relative;
    z-index: 1;
    flex: 0 0 var(--key-width);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: var(--key-width);
    height: var(--white-height);
    padding-bottom: 8px;
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.border};
    border-radius: 0 0 8px 8px;
    font-family: inherit;
    font-size: 11px;
    font-weight: 600;
    color: ${COLORS.textSecondary};
    cursor: pointer;
    transition:
      background ${TRANSITION},
      box-shadow ${TRANSITION},
      color ${TRANSITION};

    /* Neighbouring keys share one border line */
    & + & {
      border-left-width: 0;
    }

    &:hover:not(:disabled) {
      background: ${COLORS.primaryTint};
    }

    &:active:not(:disabled) {
      background: ${COLORS.primaryTint};
      box-shadow: inset 0 -4px 0 ${COLORS.primary};
      color: ${COLORS.primary};
    }

    &:focus-visible {
      z-index: 4;
      outline: 2px solid ${COLORS.primary};
      outline-offset: 2px;
    }

    &:disabled {
      cursor: default;
    }
  `,

  blackKey: css`
    position: absolute;
    top: 0;
    z-index: 3;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: var(--black-width);
    height: var(--black-height);
    padding-bottom: 6px;
    background: ${COLORS.keyBlack};
    border: 1px solid ${COLORS.keyBlack};
    border-radius: 0 0 6px 6px;
    font-family: inherit;
    font-size: 9px;
    font-weight: 600;
    color: #c9d0d4;
    cursor: pointer;
    transition:
      background ${TRANSITION},
      box-shadow ${TRANSITION};

    &:hover:not(:disabled) {
      background: ${COLORS.keyBlackHover};
    }

    &:active:not(:disabled) {
      box-shadow: inset 0 -4px 0 ${COLORS.primary};
    }

    &:focus-visible {
      z-index: 5;
      outline: 2px solid ${COLORS.primary};
      outline-offset: 2px;
    }

    &:disabled {
      cursor: default;
    }
  `,

  // The correct key gets one soft pulse: the most noticeable animation in
  // the app, and still restrained
  correct: css`
    && {
      z-index: 2;
      background: ${COLORS.successTint};
      color: ${COLORS.successText};
      box-shadow: inset 0 -4px 0 ${COLORS.success};
      animation: correctPulse 500ms ease-out;
    }

    @keyframes correctPulse {
      from {
        box-shadow:
          inset 0 -4px 0 ${COLORS.success},
          0 0 0 0 rgba(101, 181, 138, 0.45);
      }
      to {
        box-shadow:
          inset 0 -4px 0 ${COLORS.success},
          0 0 0 8px rgba(101, 181, 138, 0);
      }
    }
  `,

  incorrect: css`
    && {
      z-index: 2;
      background: ${COLORS.accentTint};
      color: ${COLORS.accentText};
      box-shadow: inset 0 -4px 0 ${COLORS.accent};
    }
  `,

  // Black keys are filled with the feedback color instead of tinted
  blackCorrect: css`
    &&& {
      z-index: 3;
      background: ${COLORS.success};
      border-color: ${COLORS.success};
      color: #fff;
    }
  `,

  blackIncorrect: css`
    &&& {
      z-index: 3;
      background: ${COLORS.accent};
      border-color: ${COLORS.accent};
      color: #fff;
    }
  `,

  middleC: css`
    position: absolute;
    bottom: 28px;
    left: 50%;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${COLORS.primary};
    transform: translateX(-50%);
    pointer-events: none;
  `,
};
