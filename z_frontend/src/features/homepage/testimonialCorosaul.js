import React, {useState, useEffect, useRef} from "react";
import SampleImage from '../../public/images/SignUpPage2.jpeg';

const TestimonialCorosaul = () => {

    const testimonials = [
        {
          name: "Sarah Johnson",
          text: "Asansol Durgapur Development Authority had initiated e-Auction of land using the NIC Portal from the year 2015 onwards as per provisions of Land Allotment Policy of Govt. of West Bengal vide order of L & LR Department vide no. 6686-LP/1A-18/2012 dated 26.12.2012 giving maximum possible publicity in leading newspapers, ADDA website, Outdoor hardings, Local Cable Channels, etc.. Over this period ADDA had successfully conducted e-auction of plots consisting of Industrial, Commercial, Institutional and Commercial Housing purposes generating good revenue.",
          image: "/api/placeholder/312/312"
        },
        {
          name: "Michael Chen",
          text: "I was impressed by the level of professionalism and expertise demonstrated throughout our collaboration. The team went above and beyond to ensure our needs were met, and the results exceeded our expectations. Their strategic insights helped us transform our approach to customer engagement.",
          image: "/api/placeholder/312/312"
        },
        {
          name: "Emily Rodriguez",
          text: "The innovative solutions provided by the team revolutionized our workflow. Their deep understanding of our industry challenges and commitment to excellence resulted in a partnership that continues to drive value for our organization. The impact on our business has been remarkable.",
          image: "/api/placeholder/312/312"
        },
        {
          name: "David Smith",
          text: "Outstanding service and exceptional results! The team's ability to understand our unique requirements and deliver customized solutions made all the difference. Their proactive approach and consistent communication throughout the project ensured we achieved our objectives on time.",
          image: "/api/placeholder/312/312"
        }
      ];
    
      const [currentIndex, setCurrentIndex] = useState(0);
    
      const handleChangeLeft = () => {
        setCurrentIndex((prevIndex) => 
          prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
      };
    
      const handleChangeRight = () => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      };
    
    const TestimonialCircles = () => {
        const currentTestimonial = testimonials[currentIndex];
        return (
          <div 
            className="relative"
            style={{
              width: '1066px',
              height: '801px',
              position: 'absolute',
              top: '30px',
              left: '148px'
            }}
          >
            {/* Large Circle (C1) */}
            <div 
              className="absolute border-black flex items-center justify-center"
              style={{
                width: '702px',
                height: '702px',
                top: '37px',
                left: '211px',
                borderWidth: '4px',
                borderRadius: '50%',
                borderStyle: 'solid'
              }}
            >

                <div className="testimonial-item-content flex flex-col w-[644px] bg-customOrange h-[644px] items-center justify-center" style={{
                    borderRadius : "322px"
                }}> 
                    <div className="testimonial-item-name absolute top-[126.5px] left-[100px] h-[441px] w-[493px] flex flex-col justify-between items-center">
                        <h3 className="w-[153px] h-[55px] font-bauhaus" style={{fontWeight:"300",fontSize:"55px",lineHeight:"55px",letterSpacing:"0",alignItems:"center",}}>
                            {currentTestimonial.name}
                        </h3>
                        <p 
                            className="testimonial-item-text w-[493px] h-[319px] text-libre" 
                            style={{
                                fontWeight: "500",
                                fontSize: "19px",
                                lineHeight: "29.26px",
                                letterSpacing: "0",
                                display: "flex",          // Enable flexbox
                                flexDirection: "column-reverse", // Reverse the flow
                                justifyContent: "flex-end",   // Align to the bottom
                                margin: 0,                   // Remove default margins
                                height: "319px",           // Ensure height is set (could also be inline)
                                overflow: "hidden"        // Handle overflow (hidden, auto, scroll)
                            }}
                            >
                            {currentTestimonial.text}
                        </p>
                    </div>
                </div>
            </div>

            {/* Small Circle (C2) */}
            <div 
                className="absolute border-white overflow-hidden"
                style={{
                    width: '312px',
                    height: '312px',
                    top: '-20px',
                    left: '64px',
                    borderWidth: '10px',
                    borderRadius: '50%',
                    borderStyle: 'solid',
                    backgroundColor: '',
                }}
                >
                <img src={SampleImage} className="w-full h-full object-cover" alt="Sample" />
            </div>

            <div className="absolute w-[95px] h-[140.18px] top-[372.69px] rotate-180 flex items-center justify-center bg-transparent" onClick={handleChangeLeft}>
                <div className="absolute w-[23.75px] h-[70.09px] top-[35.04px] rotate-180 flex items-center justify-center">
                    <svg width="29" height="75" viewBox="0 0 29 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.375 72.8189L2.625 37.7752L26.375 2.73145" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <div id="corosaul-right-arrow" className="absolute w-[95px] h-[140.18px] top-[372.69px] left-[971px] rotate-180 flex items-center justify-center bg-transparent" onClick={handleChangeRight}>
                <div className="absolute w-[23.75px] h-[70.09px] top-[35.04px] rotate-180 flex items-center justify-center">
                    <svg width="29" height="75" viewBox="0 0 29 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.625 72.8189L26.375 37.7752L2.625 2.73145" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
          </div>
        );
      };
    return (
        <section className="flex w-full flex-col justify-center items-center gap-[10px] px-6 h-[871px]">
            <p className='text-left font-libre text-[42px] w-full flex items-center'>
                What they say
                <span className="ml-2 w-[544px] h-[42px] flex items-center">
                    <svg
                        width="544"
                        height="10"
                        viewBox="0 0 544 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 5H534M534 5L524 0M534 5L524 10" stroke="black" strokeWidth="2" />
                    </svg>
                </span>
            </p>
            <div className="relative flex w-full h-full items-center justify-center">
            <TestimonialCircles />
            </div>
        </section>
    );
};



export default TestimonialCorosaul;

