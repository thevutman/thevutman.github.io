import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../container/Layout';
import Home from '../pages/Home';
import '../styles/global.scss'

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes >
                    <Route path='/' element={<Home />}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;