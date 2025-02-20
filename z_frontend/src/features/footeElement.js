import React from "react";

const FooterElement = () =>{
    return (
        <div className="flex flex-col justify-between w-full h-[320px]">
            <div className="footer-info-items flex flex-row justify-between w-full h-[202px]">
                <div className="flex flex-col justify-between w-[167px] h-[202px]">
                    <h3 className="text-white text-[21px] font-light text-left font-libre">About Us</h3>
                    <div className="flex flex-col justify-center items-start">
                        <a href="/info/feedback" className="text-white hover:text-red-500 transition-colors duration-300 text-[19px] font-light font-libre">
                            Feedback
                        </a>
                    
                    
                        <a href="/info/disclaimer" className="text-[19px] font-light font-libre hover:text-red-500">
                            Disclaimer
                        </a>
                    
                    
                        <a href="/info/termsOfUse" className="text-white text-[19px] font-light font-libre hover:text-red-500">
                            Terms of Use
                        </a>
                    
                    
                        <a href="/info/websiteAccessibility" className="text-white text-[19px] font-light font-libre hover:text-red-500">
                            Accessibility
                        </a>
                    
                    
                        <a href="/info/contactUs" className="text-white text-[19px] font-light font-libre hover:text-red-500">
                            Contact Us
                        </a>
                    </div>
                </div>
                <div className="flex flex-col justify-between w-[746px] h-[202px]">
                    <h3 className="text-white text-[21px] font-light font-libre h-[32px]  text-left">POLICIES</h3>
                    <div className="flex flex-row justify-between w-[746px] h-[145px]">
                        <div className="flex flex-col justify-center items-start h-[145px] w-[203px]">
                            <a href="/info/privacyPolicy" className="text-white hover:text-red-500 transition-colors duration-300 text-[19px] font-light font-libre">
                                Privacy
                            </a>
                            <a href="/info/hyperlinkingPolicy" className="text-white hover:text-red-500 transition-colors duration-300 text-[19px] font-light font-libre">
                                Hyperlinking
                            </a>
                            <a href="/info/copyrightPolicy" className="text-white hover:text-red-500 transition-colors duration-300 text-[19px] font-light font-libre">
                                Copyright
                            </a>
                            <a href="/info/contentArchivalPolicy" className="text-white hover:text-red-500 transition-colors duration-300 text-[19px] font-light font-libre">
                                Content Archival
                            </a>
                            <a href="/info/websiteSecurityPolicy" className="text-white hover:text-red-500 transition-colors duration-300 text-[19px] font-light font-libre">
                                Website Security
                            </a>
                        </div>
                        <div className="flex flex-col justify-center items-start h-[145px] w-[518px]">
                            <a href="/info/websiteMonitoringPolicy" className="text-white hover:text-red-500 transition-colors duration-300 text-[19px] font-light font-libre">
                                Website Monitoring
                            </a>
                            <a href="/info/contentReviewPolicy" className="text-white hover:text-red-500 transition-colors duration-300 text-[19px] font-light font-libre">
                                Content Review
                            </a>
                            <a href="/info/websiteContingencyManagementPolicy" className="text-white hover:text-red-500 transition-colors duration-300 text-[19px] font-light font-libre">
                                Website Contingency Management
                            </a>
                            <a href="/info/contentContributionModerationApprovalPolicy" className="text-white hover:text-red-500 transition-colors duration-300 text-[19px] font-light text-left font-libre">
                                Content Contribution, Moderation & Approval (CMAP)
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between w-[167px] h-[202px]">
                    <div className="flex flex-col justify-between items-start">
                        <h3 className="text-white text-[21px] font-libre font-light h-[32px] text-left">OTHERS</h3>
                        <div className="flex flex-col items-start justify-between">
                            <a href="/info/purchase" className="text-white hover:text-red-500 transition-colors duration-300 text-[19px] font-light font-libre">Purchase</a>
                            <a href="/info/sitemap" className="text-white hover:text-red-500 transition-colors duration-300 text-[19px] font-light font-libre">SiteMap</a>
                            <a href="/internalLogin" className="text-white hover:text-red-500 transition-colors duration-300 text-[19px] font-light font-libre">Internal Login</a>
                            <a href="/info/corporatemail" className="text-white hover:text-red-500 transition-colors duration-300 text-[19px] font-light font-libre">Corporate Mail</a>
                            <a href="/info/aboutus" className="text-white hover:text-red-500 transition-colors duration-300 text-[19px] font-light font-libre">Auction Hai</a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col h-[85px] gap-[25px]">   
                        <h4 className="font-libre text-nowrap text-[21px] font-[300] h-[21px] text-left text-white mb-0">Sign up to our Newsletter</h4>
                        <div className="flex flex-row items-center gap-[10px] w-[324px] h-[39px]">
                            <input type="text" className="text-[14px] px-2 font-libre rounded-[50px] w-[217px] h-[39px]" placeholder="E-mail/Phone Number"/>
                            <button className="rounded-[50px] text-black bg-white w-full h-full font-libre">Subscribe</button>
                        </div>
                    </div>
                    <div className="flex items-end justify-end h-[96px]">
                        <div className="flex flex-row gap-[30px] items-center">
                            <div>
                                <svg width="14" height="29" viewBox="0 0 14 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5498 28.9868V16.3868H13.3752L14 10.7868H9.5498V8.05931C9.5498 6.61731 9.58665 5.18685 11.6017 5.18685H13.6426V1.18304C13.6426 1.12284 11.8895 0.986847 10.1159 0.986847C6.41199 0.986847 4.09276 3.30692 4.09276 7.56712V10.7868H0V16.3868H4.09276V28.9868H9.5498Z" fill="#FAFAFA"/>
                                </svg>
                            </div>
                            <div>
                                <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.0495 0.331482H26.3451L16.9631 11.052L28 25.6422H19.3603L12.5884 16.7956L4.8492 25.6422H0.547588L10.5806 14.1733L0 0.331482H8.85876L14.9735 8.41753L22.0495 0.331482ZM20.5406 23.0746H22.9196L7.5628 2.76521H5.00739L20.5406 23.0746Z" fill="#FAFAFA"/>
                                </svg>
                            </div>
                            <div>
                                <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 7.78522C12.5782 7.78522 11.1884 8.20683 10.0063 8.99671C8.82418 9.78658 7.90281 10.9093 7.35873 12.2228C6.81465 13.5363 6.6723 14.9818 6.94967 16.3761C7.22702 17.7705 7.91166 19.0515 8.917 20.0568C9.92231 21.062 11.2031 21.7466 12.5975 22.024C13.9921 22.3014 15.4373 22.159 16.7509 21.615C18.0645 21.0709 19.1871 20.1496 19.977 18.9675C20.767 17.7853 21.1885 16.3954 21.1885 14.9737C21.1908 14.029 21.0065 13.0933 20.646 12.2201C20.2855 11.3469 19.7562 10.5535 19.0882 9.88554C18.4202 9.21755 17.6268 8.68815 16.7537 8.32771C15.8804 7.96728 14.9447 7.78292 14 7.78522ZM14 19.655C13.0741 19.655 12.169 19.3804 11.3992 18.866C10.6295 18.3517 10.0294 17.6206 9.67508 16.7652C9.32076 15.9098 9.22807 14.9686 9.40869 14.0604C9.58931 13.1524 10.0352 12.3182 10.6898 11.6635C11.3445 11.0089 12.1787 10.563 13.0867 10.3824C13.9949 10.2018 14.9361 10.2945 15.7915 10.6488C16.6469 11.0031 17.3781 11.6032 17.8923 12.3729C18.4067 13.1427 18.6813 14.0478 18.6813 14.9737C18.6813 16.2152 18.1881 17.406 17.3102 18.2839C16.4323 19.1618 15.2415 19.655 14 19.655ZM23.1697 7.48716C23.1697 7.83394 23.0669 8.17292 22.8743 8.46123C22.6816 8.74956 22.4077 8.9743 22.0874 9.10699C21.7671 9.23969 21.4145 9.27441 21.0743 9.20677C20.7342 9.13911 20.4219 8.97213 20.1766 8.72693C19.9315 8.48173 19.7645 8.16933 19.6968 7.82923C19.6291 7.48911 19.6638 7.13659 19.7965 6.81621C19.9293 6.49585 20.154 6.22202 20.4423 6.02937C20.7307 5.8367 21.0696 5.73387 21.4164 5.73387C21.8814 5.73387 22.3274 5.9186 22.6561 6.24741C22.9851 6.5762 23.1697 7.02217 23.1697 7.48716ZM27.9211 9.24045C27.9721 7.06081 27.1591 4.94945 25.6594 3.36693C24.0853 1.84804 21.9729 1.0157 19.7858 1.05259C17.5066 0.947395 10.4934 0.947395 8.21416 1.05259C6.03519 1.00541 3.92523 1.81792 2.34064 3.31433C0.840947 4.89685 0.0279123 7.00822 0.078898 9.18785C-0.0262993 11.4671 -0.0262993 18.4803 0.078898 20.7595C0.0279123 22.9392 0.840947 25.0505 2.34064 26.6331C3.92523 28.1295 6.03519 28.942 8.21416 28.8948C10.5285 29.0351 17.4715 29.0351 19.7858 28.8948C21.9655 28.9458 24.0768 28.1328 25.6594 26.6331C27.1591 25.0505 27.9721 22.9392 27.9211 20.7595C28.0263 18.4803 28.0263 11.4671 27.9211 9.18785V9.24045ZM24.9405 23.2667C24.7024 23.8699 24.3432 24.4174 23.8847 24.8759C23.4262 25.3344 22.8786 25.6936 22.2755 25.9317C19.5537 26.4821 16.7712 26.6707 14 26.4928C11.2347 26.6709 8.45788 26.4823 5.74202 25.9317C5.13901 25.6936 4.5913 25.3344 4.13289 24.8759C3.67445 24.4174 3.31508 23.8699 3.07702 23.2667C2.34064 21.4083 2.49844 17.025 2.49844 14.9912C2.49844 12.9574 2.34064 8.55667 3.07702 6.71571C3.30837 6.10674 3.66518 5.55323 4.1243 5.09108C4.58341 4.62895 5.13458 4.26851 5.74202 4.03318C8.45788 3.48261 11.2347 3.29396 14 3.47213C16.7712 3.29426 19.5537 3.48291 22.2755 4.03318C22.8786 4.27124 23.4262 4.63062 23.8847 5.08905C24.3432 5.54746 24.7024 6.09517 24.9405 6.69818C25.6769 8.55667 25.5016 12.9399 25.5016 14.9737C25.5016 17.0075 25.6769 21.4083 24.9405 23.2492V23.2667Z" fill="#FAFAFA"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    width: "1356.1065673828125px",
                    transform: "rotate(0deg)",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "#5C5C5C",
                }}
                ></div>

            <div className="w-[1384px] h-[32px] flex justify-center items-center">
                <p className="text-[32px] leading-[32px] font-light text-[#FAFAFA] text-center font-libre">
                    © 2025 Auction Portal. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default FooterElement;

