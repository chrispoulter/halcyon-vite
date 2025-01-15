import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSnackbar } from 'notistack';
import { Box, TextField, Button } from '@mui/material';
import { useRegister } from '@/features/account/hooks/use-register';
import { isInPast } from '@/lib/dates';

const schema = z
    .object({
        emailAddress: z
            .string({ message: 'Email Address is a required field' })
            .min(1, 'Email Address is a required field')
            .max(254, 'Password must be no more than 254 characters')
            .email('Email Address must be a valid email'),
        password: z
            .string({ message: 'Password is a required field' })
            .min(8, 'Password must be at least 8 characters')
            .max(50, 'Password must be no more than 50 characters'),
        confirmPassword: z
            .string({
                message: 'Confirm Password is a required field',
            })
            .min(1, 'Confirm Password is a required field'),
        firstName: z
            .string({
                message: 'Confirm Password is a required field',
            })
            .min(1, 'First Name is a required field')
            .max(50, 'First Name must be no more than 50 characters'),
        lastName: z
            .string({ message: 'Last Name is a required field' })
            .min(1, 'Last Name is a required field')
            .max(50, 'Last Name must be no more than 50 characters'),
        dateOfBirth: z
            .string({
                message: 'Date of Birth is a required field',
            })
            .min(1, 'Date Of Birth is a required field')
            .date('Date Of Birth must be a valid date')
            .refine(isInPast, { message: 'Date Of Birth must be in the past' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

type RegisterFormValues = z.infer<typeof schema>;

export function RegisterForm() {
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(schema),
    });

    const { mutate, isPending } = useRegister();

    const onSubmit = (values: RegisterFormValues) =>
        mutate(values, {
            onSuccess: async () => {
                enqueueSnackbar('User successfully registered.', {
                    variant: 'success',
                });

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
                    gap: 2,
                }}
            >
                <TextField
                    {...register('password')}
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    required
                    disabled={isPending}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    fullWidth
                />

                <TextField
                    {...register('confirmPassword')}
                    label="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                    required
                    disabled={isPending}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    fullWidth
                />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                }}
            >
                <TextField
                    {...register('firstName')}
                    label="First Name"
                    type="text"
                    autoComplete="given-name"
                    required
                    disabled={isPending}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    fullWidth
                />

                <TextField
                    {...register('lastName')}
                    label="Last Name"
                    type="text"
                    autoComplete="family-name"
                    required
                    disabled={isPending}
                    error={!!errors.lastName}
                    helperText={errors.v?.message}
                    fullWidth
                />
            </Box>

            <TextField
                {...register('dateOfBirth')}
                label="Date Of Birth"
                required
                disabled={isPending}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth?.message}
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
