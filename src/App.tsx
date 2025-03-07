import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';
import theme from './styles/theme';
import GlobalStyles from './styles/global-styles';
import NavBar from './components/common/navbar';
import Home from './pages/home';
import Footer from './components/common/footer';
import About from './pages/about';
import Contact from './pages/contact';
import Services from './pages/services';
import Blog from './pages/blog';
import BlogPost from './pages/blog-post';
import NotFound from './components/common/not-found/not-found';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes as you implement other pages */}
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;