import { Outlet } from 'react-router';

export function Layout() {
    return (
        <div>
            <div>Header</div>
            <Outlet />
            <div>Footer</div>
        </div>
    );
}
