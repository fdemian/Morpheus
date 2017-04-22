import React from 'react'
import cssModules from 'react-css-modules';
import Navbar from '../Toolbar/NavbarContainer';
import Footer from './Footer';
import Styles from './Base.scss';

const App = ({children}) => (
   <div styleName="App">	 

     <div styleName="Toolbar">
         <Navbar />
     </div>

     <div>
        {children}
     </div>

     <div>
        <Footer />
     </div>

   </div>
);

export default cssModules(App, Styles, { allowMultiple: true });
