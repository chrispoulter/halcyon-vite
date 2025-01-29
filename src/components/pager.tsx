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
};

export function Pager({ hasPreviousPage, hasNextPage, page = 1 }: PagerProps) {
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
