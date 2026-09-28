import { css } from "@linaria/core";
import { FEEDBACK_COLORS } from "../constants";

// Key sizes depend on the viewport, so the component sets them as
// CSS variables on the keyboard: --key-width, --white-height,
// --black-width, --black-height.
export const styles = {
  keyboard: css`
    position: relative;
    width: max-content;
    min-width: max-content;
    height: calc(var(--white-height) + 2px);
    touch-action: manipulation;
  `,

  whiteKey: css`
    width: var(--key-width);
    height: var(--white-height);
    background: #fff;
    border: 1px solid #bbb;
    border-radius: 0 0 6px 6px;
    cursor: pointer;
    position: relative;
    flex: 0 0 var(--key-width);
    z-index: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 4px;
    font-size: 11px;
    font-weight: 600;
    color: #555;
    transition:
      background 0.15s,
      border-color 0.15s,
      transform 0.1s;

    &:hover:not(:disabled) {
      background: #eaf4ff;
      border-color: #69aef0;
    }

    &:active:not(:disabled) {
      transform: translateY(1px);
    }

    &:focus-visible {
      z-index: 3;
      outline: 3px solid #1677ff;
      outline-offset: 2px;
    }

    &:disabled {
      cursor: default;
    }
  `,

  blackKey: css`
    position: absolute;
    top: 0;
    width: var(--black-width);
    height: var(--black-height);
    background: #222;
    border: 1px solid #000;
    border-radius: 0 0 4px 4px;
    cursor: pointer;
    z-index: 2;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 2px;
    font-size: 9px;
    font-weight: 600;
    color: #ccc;
    transition:
      background 0.15s,
      transform 0.1s;

    &:hover:not(:disabled) {
      background: #46515a;
    }

    &:active:not(:disabled) {
      transform: translateY(1px);
    }

    &:focus-visible {
      z-index: 4;
      outline: 3px solid #1677ff;
      outline-offset: 2px;
    }

    &:disabled {
      cursor: default;
    }
  `,

  correct: css`
    && {
      background: ${FEEDBACK_COLORS.correct};
    }
  `,

  incorrect: css`
    && {
      background: ${FEEDBACK_COLORS.incorrect};
    }
  `,

  // Light label text on a colored black key
  blackKeyHighlighted: css`
    && {
      color: #fff;
    }
  `,

  middleC: css`
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #1163c7;
    pointer-events: none;
  `,
};
