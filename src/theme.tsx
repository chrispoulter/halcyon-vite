import { adaptV4Theme, createTheme } from '@mui/material/styles';

export const theme = createTheme(
    adaptV4Theme({
        palette: {
            mode: 'dark',
        },
        // overrides: {
        //     MuiInputLabel: {
        //         root: {
        //             color: 'white',
        //             backgroundColor: 'pink',
        //         },
        //     },
        //     MuiInputBase: {
        //         root: {
        //             color: 'yellow',
        //             backgroundColor: 'green',
        //         },
        //     },
        //     MuiTextField: {
        //         root: {
        //             color: 'red',
        //             backgroundColor: 'blue',
        //         },
        //     },
        // },
    })
);
