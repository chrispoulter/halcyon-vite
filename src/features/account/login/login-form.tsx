import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSnackbar } from 'notistack';
import { Box, TextField, Button } from '@mui/material';
import { useLogin } from '@/features/account/hooks/use-login';

const schema = z.object({
    emailAddress: z
        .string({ message: 'Email Address is a required field' })
        .min(1, 'Email Address is a required field')
        .email('Email Address must be a valid email'),
    password: z
        .string({ message: 'Password is a required field' })
        .min(1, 'Password is a required field'),
});

type LoginFormValues = z.infer<typeof schema>;

export function LoginForm() {
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(schema),
    });

    const { mutate, isPending } = useLogin();

    const onSubmit = (values: LoginFormValues) =>
        mutate(values, {
            onSuccess: async () => {
                enqueueSnackbar('User successfully logged in.', {
                    variant: 'success',
                });

                return navigate('/');
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

            <TextField
                {...register('password')}
                label="Password"
                type="password"
                autoComplete="current-password"
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
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isPending}
                    fullWidth
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
}
