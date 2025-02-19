import React from "react";

const FooterElement = () =>{
    return (
        <div className="flex flex-col justify-between w-[1384px] h-[320px]">
            <div className="footer-info-items flex flex-row justify-between w-full h-[202px]">
                <div className="flex flex-col justify-between w-[167px] h-[202px]">
                    <h3 className="text-white text-[32px] font-light text-left font-libre">About Us</h3>
                    <div className="flex flex-col justify-center items-start">
                        <a href="/info/feedback" className="text-white hover:text-red-500 transition-colors duration-300 text-[21px] font-light font-libre">
                            Feedback
                        </a>
                    
                    
                        <a href="/info/disclaimer" className="text-[21px] font-light font-libre hover:text-red-500">
                            Disclaimer
                        </a>
                    
                    
                        <a href="/info/termsOfUse" className="text-white text-[21px] font-light font-libre hover:text-red-500">
                            Terms of Use
                        </a>
                    
                    
                        <a href="/info/websiteAccessibility" className="text-white text-[21px] font-light font-libre hover:text-red-500">
                            Accessibility
                        </a>
                    
                    
                        <a href="/info/contactUs" className="text-white text-[21px] font-light font-libre hover:text-red-500">
                            Contact Us
                        </a>
                    </div>
                </div>
                <div className="flex flex-col justify-between w-[746px] h-[202px]">
                    <h3 className="text-white text-[32px] font-light font-libre h-[32px]  text-left">POLICIES</h3>
                    <div className="flex flex-row justify-between w-[746px] h-[145px]">
                        <div className="flex flex-col justify-center items-start h-[145px] w-[203px]">
                            <a href="/info/privacyPolicy" className="text-white hover:text-red-500 transition-colors duration-300 text-[21px] font-light font-libre">
                                Privacy
                            </a>
                            <a href="/info/hyperlinkingPolicy" className="text-white hover:text-red-500 transition-colors duration-300 text-[21px] font-light font-libre">
                                Hyperlinking
                            </a>
                            <a href="/info/copyrightPolicy" className="text-white hover:text-red-500 transition-colors duration-300 text-[21px] font-light font-libre">
                                Copyright
                            </a>
                            <a href="/info/contentArchivalPolicy" className="text-white hover:text-red-500 transition-colors duration-300 text-[21px] font-light font-libre">
                                Content Archival
                            </a>
                            <a href="/info/websiteSecurityPolicy" className="text-white hover:text-red-500 transition-colors duration-300 text-[21px] font-light font-libre">
                                Website Security
                            </a>
                        </div>
                        <div className="flex flex-col justify-center items-start h-[145px] w-[518px]">
                            <a href="/info/websiteMonitoringPolicy" className="text-white hover:text-red-500 transition-colors duration-300 text-[21px] font-light font-libre">
                                Website Monitoring
                            </a>
                            <a href="/info/contentReviewPolicy" className="text-white hover:text-red-500 transition-colors duration-300 text-[21px] font-light font-libre">
                                Content Review
                            </a>
                            <a href="/info/websiteContingencyManagementPolicy" className="text-white hover:text-red-500 transition-colors duration-300 text-[21px] font-light font-libre">
                                Website Contingency Management
                            </a>
                            <a href="/info/contentContributionModerationApprovalPolicy" className="text-white hover:text-red-500 transition-colors duration-300 text-[21px] font-light text-left font-libre">
                                Content Contribution, Moderation & Approval (CMAP)
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between w-[167px] h-[202px]">
                <div className="flex flex-col justify-between items-start">
                    <h3 className="text-white text-[32px] font-libre font-light h-[32px] text-left">OTHERS</h3>
                    <div className="flex flex-col items-start justify-between">
                        <a href="/info/purchase" className="text-white hover:text-red-500 transition-colors duration-300 text-[21px] font-light font-libre">Purchase</a>
                        <a href="/info/sitemap" className="text-white hover:text-red-500 transition-colors duration-300 text-[21px] font-light font-libre">SiteMap</a>
                        <a href="/internalLogin" className="text-white hover:text-red-500 transition-colors duration-300 text-[21px] font-light font-libre">Internal Login</a>
                        <a href="/info/corporatemail" className="text-white hover:text-red-500 transition-colors duration-300 text-[21px] font-light font-libre">Corporate Mail</a>
                        <a href="/info/aboutus" className="text-white hover:text-red-500 transition-colors duration-300 text-[21px] font-light font-libre">Auction Hai</a>
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