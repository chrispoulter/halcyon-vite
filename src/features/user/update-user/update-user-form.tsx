import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { DateFormField } from '@/components/date-form-field';
import { LoadingButton } from '@/components/loading-button';
import { TextFormField } from '@/components/text-form-field';
import { SwitchFormField } from '@/components/switch-form-field';
import { useUpdateUser } from '@/features/user/hooks/use-update-user';
import { DeleteUserButton } from '@/features/user/update-user/delete-user-button';
import { LockUserButton } from '@/features/user/update-user/lock-user-button';
import { UnlockUserButton } from '@/features/user/update-user/unlock-user-button';
import { GetUserResponse } from '@/features/user/user-types';
import { toast } from '@/hooks/use-toast';
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

    const form = useForm<UpdateUserFormValues>({
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
                onSuccess: () => {
                    toast({
                        title: 'Success',
                        description: 'User successfully updated.',
                    });

                    return navigate('/user');
                },
                onError: (error) => {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: error.message,
                    });
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
                    name="emailAddress"
                    label="Email Address"
                    type="email"
                    maxLength={254}
                    autoComplete="username"
                    required
                    disabled={isPending}
                />

                <div className="flex flex-col gap-6 sm:flex-row">
                    <TextFormField
                        control={form.control}
                        name="firstName"
                        label="First Name"
                        maxLength={50}
                        autoComplete="given-name"
                        required
                        disabled={isPending}
                        className="flex-1"
                    />
                    <TextFormField
                        control={form.control}
                        name="lastName"
                        label="Last Name"
                        maxLength={50}
                        autoComplete="family-name"
                        required
                        disabled={isPending}
                        className="flex-1"
                    />
                </div>

                <DateFormField
                    control={form.control}
                    name="dateOfBirth"
                    label="Date Of Birth"
                    autoComplete={['bday-day', 'bday-month', 'bday-year']}
                    required
                    disabled={isPending}
                />

                <SwitchFormField
                    control={form.control}
                    name="roles"
                    options={roles}
                    disabled={isPending}
                />

                <div className="flex flex-col-reverse justify-end gap-2 sm:flex-row">
                    <Button asChild variant="outline">
                        <Link to="/user">Cancel</Link>
                    </Button>

                    {user.isLockedOut ? (
                        <UnlockUserButton user={user} />
                    ) : (
                        <LockUserButton user={user} />
                    )}

                    <DeleteUserButton user={user} />

                    <LoadingButton type="submit" loading={isPending}>
                        Submit
                    </LoadingButton>
                </div>
            </form>
        </Form>
    );
}
