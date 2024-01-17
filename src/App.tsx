import {
  MantineProvider,
  localStorageColorSchemeManager,
  createTheme,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

import HomePage from "./pages/Home";

import '@mantine/core/styles.css';

const colorScheme = localStorageColorSchemeManager({
  key: "mantine-color-scheme",
});
const theme = createTheme({
  defaultRadius: "md",
});

function App() {
  return (
    <MantineProvider
      colorSchemeManager={colorScheme}
      theme={theme}
      defaultColorScheme="light"
    >
      <HomePage />
    </MantineProvider>
  );
}

export default App;
