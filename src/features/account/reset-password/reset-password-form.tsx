import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { enqueueSnackbar } from 'notistack';
import { Box, Button } from '@mui/material';
import { TextFormField } from '@/components/text-form-field';
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

    const { handleSubmit, control } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            emailAddress: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    const { mutate, isPending } = useResetPassword();

    function onSubmit(data: ResetPasswordFormValues) {
        mutate(
            {
                token,
                ...data,
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
    }

    return (
        <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <TextFormField
                control={control}
                name="emailAddress"
                label="Email Address"
                type="email"
                maxLength={254}
                autoComplete="username"
                required
                disabled={isPending}
            />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                }}
            >
                <TextFormField
                    control={control}
                    name="newPassword"
                    label="New Password"
                    type="password"
                    maxLength={50}
                    autoComplete="new-password"
                    required
                    disabled={isPending}
                    fullWidth
                />
                <TextFormField
                    control={control}
                    name="confirmNewPassword"
                    label="Confirm New Password"
                    type="password"
                    maxLength={50}
                    autoComplete="new-password"
                    required
                    disabled={isPending}
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
                <Button type="submit" variant="contained" loading={isPending}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
}
