import React from 'react';
import Renderer from '../../Story/DraftRenderer';
import QuoteBlock from './QuoteBlock/QuoteBlock';

const QuoteBlockWrapper = (props) => {

 const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
 );

 const comment = entity.getData().props;

 return(<QuoteBlock comment={comment} />);

}

export default QuoteBlockWrapper;