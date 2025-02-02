import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../istockphoto-1439686281-612x612.jpg';
const IndividualIntervalsExample = () => {
    return (_jsx("div", { className: "w-full max-w-[1530px] mx-auto bg-white rounded-lg shadow-lg overflow-hidden", children: _jsx("div", { className: "relative h-[432px]", children: _jsxs(Carousel, { className: "h-full", children: [_jsx(Carousel.Item, { interval: 1000, children: _jsxs("div", { className: "relative w-full h-[432px]", children: [_jsx("img", { src: ExampleCarouselImage, alt: "First slide", className: "absolute inset-0 w-full h-full object-cover" }), _jsxs(Carousel.Caption, { className: "absolute bottom-0 left-0 right-0 p-4 bg-black/50", children: [_jsx("h3", { className: "text-2xl font-bold", children: "First slide label" }), _jsx("p", { children: "Nulla vitae elit libero, a pharetra augue mollis interdum." })] })] }) }), _jsx(Carousel.Item, { interval: 500, children: _jsxs("div", { className: "relative w-full h-[432px]", children: [_jsx("img", { src: ExampleCarouselImage, alt: "Second slide", className: "absolute inset-0 w-full h-full object-cover" }), _jsxs(Carousel.Caption, { className: "absolute bottom-0 left-0 right-0 p-4 bg-black/50", children: [_jsx("h3", { className: "text-2xl font-bold", children: "Second slide label" }), _jsx("p", { children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." })] })] }) }), _jsx(Carousel.Item, { children: _jsxs("div", { className: "relative w-full h-[432px]", children: [_jsx("img", { src: ExampleCarouselImage, alt: "Third slide", className: "absolute inset-0 w-full h-full object-cover" }), _jsxs(Carousel.Caption, { className: "absolute bottom-0 left-0 right-0 p-4 bg-black/50", children: [_jsx("h3", { className: "text-2xl font-bold", children: "Third slide label" }), _jsx("p", { children: "Praesent commodo cursus magna, vel scelerisque nisl consectetur." })] })] }) })] }) }) }));
};
export default IndividualIntervalsExample;
