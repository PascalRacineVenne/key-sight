import { css } from "@linaria/core";

export const styles = {
  screen: css`
    height: 100dvh;
    padding: 12px 16px;
    background: #f5f5f5;
  `,

  header: css`
    margin: 0 auto;
    width: 50%;
  `,

  meta: css`
    white-space: nowrap;
    font-size: 13px;
  `,

  capitalize: css`
    text-transform: capitalize;
  `,

  progress: css`
    flex: 1;
    margin: 0;
  `,

  feedback: css`
    text-align: center;
    font-size: 16px;
    font-weight: 600;
  `,

  correct: css`
    color: #52c41a;
  `,

  incorrect: css`
    color: #ff4d4f;
  `,

  keyboardPanel: css`
    background: #fff;
    border-radius: 16px;
    padding: 16px 8px 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    overflow-x: auto;
  `,

  nextButton: css`
    height: 52px;
    font-size: 17px;
    border-radius: 12px;
  `,
};
