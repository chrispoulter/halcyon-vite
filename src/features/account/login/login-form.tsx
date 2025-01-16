import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button } from '@mui/material';
import { TextFormField } from '@/components/text-form-field';
import { useLogin } from '@/features/account/hooks/use-login';
import { useSession } from '@/hooks/useSession';

const schema = z.object({
    emailAddress: z
        .string({ message: 'Email Address must be a valid string' })
        .email('Email Address must be a valid email'),
    password: z
        .string({ message: 'Password must be a valid string' })
        .min(1, 'Password is a required field'),
});

type LoginFormValues = z.infer<typeof schema>;

export function LoginForm() {
    const navigate = useNavigate();

    const { setSession } = useSession();

    const { handleSubmit, control } = useForm<LoginFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            emailAddress: '',
            password: '',
        },
    });

    const { mutate, isPending } = useLogin();

    function onSubmit(data: LoginFormValues) {
        mutate(data, {
            onSuccess: async (data) => {
                setSession(data.accessToken);

                return navigate('/');
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

            <TextFormField
                control={control}
                name="password"
                label="Password"
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
