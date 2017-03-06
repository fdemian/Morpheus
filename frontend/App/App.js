import React from 'react'
import cssModules from 'react-css-modules';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from '../Toolbar/NavbarContainer';
import Footer from './Footer';
import Styles from './Base.scss';

const App = ({children}) => (
 <MuiThemeProvider>
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
 </MuiThemeProvider>
);

export default cssModules(App, Styles, { allowMultiple: true });
