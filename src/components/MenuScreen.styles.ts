import { css } from "@linaria/core";

export const styles = {
  screen: css`
    height: 100dvh;
    padding: 24px;
    background: linear-gradient(135deg, #e6f4ff 0%, #f0f5ff 100%);
  `,

  card: css`
    width: 100%;
    max-width: 400px;
    border-radius: 16px;
  `,

  content: css`
    width: 100%;
    text-align: center;
  `,

  title: css`
    && {
      margin: 0;
    }
  `,

  section: css`
    text-align: left;
  `,

  clefGroup: css`
    display: flex;
    gap: 12px;
    margin-top: 8px;
  `,

  clefOption: css`
    flex: 1;
    text-align: center;
  `,

  levelGroup: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
  `,

  levelOption: css`
    text-align: center;
  `,

  startButton: css`
    height: 52px;
    font-size: 18px;
    border-radius: 12px;
  `,
};
