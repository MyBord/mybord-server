import { google } from 'googleapis';
import { YoutubeVideoData } from 'types/youtubeTypes';
import { formatDuration, formatNumber, formatPublishedAt } from './youtubeUtils';

// initializes the Youtube Data API
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.GAPI_KEY,
});

// Returns the thumbnail for a particular youtube channel
const getYoutubeChannelThumbnail = async (channelId: string): Promise<string> => {
  try {
    const channelData = await youtube.channels.list({
      part: 'snippet',
      id: channelId,
    });
    return channelData.data.items[0].snippet.thumbnails.medium.url;
  } catch (error) {
    throw Error(`Error loading the youtube channel thumbnail: ${error}`);
  }
};

// source: https://stackoverflow.com/a/27728417/7460467
const getYoutubeVideoId = (url): string => {
  if (
    url.includes('youtube.com')
    || url.includes('youtu.be')
    || url.includes('youtube-nocookie.com')
  ) {
    const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[1]) {
      return match[1];
    }
    throw Error('Your youtube url is not valid');
  }
  throw Error('You must provide a youtube url');
};

// Returns all necessary information about a particular youtube video given its video id
const getYoutubeVideoData = async (url: string): Promise<YoutubeVideoData> => {
  const videoId = getYoutubeVideoId(url);
  try {
    const youtubeVideoData = await youtube.videos.list({
      part: 'contentDetails,snippet,statistics',
      id: videoId,
    });
    const {
      contentDetails,
      id,
      snippet,
      statistics,
    } = youtubeVideoData.data.items[0];
    const channelThumbnail = await getYoutubeChannelThumbnail(snippet.channelId);
    return {
      channelThumbnail,
      channelTitle: snippet.channelTitle,
      duration: formatDuration(contentDetails.duration),
      likes: formatNumber(statistics.likeCount),
      publishedAt: formatPublishedAt(snippet.publishedAt),
      videoId: id,
      videoThumbnail: snippet.thumbnails.medium.url,
      videoTitle: snippet.title,
      views: formatNumber(statistics.viewCount),
    };
  } catch (error) {
    throw Error(`Error getting youtube video data: ${error}`);
  }
};


export default {
  getYoutubeVideoData,
};
