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
    onChange: (page: number) => void;
    disabled?: boolean;
};

export function Pager({
    hasPreviousPage,
    hasNextPage,
    page = 1,
    onChange,
    disabled,
}: PagerProps) {
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
                            onClick={() => onChange(page - 1)}
                        />
                    </PaginationItem>
                )}
                {hasNextPage && (
                    <PaginationItem>
                        <PaginationNext
                            disabled={disabled}
                            onClick={() => onChange(page + 1)}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
