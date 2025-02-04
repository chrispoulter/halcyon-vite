import { useSearchParams } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const schema = z.object({
    search: z
        .string({
            message: 'Search must be a valid string',
        })
        .optional(),
});

type SearchUsersFormValues = z.infer<typeof schema>;

type SearchUsersFormProps = {
    search: string;
    disabled?: boolean;
};

export function SearchUsersForm({ search, disabled }: SearchUsersFormProps) {
    const [, setSearchParams] = useSearchParams();

    const form = useForm<SearchUsersFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            search,
        },
    });

    function onSubmit(data: SearchUsersFormValues) {
        setSearchParams((prev) => {
            prev.delete('page');
            prev.delete('search');

            if (data.search) {
                prev.set('search', data.search);
            }

            return prev;
        });
    }

    return (
        <Form {...form}>
            <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full gap-2"
            >
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    {...field}
                                    type="search"
                                    placeholder="Search Users..."
                                    disabled={disabled}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    variant="secondary"
                    size="icon"
                    disabled={disabled}
                >
                    <Search />
                    <span className="sr-only">Search users</span>
                </Button>
            </form>
        </Form>
    );
}
