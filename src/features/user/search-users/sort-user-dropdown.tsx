import { useSearchParams } from 'react-router';
import { ArrowDownWideNarrow } from 'lucide-react';
import { UserSort } from '@/features/user/user-types';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const sortOptions = [
    {
        value: UserSort.NAME_ASC,
        label: 'Name A-Z',
    },
    {
        value: UserSort.NAME_DESC,
        label: 'Name Z-A',
    },
    {
        value: UserSort.EMAIL_ADDRESS_ASC,
        label: 'Email Address A-Z',
    },
    {
        value: UserSort.EMAIL_ADDRESS_DESC,
        label: 'Email Address Z-A',
    },
];

type SortUserDropdownProps = {
    sort?: UserSort;
};

export function SortUserDropdown({ sort }: SortUserDropdownProps) {
    const [, setSearchParams] = useSearchParams();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon">
                    <ArrowDownWideNarrow />
                    <span className="sr-only">Toggle sort</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {sortOptions.map(({ label, value }) => (
                    <DropdownMenuItem
                        key={value}
                        disabled={sort === value}
                        onClick={() =>
                            setSearchParams((prev) => {
                                prev.set('sort', value);
                                return prev;
                            })
                        }
                    >
                        {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
