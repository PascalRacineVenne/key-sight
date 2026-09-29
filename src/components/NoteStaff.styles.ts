import { css } from "@linaria/core";
import { STAFF_SIZE } from "../constants";
import { COLORS, RADIUS, SHADOW } from "../theme";

const PADDING_X = 14;
// Screen side padding on phones (GameScreen) + this card's padding and border
const HORIZONTAL_CHROME = 2 * 16 + 2 * PADDING_X + 2;
const RATIO = STAFF_SIZE.width / STAFF_SIZE.height;

export const styles = {
  // A sheet of music on the page; the box wraps the staff drawing exactly
  staff: css`
    width: fit-content;
    margin: 0 auto;
    padding: 6px ${PADDING_X}px;
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.border};
    border-radius: ${RADIUS.card - 2}px;
    box-shadow: ${SHADOW.subtle};

    /* Sized from the screen height, never wider than the screen */
    & svg {
      display: block;
      width: min(100vw - ${HORIZONTAL_CHROME}px, 44dvh * ${RATIO});
      height: auto;
    }

    @media (max-height: 700px) {
      & svg {
        width: min(100vw - ${HORIZONTAL_CHROME}px, 38dvh * ${RATIO});
      }
    }
  `,
};
