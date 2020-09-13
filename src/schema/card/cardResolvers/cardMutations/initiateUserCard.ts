import ServerError from 'server/serverError';
import youtube from 'youtube/youtube';
import cardEnums from '../../cardUtils/cardEnums';

export default async (parent, args) => {
  try {
    const youtubeVideoData = await youtube.getYoutubeVideoData(args.data.url);

    return {
      cardData: {
        youtubeCardData: youtubeVideoData,
      },
      category: cardEnums.video,
      title: youtubeVideoData.videoTitle,
      url: args.data.url,
    };
  } catch (error) {
    throw new ServerError({ message: error.message, status: 400 });
  }
};
