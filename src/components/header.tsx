import { useState } from 'react';
import { Link as RouterLink } from 'react-router';
import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { UserNav } from '@/components/user-nav';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { Role } from '@/lib/session-types';

const routes = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    {
        href: '/user',
        label: 'Users',
        roles: [Role.SYSTEM_ADMINISTRATOR, Role.USER_ADMINISTRATOR],
    },
];

export function Header() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const { user } = useAuth();

    function onOpenNavMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorElNav(event.currentTarget);
    }

    function onCloseNavMenu() {
        setAnchorElNav(null);
    }

    const routeLinks = routes
        .filter((route) =>
            route.roles
                ? route.roles.some((value) => user?.roles?.includes(value))
                : true
        )
        .map((route) => (
            <MenuItem
                key={route.href}
                component={RouterLink}
                to={route.href}
                onClick={onCloseNavMenu}
            >
                <Typography sx={{ textAlign: 'center' }}>
                    {route.label}
                </Typography>
            </MenuItem>
        ));

    const mobileLinks = routes
        .filter(
            ({ roles }) =>
                !roles || roles.some((role) => user?.roles?.includes(role))
        )
        .map(({ href, label }) => (
            <Button
                key={href}
                component={RouterLink}
                to={href}
                onClick={onCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
                {label}
            </Button>
        ));

    return (
        <AppBar position="static">
            <Container maxWidth="sm">
                <Toolbar disableGutters>
                    {/* main logo */}
                    <Typography
                        variant="h6"
                        noWrap
                        component={RouterLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Halcyon
                    </Typography>

                    {/* mobile menu */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={onOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={onCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {routeLinks}
                        </Menu>
                    </Box>

                    {/* desktop logo */}
                    <Typography
                        variant="h5"
                        noWrap
                        component={RouterLink}
                        to="/"
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Halcyon
                    </Typography>

                    {/* desktop menu */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {mobileLinks}
                    </Box>

                    <UserNav />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
