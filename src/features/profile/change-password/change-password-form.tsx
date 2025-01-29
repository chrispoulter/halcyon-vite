import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LoadingButton } from '@/components/loading-button';
import { TextFormField } from '@/components/text-form-field';
import { useChangePassword } from '@/features/profile/hooks/use-change-password';
import { GetProfileResponse } from '@/features/profile/profile-types';
import { toast } from '@/hooks/use-toast';

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

    const form = useForm<ChangePasswordFormValues>({
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
                    toast({
                        title: 'Success',
                        description: 'Your password has been changed.',
                    });

                    return navigate('/profile');
                },
            }
        );
    }

    return (
        <Form {...form}>
            <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <TextFormField
                    control={form.control}
                    name="currentPassword"
                    label="Current Password"
                    type="password"
                    maxLength={50}
                    autoComplete="current-password"
                    required
                    disabled={isPending}
                />

                <div className="flex flex-col gap-6 sm:flex-row">
                    <TextFormField
                        control={form.control}
                        name="newPassword"
                        label="New Password"
                        type="password"
                        maxLength={50}
                        autoComplete="new-password"
                        required
                        disabled={isPending}
                        className="flex-1"
                    />
                    <TextFormField
                        control={form.control}
                        name="confirmNewPassword"
                        label="Confirm New Password"
                        type="password"
                        maxLength={50}
                        autoComplete="new-password"
                        required
                        disabled={isPending}
                        className="flex-1"
                    />
                </div>

                <div className="flex flex-col-reverse justify-end gap-2 sm:flex-row">
                    <Button asChild variant="outline">
                        <Link to="/profile">Cancel</Link>
                    </Button>

                    <LoadingButton type="submit" loading={isPending}>
                        Submit
                    </LoadingButton>
                </div>
            </form>
        </Form>
    );
}
