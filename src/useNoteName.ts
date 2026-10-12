import { useIntl } from "react-intl";

// Maps a note name from the game logic ("C#", "Eb") to its displayed name in
// the current language ("Do#", "Mib"). The logic keeps using the original names.
export const useNoteName = () => {
  const intl = useIntl();
  return (name: string) => intl.formatMessage({ id: `note.${name}` });
};
