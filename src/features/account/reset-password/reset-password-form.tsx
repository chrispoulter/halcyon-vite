import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSnackbar } from 'notistack';
import { Box, TextField, Button } from '@mui/material';
import { useResetPassword } from '@/features/account/hooks/user-reset-password';

const schema = z
    .object({
        emailAddress: z
            .string({ message: 'Email Address must be a valid string' })
            .email('Email Address must be a valid email'),
        newPassword: z
            .string({ message: 'New Password must be a valid string' })
            .min(8, 'New Password must be at least 8 characters')
            .max(50, 'New Password must be no more than 50 characters'),
        confirmNewPassword: z
            .string({ message: 'Confirm New Password must be a valid string' })
            .min(1, 'Confirm New Password is a required field'),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: 'Passwords do not match',
        path: ['confirmNewPassword'],
    });

type ResetPasswordFormValues = z.infer<typeof schema>;

type ResetPasswordFormProps = {
    token: string;
};

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            emailAddress: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    const { mutate, isPending } = useResetPassword();

    const onSubmit = (values: ResetPasswordFormValues) =>
        mutate(
            {
                token,
                ...values,
            },
            {
                onSuccess: async () => {
                    enqueueSnackbar('Your password has been reset.', {
                        variant: 'success',
                    });

                    return navigate('/account/login');
                },
            }
        );

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
                    gap: 2,
                }}
            >
                <TextField
                    {...register('newPassword')}
                    label="New Password"
                    type="password"
                    autoComplete="new-password"
                    required
                    disabled={isPending}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                    fullWidth
                />

                <TextField
                    {...register('confirmNewPassword')}
                    label="Confirm New Password"
                    type="password"
                    autoComplete="new-password"
                    required
                    disabled={isPending}
                    error={!!errors.confirmNewPassword}
                    helperText={errors.confirmNewPassword?.message}
                    fullWidth
                />
            </Box>

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
