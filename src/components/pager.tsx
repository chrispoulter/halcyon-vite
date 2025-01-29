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
    const [searchParams] = useSearchParams();

    if (!hasPreviousPage && !hasNextPage) {
        return null;
    }

    function getPageSearchParams(page: number) {
        const updatedSearchParams = new URLSearchParams(searchParams);
        updatedSearchParams.set('page', page.toString());
        return updatedSearchParams.toString();
    }

    return (
        <Pagination>
            <PaginationContent>
                {hasPreviousPage && (
                    <PaginationItem>
                        <PaginationPrevious
                            to={{
                                search: getPageSearchParams(page - 1),
                            }}
                        />
                    </PaginationItem>
                )}
                {hasNextPage && (
                    <PaginationItem>
                        <PaginationNext
                            to={{
                                search: getPageSearchParams(page + 1),
                            }}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
