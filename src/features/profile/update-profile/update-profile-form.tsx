import { useNavigate, Link as RouterLink } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSnackbar } from 'notistack';
import { Box, Button } from '@mui/material';
import { DateFormField } from '@/components/date-form-field';
import { TextFormField } from '@/components/text-form-field';
import { useUpdateProfile } from '@/features/profile/hooks/use-update-profile';
import { GetProfileResponse } from '@/features/profile/profile-types';
import { isInPast } from '@/lib/dates';

const schema = z.object({
    emailAddress: z
        .string({ message: 'Email Address must be a valid string' })
        .email('Email Address must be a valid email'),
    firstName: z
        .string({ message: 'Last Name must be a valid string' })
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
});

type UpdateProfileFormValues = z.infer<typeof schema>;

type UpdateProfileFormProps = {
    profile: GetProfileResponse;
};
export function UpdateProfileForm({ profile }: UpdateProfileFormProps) {
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const { handleSubmit, control } = useForm<UpdateProfileFormValues>({
        resolver: zodResolver(schema),
        values: profile,
    });

    const { mutate, isPending } = useUpdateProfile();

    function onSubmit(data: UpdateProfileFormValues) {
        mutate(
            {
                ...data,
                version: profile.version,
            },
            {
                onSuccess: async () => {
                    enqueueSnackbar('Your profile has been updated.', {
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
