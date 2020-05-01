// source: https://stackoverflow.com/a/27728417/7460467

export default (url): string => {
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
    throw Error('cannot get youtube video, broken link');
  }
  throw Error('improper url, not youtube');
};
