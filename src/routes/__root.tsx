import { Anchor, Container, Group, Stack } from "@mantine/core";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    return (
      <Container>
        <Stack bg="#eee" h="100vh" p="lg">
          <Group gap="lg">
            <Anchor to="/" component={Link} search={{ pokemonName: "Pikachu" }}>
              Home
            </Anchor>

            <Anchor
              component={Link}
              to="/pokemon/$pokemonId"
              params={{ pokemonId: "1234" }}
            >
              About
            </Anchor>
          </Group>

          <Outlet />

          <TanStackRouterDevtools />
        </Stack>
      </Container>
    );
  },
});
