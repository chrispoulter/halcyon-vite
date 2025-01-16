import {
    FieldValues,
    useController,
    UseControllerProps,
} from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

type SwitchFormFieldProps<TFieldValues extends FieldValues> = {
    options: Record<string, { title: string; description: string }>;
} & UseControllerProps<TFieldValues> &
    TextFieldProps;

export function SwitchFormField<TFieldValues extends FieldValues>(
    props: SwitchFormFieldProps<TFieldValues>
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