{/* Footer Content */}
<div className="flex flex-row justify-between items-center w-[1384px] h-[202px] px-5 gap-[55px]">
{/* About Us */}
<div className="flex flex-col justify-center items-start w-[167px] h-[202px] gap-[25px]">
  <h2 className="text-white text-[32px] font-light">ABOUT US</h2>
  <div className="flex flex-col justify-center items-start gap-[10px]">
    <p className="text-white text-[21px] font-light">Feedback</p>
    <p className="text-white text-[21px] font-light">Disclaimer</p>
    <p className="text-white text-[21px] font-light">Terms of use</p>
    <p className="text-white text-[21px] font-light">Accessibility</p>
    <p className="text-white text-[21px] font-light">Contact</p>
  </div>
</div>

{/* Policies */}
<div className="flex flex-col justify-center items-start w-[746px] h-[202px] gap-[25px]">
  <h2 className="text-white text-[32px] font-light">POLICIES</h2>
  <div className="flex flex-row items-start w-[746px] h-[145px] gap-[25px]">
    <div className="flex flex-col justify-center items-start gap-[10px]">
      <p className="text-white text-[21px] font-light">Privacy</p>
      <p className="text-white text-[21px] font-light">Hyperlink</p>
      <p className="text-white text-[21px] font-light">Copyright</p>
      <p className="text-white text-[21px] font-light">Content Archival</p>
      <p className="text-white text-[21px] font-light">Website Security</p>
    </div>
    <div className="flex flex-col justify-center items-start gap-[10px]">
      <p className="text-white text-[21px] font-light">Website Monitoring</p>
      <p className="text-white text-[21px] font-light">Content Review</p>
      <p className="text-white text-[21px] font-light">Website Contingency Management</p>
      <p className="text-white text-[21px] font-light">CMAP</p>
    </div>
  </div>
</div>

{/* Others */}
<div className="flex flex-col justify-center items-start w-[146px] h-[202px] gap-[25px]">
  <h2 className="text-white text-[32px] font-light">OTHERS</h2>
  <div className="flex flex-col justify-center items-start gap-[10px]">
    <p className="text-white text-[21px] font-light">Additional Info</p>
    <p className="text-white text-[21px] font-light">More Links</p>
  </div>
</div>
</div>