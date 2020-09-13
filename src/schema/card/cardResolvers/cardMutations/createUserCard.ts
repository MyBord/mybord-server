import ServerError from 'server/serverError';
import youtube from 'youtube/youtube';
import cardInfo from '../../cardUtils/cardInfo';

const getCardType = (url: string): string => {
  if (
    url.includes('youtube.com')
    || url.includes('youtu.be')
    || url.includes('youtube-nocookie.com')
  ) {
    return 'Youtube';
  }

  if (url.endsWith('.jpg') || url.endsWith('.png')) {
    return 'Image';
  }

  throw Error('Cannot detect a valid card type');
};

export default async (parent, args, { passport, prisma, pubsub }) => {
  try {
    const {
      category,
      isFavorite,
      isToDo,
      title,
      url,
    } = args.data;

    const type = getCardType(url);

    const userId = passport.getUserId();
    let createArgs: object;

    if (type === 'Youtube') {
      const youtubeVideoData = await youtube.getYoutubeVideoData(url);
      createArgs = {
        youtubeCardData: {
          create: {
            ...youtubeVideoData,
          },
        },
      };
    } else {
      throw new Error('invalid card type');
    }

    const finalArgs = {
      ...args,
      data: {
        cardData: {
          create: { ...createArgs },
        },
        category,
        isFavorite,
        isToDo,
        title,
        type,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    };

    const card = await prisma.mutation.createCard(finalArgs, cardInfo);
    pubsub.publish('userCard', { userCard: card });
    return card;
  } catch (error) {
    throw new ServerError({ message: error.message, status: 400 });
  }
};
