import { useCallback, useEffect, useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import { useQuoteRandom } from '@/hooks/useQuote';
import { AnimesResource, prefetchAnimeById } from '@/services/http';

import { Button, Character, Content, Flex, Header, StyledText as Text, Title } from './styles';

export function Quote() {
  const [malId, setMalId] = useState<number | null>(null);
  const { data, isLoading } = useQuoteRandom();
  const queryClient = useQueryClient();

  const verifyMalId = useCallback(async (animeTitle: string | undefined) => {
    if (animeTitle !== undefined) {
      await AnimesResource.getAnimesByTitleOnJikan(encodeURI(animeTitle))
        .then((animes) => setMalId(animes[0].malId))
        .catch(() => setMalId(null));
    } else {
      setMalId(null);
    }
  }, []);

  useEffect(() => {
    verifyMalId(data?.title);
  }, [data?.title, verifyMalId]);

  const prefetchAnime = useCallback(async () => {
    if (malId !== null) await prefetchAnimeById(queryClient, malId);
  }, [queryClient, malId]);

  if (isLoading || !data) {
    return (
      <Content>
        <Text>is Loading...</Text>
      </Content>
    );
  }

  const { character, title, quote } = data;

  return (
    <Content>
      <Text>{quote}</Text>
      <Flex>
        <Header>
          <Character>{character}</Character>
          <Title>{title}</Title>
        </Header>
        {malId ? (
          <Button
            aria-label={`link to ${title} page`}
            as={Link}
            href={`/${malId}`}
            onMouseOver={() => prefetchAnime()}
          >
            <AiOutlineArrowRight size={32} />
          </Button>
        ) : null}
      </Flex>
    </Content>
  );
}