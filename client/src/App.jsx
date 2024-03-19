import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path={"/home"} element={<Home />} />
          <Route path={"/"} element={<SignUp />} />
          <Route path={"/login"} element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;



// import React from 'react';
// import toast, { Toaster } from 'react-hot-toast';

// const notify = () => toast('Here is your toast.');

// const App = () => {
//   return (
//     <div>
//       <button onClick={notify}>Make me a toast</button>
//       <Toaster />
//     </div>
//   );
// };

// export default App;
