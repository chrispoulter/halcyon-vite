import { IconButton, useColorScheme } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export function ModeToggle() {
    const { colorScheme, setColorScheme } = useColorScheme();

    function onToggleMode() {
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
    }

    return (
        <IconButton
            color="inherit"
            aria-label="Toggle theme"
            onClick={onToggleMode}
        >
            {colorScheme == 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
    );
}
