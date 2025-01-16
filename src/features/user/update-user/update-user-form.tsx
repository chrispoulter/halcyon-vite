import { useNavigate, Link as RouterLink } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSnackbar } from 'notistack';
import { Box, Button } from '@mui/material';
import { DateFormField } from '@/components/date-form-field';
import { TextFormField } from '@/components/text-form-field';
import { SwitchFormField } from '@/components/switch-form-field';
import { useUpdateUser } from '@/features/user/hooks/use-update-user';
import { DeleteUserButton } from '@/features/user/update-user/delete-user-button';
import { LockUserButton } from '@/features/user/update-user/lock-user-button';
import { UnlockUserButton } from '@/features/user/update-user/unlock-user-button';
import { GetUserResponse } from '@/features/user/user-types';
import { isInPast } from '@/lib/dates';
import { Role, roles } from '@/lib/session-types';

const schema = z.object({
    emailAddress: z
        .string({ message: 'Email Address must be a valid string' })
        .email('Email Address must be a valid email'),
    firstName: z
        .string({ message: 'First Name must be a valid string' })
        .min(1, 'First Name is a required field')
        .max(50, 'First Name must be no more than 50 characters'),
    lastName: z
        .string({ message: 'Last Name must be a valid string' })
        .min(1, 'Last Name is a required field')
        .max(50, 'Last Name must be no more than 50 characters'),
    dateOfBirth: z
        .string({
            message: 'Date of Birth must be a valid string',
        })
        .date('Date Of Birth must be a valid date')
        .refine(isInPast, { message: 'Date Of Birth must be in the past' }),
    roles: z
        .array(
            z.nativeEnum(Role, {
                message: 'Role must be a valid user role',
            }),
            { message: 'Role must be a valid array' }
        )
        .optional(),
});

type UpdateUserFormValues = z.infer<typeof schema>;

type UpdateUserFormProps = {
    user: GetUserResponse;
};

export function UpdateUserForm({ user }: UpdateUserFormProps) {
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const { handleSubmit, control } = useForm<UpdateUserFormValues>({
        resolver: zodResolver(schema),
        values: user,
    });

    const { mutate, isPending } = useUpdateUser(user.id);

    function onSubmit(data: UpdateUserFormValues) {
        mutate(
            {
                ...data,
                version: user.version,
            },
            {
                onSuccess: async () => {
                    enqueueSnackbar('User successfully updated.', {
                        variant: 'success',
                    });

                    return navigate('/user');
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
                    name="firstName"
                    label="First Name"
                    maxLength={50}
                    autoComplete="given-name"
                    required
                    disabled={isPending}
                    fullWidth
                />
                <TextFormField
                    control={control}
                    name="lastName"
                    label="Last Name"
                    maxLength={50}
                    autoComplete="family-name"
                    required
                    disabled={isPending}
                    fullWidth
                />
            </Box>

            <DateFormField
                control={control}
                name="dateOfBirth"
                label="Date Of Birth"
                autoComplete={['bday-day', 'bday-month', 'bday-year']}
                required
                disabled={isPending}
            />

            <SwitchFormField
                control={control}
                name="roles"
                label="Roles"
                options={roles}
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
                <Button component={RouterLink} variant="outlined" to="/user">
                    Cancel
                </Button>

                {user.isLockedOut ? (
                    <UnlockUserButton user={user} />
                ) : (
                    <LockUserButton user={user} />
                )}

                <DeleteUserButton user={user} />

                <Button type="submit" variant="contained" disabled={isPending}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
}
