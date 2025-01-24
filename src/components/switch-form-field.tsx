import {
    type FieldValues,
    type UseControllerProps,
    useController,
} from 'react-hook-form';
import {
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    Switch,
} from '@mui/material';

type SwitchFormFieldProps<TFieldValues extends FieldValues> = {
    label: string;
    options: Record<string, { title: string; description: string }>;
} & UseControllerProps<TFieldValues>;

export function SwitchFormField<TFieldValues extends FieldValues>({
    control,
    name,
    label,
    options,
    disabled,
}: SwitchFormFieldProps<TFieldValues>) {
    const {
        field: { value = [] as string[], onChange },
        fieldState: { error },
    } = useController({ control, name });

    return (
        <FormControl component="fieldset" variant="standard" error={!!error}>
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>
                {Object.entries(options).map(([key, { title }]) => {
                    const checked = value.includes(key);

                    function onCheckChanged(
                        event: React.ChangeEvent<HTMLInputElement>
                    ) {
                        if (event.target.checked) {
                            return onChange([...value, key]);
                        }

                        return onChange(value.filter((item) => item !== key));
                    }
                    return (
                        <FormControlLabel
                            key={key}
                            disabled={disabled}
                            control={
                                <Switch
                                    checked={checked}
                                    onChange={onCheckChanged}
                                />
                            }
                            label={title}
                        />
                    );
                })}
            </FormGroup>
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
}
