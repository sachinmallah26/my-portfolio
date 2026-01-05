'use client';

import Header from './components/Header';
const Hero = dynamic(() => import('./components/Hero'), { ssr: false });
const About = dynamic(() => import('./components/About'), { ssr: false });
import Projects from './components/Projects';
import Skills from './components/Skills';
import MyEdge from './components/MyEdge';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Education from './components/EducationSection';
import Certificates from './components/Certificates';
import dynamic from 'next/dynamic';

export default function Home() {
  return (
    <main className="pt-20">
      <Header />
      <Hero />
      <About />
      <Education/>
      <Skills />
      <Projects />
      <Certificates />
      <MyEdge />
      <Contact />
      <Footer />
    </main>
  );
}
