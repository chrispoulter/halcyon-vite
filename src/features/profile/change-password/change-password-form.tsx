import { useNavigate, Link as RouterLink } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSnackbar } from 'notistack';
import { Box, Button } from '@mui/material';
import { TextFormField } from '@/components/text-form-field';
import { useChangePassword } from '@/features/profile/hooks/use-change-password';
import { GetProfileResponse } from '@/features/profile/profile-types';

const schema = z
    .object({
        currentPassword: z
            .string({ message: 'Current Password must be a valid string' })
            .min(1, 'Current Password is a required field'),
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

type ChangePasswordFormValues = z.infer<typeof schema>;

type ChangePasswordFormProps = {
    profile: GetProfileResponse;
};
export function ChangePasswordForm({ profile }: ChangePasswordFormProps) {
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const { handleSubmit, control } = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    const { mutate, isPending } = useChangePassword();

    function onSubmit(data: ChangePasswordFormValues) {
        mutate(
            {
                ...data,
                version: profile.version,
            },
            {
                onSuccess: async () => {
                    enqueueSnackbar('Your password has been changed.', {
                        variant: 'success',
                    });

                    return navigate('/profile');
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
                name="currentPassword"
                label="Current Password"
                type="password"
                maxLength={50}
                autoComplete="current-password"
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
                <Button component={RouterLink} variant="text" to="/profile">
                    Cancel
                </Button>

                <Button type="submit" variant="contained" loading={isPending}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
}
