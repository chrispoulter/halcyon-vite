import { DeleteUserButton } from '@/features/user/update-user/delete-user-button';
import { LockUserButton } from '@/features/user/update-user/lock-user-button';
import { UnlockUserButton } from '@/features/user/update-user/unlock-user-button';

export function UpdateUserForm() {
    return (
        <>
            <DeleteUserButton />
            <LockUserButton />
            <UnlockUserButton />
        </>
    );
}
