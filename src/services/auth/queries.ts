import { useEffect } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getAuthUser, signIn, signOut, subscribeToAuth } from "./api";

const userKey = ["auth", "user"] as const;

export function useAuthUser() {
  const queryClient = useQueryClient();
  useEffect(
    () =>
      subscribeToAuth((user) => {
        queryClient.setQueryData(userKey, user);
      }),
    [queryClient]
  );
  return useQuery({ queryKey: userKey, queryFn: getAuthUser, retry: false });
}

export function useSignIn() {
  return useMutation({ mutationFn: signIn });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.setQueryData(userKey, null);
    },
  });
}
