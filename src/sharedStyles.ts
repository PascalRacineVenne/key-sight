import { css } from "@linaria/core";
import { COLORS, RADIUS, SHADOW, TRANSITION } from "./theme";

// Layout pieces shared by the menu and results screens
export const sharedStyles = {
  // Full-height page with the card centered
  centeredScreen: css`
    min-height: 100dvh;
    padding: 24px 16px;
    background: ${COLORS.background};
  `,

  card: css`
    display: flex;
    flex-direction: column;
    gap: 28px;
    width: min(100%, 460px);
    padding: 40px 36px 36px;
    background: ${COLORS.surface};
    border-radius: ${RADIUS.card}px;
    box-shadow: ${SHADOW.card};

    @media (max-width: 480px) {
      gap: 24px;
      padding: 32px 20px 24px;
    }
  `,

  // The strongest action on a screen (antd primary Button)
  primaryButton: css`
    && {
      height: 54px;
      border-radius: ${RADIUS.button}px;
      font-size: 16px;
      transition:
        background ${TRANSITION},
        transform ${TRANSITION};
    }

    &&:active {
      transform: scale(0.985);
    }
  `,
};
