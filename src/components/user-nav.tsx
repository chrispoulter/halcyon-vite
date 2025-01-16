import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router';
import {
    Box,
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import { useSession } from '@/hooks/useSession';

export function UserNav() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    const { profile, clearSession } = useSession();

    function onOpenUserMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorElUser(event.currentTarget);
    }

    function onCloseUserMenu() {
        setAnchorElUser(null);
    }

    function onLogout() {
        setAnchorElUser(null);
        clearSession();
        return navigate('/');
    }

    if (!profile) {
        return null;
    }

    const hashedEmail = '1234';

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open user menu">
                <IconButton onClick={onOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                        alt={`${profile.given_name} ${profile.family_name}`}
                        src={`https://www.gravatar.com/avatar/${hashedEmail}?d=404`}
                    />
                </IconButton>
            </Tooltip>

            <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={onCloseUserMenu}
            >
                <MenuItem
                    component={RouterLink}
                    to="/profile"
                    onClick={onCloseUserMenu}
                >
                    <Typography sx={{ textAlign: 'center' }}>
                        My Account
                    </Typography>
                </MenuItem>

                <MenuItem onClick={onLogout}>
                    <Typography sx={{ textAlign: 'center' }}>
                        Log out
                    </Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}
