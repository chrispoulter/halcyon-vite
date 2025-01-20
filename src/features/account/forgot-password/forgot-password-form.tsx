import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSnackbar } from 'notistack';
import { Box, Button } from '@mui/material';
import { TextFormField } from '@/components/text-form-field';
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

    const { handleSubmit, control } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            emailAddress: '',
        },
    });

    const { mutate, isPending } = useForgotPassword();

    function onSubmit(data: ForgotPasswordFormValues) {
        mutate(data, {
            onSuccess: async () => {
                enqueueSnackbar(
                    'Instructions as to how to reset your password have been sent to you via email.',
                    { variant: 'success' }
                );

                return navigate('/account/login');
            },
        });
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
