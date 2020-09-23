export default `
{
  id
  category
  isFavorite
  isToDo
  title
  type
  cardData{
    gifCardData{
      gifUrl
    }
    imageCardData{
      imageUrl
    }
    youtubeCardData{
      channelThumbnail
      channelTitle
      duration
      likes
      publishedAt
      videoId
      videoThumbnail
      videoTitle
      views
    }
  }
}
`;
