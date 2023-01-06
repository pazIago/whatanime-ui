import { QueryClient } from '@tanstack/react-query';

import { AnimesResource } from './jikanResource';

export const prefetchAnimeById = async (queryClient: QueryClient, malId: number) => {
  await queryClient.prefetchQuery({
    queryKey: ['anime', malId],
    queryFn: async () => AnimesResource.getAnimeByIdOnJikan(malId),
  });
};

export const prefetchAnimeByTitle = async (queryClient: QueryClient, title: string) => {
  await queryClient.prefetchQuery({
    queryKey: ['anime', title],
    queryFn: async () => AnimesResource.getAnimesByTitleOnJikan(title),
  });
};

export const prefetchAnimeRandom = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: ['anime', 'a-random'],
    queryFn: async () => AnimesResource.getAnimeRandom(),
  });
};