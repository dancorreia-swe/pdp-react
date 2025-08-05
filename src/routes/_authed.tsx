import { createFileRoute } from "@tanstack/react-router";

const AUTH_UNAUTHORIZED = "Not authenticated";

export const Route = createFileRoute("/_authed")({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw new Error(AUTH_UNAUTHORIZED);
    }
  },
  errorComponent: ({ error }) => {
    if (error.message === AUTH_UNAUTHORIZED) {
    }

    throw error;
  },
});
