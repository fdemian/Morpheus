import React from 'react'
//import cssModules from 'react-css-modules';
import { Link } from 'react-router';

const headerImageStyles = {
 'maxHeight': '1000px',
 'width': '100%',
 'maxWidth': '100%'
}

const imgSRC = "https://fb-s-a-a.akamaihd.net/h-ak-xtp1/v/t1.0-9/15036540_10211033285894206_4752209531205670470_n.jpg?oh=a09cc764ccc28e9d01620f41d39fe5e2&oe=58E93E02&__gda__=1491143721_dfa42d63d69b3d2a2166139251cae40c";

const BlogHeader = ({imageURL}) => (
 <div>
  <Link to="/">
    <img src={imgSRC} alt="Blog Name" style={headerImageStyles} />
  </Link>	
 </div>
);

export default BlogHeader;
//export default cssModules(App, Styles, { allowMultiple: true });
