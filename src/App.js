import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Navbar } from './Navbar';
import { ExploreContent } from './ExploreContent';
import { Upload } from './Upload';
import { ProfilePage } from './ProfilePage';
import { Homepage } from './Homepage';

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
function App() {
 
  return (
    <div className="App"> 
    <Router>
      <Navbar />
      <Routes>
          <Route path="/" element={<Homepage/>}>
          </Route>
          <Route 
          path="/upload"
           element={<Upload />}>
          </Route>
          <Route path="/exploreContent" element={<ExploreContent/>}></Route>
          <Route path="/profile" element={<ProfilePage/>}></Route>
        </Routes>
      </Router>
    </div>  
  );
}
export default App;
