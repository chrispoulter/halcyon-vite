import { Container, Box, Typography } from '@mui/material';

export function HomePage() {
    return (
        <Container maxWidth="sm">
            <Box>
                <Typography component="h1" variant="h3" gutterBottom>
                    Welcome!
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam semper diam at erat pulvinar, at pulvinar felis
                    blandit. Vestibulum volutpat tellus diam, consequat gravida
                    libero rhoncus ut. Morbi maximus, leo sit amet vehicula
                    eleifend, nunc dui porta orci, quis semper odio felis ut
                    quam.
                </Typography>

                <Typography variant="h2" gutterBottom>
                    Fusce condimentum
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Fusce vitae commodo metus. Pellentesque a eleifend dolor.
                    Morbi et finibus elit, accumsan sodales turpis. Nulla
                    bibendum pulvinar enim vitae malesuada. Nullam nulla justo,
                    ullamcorper et dui vel, pulvinar mattis enim. Ut dignissim
                    laoreet neque, eget placerat nisl auctor ac. Quisque id quam
                    sollicitudin, suscipit dui a, tempus justo. Aliquam iaculis
                    nisl lacus, non accumsan velit facilisis sed. Nulla commodo
                    sapien sit amet mauris sollicitudin, in lobortis quam
                    lacinia. Donec at pharetra neque, in accumsan dolor.
                </Typography>

                <Typography variant="h2" gutterBottom>
                    Morbi venenatis
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Morbi venenatis, felis ut cursus volutpat, dolor tortor
                    pulvinar nisl, ac scelerisque quam tortor sit amet ante.
                    Aliquam feugiat nisl arcu, sit amet tincidunt erat tempus
                    ut. Quisque laoreet purus et tempor dignissim. Phasellus
                    vehicula dapibus quam eget faucibus. Sed non posuere lorem.
                    Mauris sit amet risus imperdiet, scelerisque velit at,
                    condimentum nisl. Integer at ligula nisl. Donec sodales
                    justo mi, et bibendum enim bibendum quis. Vestibulum non
                    magna auctor massa efficitur maximus.
                </Typography>
            </Box>
        </Container>
    );
}
