import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/pokemon/$id")({
  component: PokemonDetails,
});

function PokemonDetails() {
  const params = Route.useParams();

  return <div>PokemonDetails! {params.id}</div>;
}
