import {
    FieldValues,
    useController,
    UseControllerProps,
} from 'react-hook-form';
import { TextField } from '@mui/material';

type TextFormFieldProps<TFieldValues extends FieldValues> = {
    label: string;
    type?: string;
    maxLength?: number;
    autoComplete?: string;
    required?: boolean;
    fullWidth?: boolean;
} & UseControllerProps<TFieldValues>;

export function TextFormField<TFieldValues extends FieldValues>(
    props: TextFormFieldProps<TFieldValues>
) {
    const {
        field,
        fieldState: { error },
    } = useController(props);

    return (
        <TextField
            {...field}
            {...props}
            error={!!error}
            helperText={error?.message}
        />
    );
}
