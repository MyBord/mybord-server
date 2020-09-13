import ServerError from 'server/serverError';
import youtube from 'youtube/youtube';
import cardEnums from '../../cardUtils/cardEnums';
import { getYoutubeVideoId } from '../../cardUtils/cardUtils';

export default async (parent, args) => {
  try {
    const videoId = getYoutubeVideoId(args.data.url);
    const youtubeVideoData = await youtube.getYoutubeVideoData(videoId);

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
