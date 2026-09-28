import { css } from "@linaria/core";
import { STAFF_SIZE } from "../constants";

export const styles = {
  // The box wraps the staff drawing exactly
  staff: css`
    width: fit-content;
    margin: 0 auto;
    background: #fff;
    border: 1px solid #dce2e5;
    border-radius: 10px;
    padding: 10px 12px;
    box-shadow: 0 5px 18px rgba(39, 57, 67, 0.06);

    /* Sized from the screen height (44%), but never wider than the
       screen minus the game screen's 16px side padding */
    & svg {
      display: block;
      width: min(
        100vw - 40px,
        44dvh * ${STAFF_SIZE.width} / ${STAFF_SIZE.height}
      );
      height: auto;
    }

    @media (max-height: 700px) {
      & svg {
        width: min(
          100vw - 40px,
          40dvh * ${STAFF_SIZE.width} / ${STAFF_SIZE.height}
        );
      }
    }
  `,
};
