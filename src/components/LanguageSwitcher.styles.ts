import { css } from "@linaria/core";

export const styles = {
  // For screens with no top bar of their own; the game screen places the
  // switcher inside its top bar instead
  floating: css`
    position: fixed;
    top: 12px;
    right: 12px;
    z-index: 10;
  `,
};
