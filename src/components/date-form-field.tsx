import {
    FieldValues,
    useController,
    UseControllerProps,
} from 'react-hook-form';
import { TextField } from '@mui/material';

type DateFormFieldProps<TFieldValues extends FieldValues> = {
    label: string;
    required?: boolean;
    autoComplete?: [string, string, string];
} & UseControllerProps<TFieldValues>;

export function DateFormField<TFieldValues extends FieldValues>(
    props: DateFormFieldProps<TFieldValues>
) {
    const { field, fieldState } = useController(props);

    const { autoComplete, ...rest } = props;

    return (
        <TextField
            {...field}
            {...rest}
            autoComplete={autoComplete?.join(' ')}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
        />
    );
}
