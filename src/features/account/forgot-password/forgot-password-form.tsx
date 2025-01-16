import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSnackbar } from 'notistack';
import { Box, Button, TextField } from '@mui/material';
import { useForgotPassword } from '@/features/account/hooks/use-forgot-password';

const schema = z.object({
    emailAddress: z
        .string({ message: 'Email Address must be a valid string' })
        .email('Email Address must be a valid email'),
});

type ForgotPasswordFormValues = z.infer<typeof schema>;

export function ForgotPasswordForm() {
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            emailAddress: '',
        },
    });

    const { mutate, isPending } = useForgotPassword();

    const onSubmit = (values: ForgotPasswordFormValues) =>
        mutate(values, {
            onSuccess: async () => {
                enqueueSnackbar(
                    'Instructions as to how to reset your password have been sent to you via email.',
                    { variant: 'success' }
                );

                return navigate('/account/login');
            },
        });

    return (
        <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <TextField
                {...register('emailAddress')}
                label="Email Address"
                type="email"
                autoComplete="username"
                required
                disabled={isPending}
                error={!!errors.emailAddress}
                helperText={errors.emailAddress?.message}
                fullWidth
            />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'flex-end',
                    gap: 2,
                }}
            >
                <Button type="submit" variant="contained" disabled={isPending}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
}
