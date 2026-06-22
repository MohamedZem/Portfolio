import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout/Layout.jsx';

import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';

import AboutBiography from "./pages/About/AboutBiography/AboutBiography";
import AboutExperience from "./pages/About/AboutExperience/AboutExperience";
import AboutEducation from "./pages/About/AboutEducation/AboutEducation";
import AboutSkills from "./pages/About/AboutSkills/AboutSkills";

import Projects from './pages/Projects/Projects.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Error from './pages/Error/Error.jsx';


function Router () { 
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />}>
                        <Route index element={<AboutBiography />} />
                        <Route path="biography" element={<AboutBiography />} />
                        <Route path="skills" element={<AboutSkills />} />
                        <Route path="experience" element={<AboutExperience />} />
                        <Route path="education" element={<AboutEducation />} />
                        </Route>
                    <Route path="projects" element={<Projects />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="/error" element={<Error />} />
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


export default Router;