import React from 'react';
import  EmbededVideo from './EmbededVideo';

const Media = (props) => {


 const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
 );
 const {src} = entity.getData();
 const type = entity.getType();

 let media;

 if (type === 'Audio') {
    media = <Audio src={src} />;
 } else if (type === 'Image') {
     media = <Image src={src} />;
 } else if (type === 'Video') {
     media = <EmbededVideo src={src} />;
 }

 return media;
};

const Audio = (props) => {
    return <audio controls src={props.src} />;
};

const Image = (props) => {
    return <img src={props.src} />;
};

export default Media;
