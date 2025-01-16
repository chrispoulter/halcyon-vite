import {
    FieldValues,
    useController,
    UseControllerProps,
} from 'react-hook-form';
import { Box, MenuItem, TextField, TextFieldProps } from '@mui/material';
import { currentYear, monthNames } from '@/lib/dates';

type DateFormFieldProps<TFieldValues extends FieldValues> = {
    autoComplete?: [string, string, string];
} & UseControllerProps<TFieldValues> &
    Omit<TextFieldProps, 'autoComplete'>;

export function DateFormField<TFieldValues extends FieldValues>(
    props: DateFormFieldProps<TFieldValues>
) {
    const { field, fieldState } = useController(props);

    const { autoComplete } = props;

    const day = field.value?.split('-')[2] ?? '';
    const month = field.value?.split('-')[1] ?? '';
    const year = field.value?.split('-')[0] ?? '';

    function onDayChange(event: React.ChangeEvent<HTMLInputElement>) {
        field.onChange(`${year}-${month}-${event.target.value}`);
    }

    function onMonthChange(event: React.ChangeEvent<HTMLInputElement>) {
        field.onChange(`${year}-${event.target.value}-${day}`);
    }

    function onYearChange(event: React.ChangeEvent<HTMLInputElement>) {
        field.onChange(`${event.target.value}-${month}-${day}`);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
            }}
        >
            <TextField
                {...field}
                {...props}
                select
                label="Day..."
                value={day}
                autoComplete={autoComplete && autoComplete[0]}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                onChange={onDayChange}
            >
                {Array.from({ length: 31 }).map((_, index) => (
                    <MenuItem
                        key={index}
                        value={(index + 1).toString().padStart(2, '0')}
                    >
                        {(index + 1).toString().padStart(2, '0')}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                {...field}
                {...props}
                select
                label="Month..."
                value={month}
                autoComplete={autoComplete && autoComplete[1]}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                onChange={onMonthChange}
            >
                {Array.from({ length: 12 }).map((_, index) => (
                    <MenuItem
                        key={index}
                        value={(index + 1).toString().padStart(2, '0')}
                    >
                        {monthNames[index]}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                {...field}
                {...props}
                select
                label="Year..."
                value={year}
                autoComplete={autoComplete && autoComplete[2]}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                onChange={onYearChange}
            >
                {Array.from({ length: 120 }).map((_, index) => (
                    <MenuItem
                        key={index}
                        value={(currentYear - index).toString()}
                    >
                        {currentYear - index}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
}
