import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import About from './component/About';
import Dashboard from './component/Dashboard';
import Home from './component/Home'
import From from './component/From';
import UserList from './component/UserList';
import AddUser from './component/AddUser';
import AddCollage from './component/AddCollage';
import CollageList from './component/CollageList';
import AddStudent from './component/AddStudent';
import StudentList from './component/StudentList';
import AddMarksheet from './component/AddMarksheet';
import AddRole from './component/AddRole';
import RoleList from './component/RoleList';
import MarksheetList from './component/MarksheetList';
import Login from './component/Login';
import Registration from './component/Registration';
import Fromm from './component/Fromm';
import { Component } from 'react';


// import Work from './Component/Work';
// import From from './Component/From';
// import List from './Component/List';
// import Ragistration from './Component/Ragistration'
class App extends Component {



  render() {

    let auth = localStorage.getItem("token")
    console.log("Auth in App :", auth)

    if (auth === null && !auth && window.location.pathname !== "/Login" ) {
      console.log("Auth is a empty")
      window.location.pathname = "/Login"
    }

    return (

      <BrowserRouter className="App">
        <Dashboard />

        <Routes>
          <Route path='/Fromm' element={<Fromm />} />
          <Route path='/' element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/From" element={<From />} />
          {/* <Route path="/Table" element={<Table />} /> */}
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/AddUser/:id" element={<AddUser />} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/AddCollage" element={<AddCollage />} />
          <Route path="/AddCollage/:id" element={<AddCollage />} />
          <Route path="/CollageList" element={<CollageList />} />
          <Route path="/AddStudent" element={<AddStudent />} />
          <Route path="/AddStudent/:id" element={<AddStudent />} />
          <Route path="/StudentList" element={<StudentList />} />
          <Route path="/AddMarksheet" element={<AddMarksheet />} />
          <Route path="/AddMarksheet/:id" element={<AddMarksheet />} />
          <Route path="/MarksheetList" element={<MarksheetList />} />
          <Route path="/AddRole" element={<AddRole />} />
          <Route path="/AddRole/:id" element={<AddRole />} />
          <Route path="/RoleList" element={<RoleList />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          {/* <Route path="/Work" element={<Work />} />
        <Route path="/From" element={<From />} />
        <Route path="/List" element={<List />} />
        <Route path="/Ragistration" element={<Ragistration />} /> */}
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;
