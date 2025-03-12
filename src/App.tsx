import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import theme from './styles/theme';
import GlobalStyles from './styles/global-styles';
import NavBar from './components/common/navbar';
import Home from './pages/home';
import Footer from './components/common/footer';
import About from './pages/about';
import Contact from './pages/contact';
import Services from './pages/services';
import Blog from './pages/blog';
import Portfolio from './pages/portfolio';
import NotFound from './components/common/not-found/not-found';
import PrivacyPolicy from './components/common/legal/privacy-policy';
import TermsOfService from './components/common/legal/terms-of-service';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;