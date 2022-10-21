import React from 'react'
import './asstes/base.css'
import { Layout  } from 'antd';
import Header from './components/Header.jsx';
import {Outlet} from 'react-router-dom'
import Aside from './components/Aside.jsx';
import Bread from './components/Bread.jsx'



  const App=()=> {
  
  return (
    <Layout id='app'>
      {/* <marquee behavior="scroll" direction="left" width="100%" vspace="20" hspace="10">我是张小顺</marquee> */}
      <Header/>
      
    
        <div className='container'>
        <Aside />
          <div className='container_box'>
            <Bread/>
            <div className='container_content'>
              <Outlet />
            </div>
          </div>
        </div>
      
      <footer>Respect|Copyright &copy; 2022 Author</footer>
    </Layout>
  )
}

export default App