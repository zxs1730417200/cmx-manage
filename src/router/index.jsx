import App from "../App.js"
import Edit from "../pages/Edit"
import List from "../pages/List"
import Login from "../pages/Login"
import Means from "../pages/Means"
import Register from "../pages/Register"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import "../asstes/base.css"

const BaseRouter=()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}> 
                    <Route path="/list" element={<List/>}></Route>
                    <Route path="/edit" element={<Edit/>}></Route>
                    <Route path="/edit/:id" element={<Edit/>}></Route>
                    <Route path="/means" element={<Means/>}></Route>
                </Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default BaseRouter