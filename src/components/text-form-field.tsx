import {
    FieldValues,
    useController,
    UseControllerProps,
} from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

type TextFormFieldProps<TFieldValues extends FieldValues> = {
    maxLength?: number;
} & UseControllerProps<TFieldValues> &
    TextFieldProps;

export function TextFormField<TFieldValues extends FieldValues>(
    props: TextFormFieldProps<TFieldValues>
) {
    const { field, fieldState } = useController(props);

    return (
        <TextField
            {...field}
            {...props}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
        />
    );
}
