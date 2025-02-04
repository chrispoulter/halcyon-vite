import { useSearchParams } from 'react-router';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

type PagerProps = {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    page?: number;
    disabled?: boolean;
};

export function Pager({
    hasPreviousPage,
    hasNextPage,
    page = 1,
    disabled,
}: PagerProps) {
    const [, setSearchParams] = useSearchParams();

    if (!hasPreviousPage && !hasNextPage) {
        return null;
    }

    return (
        <Pagination>
            <PaginationContent>
                {hasPreviousPage && (
                    <PaginationItem>
                        <PaginationPrevious
                            disabled={disabled}
                            onClick={() =>
                                setSearchParams((prev) => {
                                    prev.set('page', (page - 1).toString());
                                    return prev;
                                })
                            }
                        />
                    </PaginationItem>
                )}
                {hasNextPage && (
                    <PaginationItem>
                        <PaginationNext
                            disabled={disabled}
                            onClick={() =>
                                setSearchParams((prev) => {
                                    prev.set('page', (page + 1).toString());
                                    return prev;
                                })
                            }
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
