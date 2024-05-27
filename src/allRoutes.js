import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import AddProperty from "./pages/addproperty";
import GetuserProperty from "./pages/getuserproperty";
import ViewProperty from "./pages/viewproperty";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/addproperty" element={<AddProperty />} />
        <Route exact path="/getmyproperty" element={<GetuserProperty />} />
        <Route
          exact
          path="/viewproperty/:propertyId"
          element={<ViewProperty />}
        />
      </Routes>
    </Router>
  );
};
export default App;
