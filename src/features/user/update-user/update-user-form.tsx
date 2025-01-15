import { DeleteUserButton } from '@/features/user/update-user/delete-user-button';
import { LockUserButton } from '@/features/user/update-user/lock-user-button';
import { UnlockUserButton } from '@/features/user/update-user/unlock-user-button';

type UpdateUserFormProps = {
    id: string;
};

export function UpdateUserForm({ id }: UpdateUserFormProps) {
    console.log('id', id);

    return (
        <>
            <DeleteUserButton />
            <LockUserButton />
            <UnlockUserButton />
        </>
    );
}
