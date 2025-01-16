import {
    FieldValues,
    useController,
    UseControllerProps,
} from 'react-hook-form';
import {
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    Switch,
    SwitchProps,
} from '@mui/material';

type SwitchFormFieldProps<TFieldValues extends FieldValues> = {
    label: string;
    options: Record<string, { title: string; description: string }>;
} & UseControllerProps<TFieldValues> &
    SwitchProps;

export function SwitchFormField<TFieldValues extends FieldValues>(
    props: SwitchFormFieldProps<TFieldValues>
) {
    const { field, fieldState } = useController(props);

    const currentValue = field.value || [];

    return (
        <FormControl
            component="fieldset"
            variant="standard"
            error={!!fieldState.error}
        >
            <FormLabel component="legend">{props.label}</FormLabel>
            <FormGroup>
                {Object.entries(props.options).map(([key, { title }]) => {
                    const checked = field.value?.includes(key);

                    function onCheckChanged(
                        event: React.ChangeEvent<HTMLInputElement>
                    ) {
                        if (event.target.checked) {
                            return field.onChange([...currentValue, key]);
                        }

                        return field.onChange(
                            currentValue.filter(
                                (currentRole: string) => currentRole !== key
                            )
                        );
                    }
                    return (
                        <FormControlLabel
                            key={key}
                            control={
                                <Switch
                                    {...props}
                                    checked={checked}
                                    onChange={onCheckChanged}
                                    name={key}
                                />
                            }
                            label={title}
                        />
                    );
                })}
            </FormGroup>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    );
}
