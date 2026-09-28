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

  subtitle: css`
    text-transform: capitalize;
  `,

  section: css`
    text-align: left;
  `,

  missedList: css`
    margin-top: 8px;
  `,

  missedTag: css`
    background: #fff2f0;
    border: 1px solid #ffccc7;
    border-radius: 8px;
    padding: 4px 12px;
    font-size: 14px;
    font-weight: 600;
    color: #cf1322;
  `,

  actions: css`
    width: 100%;
  `,

  restartButton: css`
    height: 52px;
    font-size: 17px;
    border-radius: 12px;
  `,
};
