import React from 'react';
import VideoProviders from './EmbedVideoProviders';

function getEmbededURL(url)
{
   let _embededURL = "";

   for (var provider of VideoProviders) {
     if(url.indexOf(provider.name) != -1)
       return _embededURL = provider.convertURL(url);
   }

   return _embededURL;
}

const HTML5Video = ({source}) => {
    return <video width="420" height="345" controls src={source} />;
};

const EmbededVideo = ({src}) => {

  if(src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".ogg"))
    return <HTML5Video source={src} />;

  const embedURL = getEmbededURL(src);

  return (
  <iframe width="420" height="345" src={embedURL} frameBorder="0" allowFullScreen>
  </iframe>
  );

}

export default EmbededVideo;
