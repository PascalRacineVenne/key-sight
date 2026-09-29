import { css } from "@linaria/core";
import { COLORS, RADIUS, TRANSITION } from "../theme";

export const styles = {
  fieldset: css`
    border: 0;
    min-width: 0;
  `,

  legend: css`
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    color: ${COLORS.text};
  `,

  options: css`
    display: grid;
    gap: 10px;
  `,

  option: css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.border};
    border-radius: ${RADIUS.button}px;
    color: ${COLORS.text};
    cursor: pointer;
    user-select: none;
    transition:
      border-color ${TRANSITION},
      background ${TRANSITION},
      color ${TRANSITION};

    &:hover {
      border-color: ${COLORS.borderStrong};
      background: ${COLORS.surfaceMuted};
    }

    &:has(:focus-visible) {
      outline: 2px solid ${COLORS.primary};
      outline-offset: 2px;
    }
  `,

  selected: css`
    && {
      border-color: ${COLORS.primary};
      background: ${COLORS.primaryTint};
      color: ${COLORS.primary};
    }
  `,

  // Visually hidden but still focusable and announced
  input: css`
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  `,
};
