import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, UserCircle2 } from 'lucide-react';
import SettingNavBarExpandingDiv from './headerSettingFeature';

const StickyHeader = ({ LogoImage, MenuItemsNav, SearchBarNav }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100 && !isSticky) {
        setIsTransitioning(true);
        setTimeout(() => {
          setIsSticky(true);
          setIsTransitioning(false);
        }, 300);
      } else if (currentScrollY <= 100 && isSticky) {
        setIsTransitioning(true);
        setTimeout(() => {
          setIsSticky(false);
          setIsTransitioning(false);
        }, 300);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSticky]);

  const handleAuctionTableScroll = (e) => {
    e.preventDefault();
    const target = document.querySelector("#auction-table");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
  
      // Apply a slight bounce effect using CSS animation
      setTimeout(() => {
        target.classList.add("animate-bounce");
        setTimeout(() => {
          target.classList.remove("animate-bounce");
        }, 600); // Remove after bounce animation
      }, 500); // Start bounce after scroll
    }
  };

  return (
    <>
      {/* Original Header */}
      <div className='w-full flex items-center flex-col justify-center gap-[10px]'>
        <div className='w-full h-full flex flex-row justify-between'>
            {/* <div className='w-[185px] h-[60px] mt-[25px] flex justify-start rounded-r-[50px] bg-[#0A326D]'>
                <div className='w-full h-full flex flex-row items-center justify-center space-x-2'>
                    <p className='text-[21px] font-libre text-white mb-0'>Settings</p>
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_205_252)">
                        <path d="M12.9487 15C14.6056 15 15.9487 13.6569 15.9487 12C15.9487 10.3431 14.6056 9 12.9487 9C11.2919 9 9.94873 10.3431 9.94873 12C9.94873 13.6569 11.2919 15 12.9487 15Z" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M20.3487 15C20.2156 15.3016 20.1759 15.6362 20.2347 15.9606C20.2935 16.285 20.4482 16.5843 20.6787 16.82L20.7387 16.88C20.9247 17.0657 21.0722 17.2863 21.1728 17.5291C21.2735 17.7719 21.3253 18.0322 21.3253 18.295C21.3253 18.5578 21.2735 18.8181 21.1728 19.0609C21.0722 19.3037 20.9247 19.5243 20.7387 19.71C20.553 19.896 20.3324 20.0435 20.0896 20.1441C19.8468 20.2448 19.5866 20.2966 19.3237 20.2966C19.0609 20.2966 18.8006 20.2448 18.5578 20.1441C18.3151 20.0435 18.0945 19.896 17.9087 19.71L17.8487 19.65C17.6131 19.4195 17.3137 19.2648 16.9893 19.206C16.6649 19.1472 16.3303 19.1869 16.0287 19.32C15.733 19.4468 15.4807 19.6572 15.303 19.9255C15.1254 20.1938 15.03 20.5082 15.0287 20.83V21C15.0287 21.5304 14.818 22.0391 14.4429 22.4142C14.0679 22.7893 13.5592 23 13.0287 23C12.4983 23 11.9896 22.7893 11.6145 22.4142C11.2394 22.0391 11.0287 21.5304 11.0287 21V20.91C11.021 20.579 10.9138 20.258 10.7212 19.9887C10.5286 19.7194 10.2595 19.5143 9.94873 19.4C9.64711 19.2669 9.31254 19.2272 8.98814 19.286C8.66375 19.3448 8.36441 19.4995 8.12873 19.73L8.06873 19.79C7.88298 19.976 7.66241 20.1235 7.41961 20.2241C7.17681 20.3248 6.91656 20.3766 6.65373 20.3766C6.3909 20.3766 6.13065 20.3248 5.88785 20.2241C5.64505 20.1235 5.42448 19.976 5.23873 19.79C5.05278 19.6043 4.90526 19.3837 4.80461 19.1409C4.70396 18.8981 4.65216 18.6378 4.65216 18.375C4.65216 18.1122 4.70396 17.8519 4.80461 17.6091C4.90526 17.3663 5.05278 17.1457 5.23873 16.96L5.29873 16.9C5.52927 16.6643 5.68392 16.365 5.74273 16.0406C5.80155 15.7162 5.76185 15.3816 5.62873 15.08C5.50197 14.7842 5.29149 14.532 5.0232 14.3543C4.75491 14.1766 4.44052 14.0813 4.11873 14.08H3.94873C3.4183 14.08 2.90959 13.8693 2.53452 13.4942C2.15944 13.1191 1.94873 12.6104 1.94873 12.08C1.94873 11.5496 2.15944 11.0409 2.53452 10.6658C2.90959 10.2907 3.4183 10.08 3.94873 10.08H4.03873C4.36972 10.0723 4.69074 9.96512 4.96003 9.77251C5.22932 9.5799 5.43445 9.31074 5.54873 9C5.68185 8.69838 5.72155 8.36381 5.66273 8.03941C5.60392 7.71502 5.44927 7.41568 5.21873 7.18L5.15873 7.12C4.97278 6.93425 4.82526 6.71368 4.72461 6.47088C4.62396 6.22808 4.57216 5.96783 4.57216 5.705C4.57216 5.44217 4.62396 5.18192 4.72461 4.93912C4.82526 4.69632 4.97278 4.47575 5.15873 4.29C5.34448 4.10405 5.56505 3.95653 5.80785 3.85588C6.05065 3.75523 6.3109 3.70343 6.57373 3.70343C6.83656 3.70343 7.09681 3.75523 7.33961 3.85588C7.58241 3.95653 7.80298 4.10405 7.98873 4.29L8.04873 4.35C8.28441 4.58054 8.58375 4.73519 8.90814 4.794C9.23254 4.85282 9.56711 4.81312 9.86873 4.68H9.94873C10.2445 4.55324 10.4967 4.34276 10.6744 4.07447C10.8521 3.80618 10.9474 3.49179 10.9487 3.17V3C10.9487 2.46957 11.1594 1.96086 11.5345 1.58579C11.9096 1.21071 12.4183 1 12.9487 1C13.4792 1 13.9879 1.21071 14.3629 1.58579C14.738 1.96086 14.9487 2.46957 14.9487 3V3.09C14.95 3.41179 15.0454 3.72618 15.223 3.99447C15.4007 4.26276 15.653 4.47324 15.9487 4.6C16.2503 4.73312 16.5849 4.77282 16.9093 4.714C17.2337 4.65519 17.5331 4.50054 17.7687 4.27L17.8287 4.21C18.0145 4.02405 18.2351 3.87653 18.4778 3.77588C18.7206 3.67523 18.9809 3.62343 19.2437 3.62343C19.5066 3.62343 19.7668 3.67523 20.0096 3.77588C20.2524 3.87653 20.473 4.02405 20.6587 4.21C20.8447 4.39575 20.9922 4.61632 21.0928 4.85912C21.1935 5.10192 21.2453 5.36217 21.2453 5.625C21.2453 5.88783 21.1935 6.14808 21.0928 6.39088C20.9922 6.63368 20.8447 6.85425 20.6587 7.04L20.5987 7.1C20.3682 7.33568 20.2135 7.63502 20.1547 7.95941C20.0959 8.28381 20.1356 8.61838 20.2687 8.92V9C20.3955 9.29577 20.606 9.54802 20.8743 9.72569C21.1426 9.90337 21.4569 9.99872 21.7787 10H21.9487C22.4792 10 22.9879 10.2107 23.3629 10.5858C23.738 10.9609 23.9487 11.4696 23.9487 12C23.9487 12.5304 23.738 13.0391 23.3629 13.4142C22.9879 13.7893 22.4792 14 21.9487 14H21.8587C21.5369 14.0013 21.2226 14.0966 20.9543 14.2743C20.686 14.452 20.4755 14.7042 20.3487 15Z" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_205_252">
                          <rect width="24" height="24" fill="white" transform="translate(0.94873)"/>
                        </clipPath>
                      </defs>
                    </svg>

                </div>
            </div> */}
            < SettingNavBarExpandingDiv />
            <a
              href="#auction-table"
              onClick={handleAuctionTableScroll}
              className="flex flex-row items-center justify-center rounded-l-[50px] bg-[#0A326D] w-[200px] mt-[10px] cursor-pointer no-underline"
            >
              <span className="text-white pt-1"> <ChevronDown /> </span>
              <span className="text-[16px] font-libre text-white"> Skip To Main Content </span>
            </a>
        </div>
        <header 
            ref={headerRef}
            className={`
            transition-all duration-300 ease-in-out w-full flex justify-center
            ${isSticky ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}
            ${isTransitioning ? 'pointer-events-none' : ''}
            `}
        >
            <div className="custom-header">
            <div className="w-full flex flex-row justify-between h-[55px] pl-[15px] py-2">
                <div className="flex w-[130px] justify-between">
                <div className="flex space-x-4">
                    <svg width="14" height="28" viewBox="0 0 14 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.5498 28V15.4H13.3752L14 9.8H9.5498V7.07246C9.5498 5.63046 9.58665 4.2 11.6017 4.2H13.6426V0.196191C13.6426 0.135991 11.8895 0 10.1159 0C6.41199 0 4.09276 2.32007 4.09276 6.58027V9.8H0V15.4H4.09276V28H9.5498Z" fill="#3B5B8A"/>
                    </svg>
                    <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.0495 0.344482H26.3451L16.9631 11.065L28 25.6552H19.3603L12.5884 16.8086L4.8492 25.6552H0.547588L10.5806 14.1863L0 0.344482H8.85876L14.9735 8.43053L22.0495 0.344482ZM20.5406 23.0876H22.9196L7.5628 2.77821H5.00739L20.5406 23.0876Z" fill="#0B0B0B"/>
                    </svg>
                    <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 7.79834C12.5782 7.79834 11.1884 8.21996 10.0063 9.00983C8.82418 9.7997 7.90281 10.9224 7.35873 12.2359C6.81465 13.5495 6.6723 14.9949 6.94967 16.3893C7.22702 17.7837 7.91166 19.0646 8.917 20.0699C9.92231 21.0751 11.2031 21.7598 12.5975 22.0371C13.9921 22.3145 15.4373 22.1721 16.7509 21.6281C18.0645 21.084 19.1871 20.1627 19.977 18.9806C20.767 17.7984 21.1885 16.4085 21.1885 14.9868C21.1908 14.0421 21.0065 13.1064 20.646 12.2333C20.2855 11.36 19.7562 10.5666 19.0882 9.89866C18.4202 9.23067 17.6268 8.70127 16.7537 8.34083C15.8804 7.9804 14.9447 7.79605 14 7.79834ZM14 19.6681C13.0741 19.6681 12.169 19.3935 11.3992 18.8791C10.6295 18.3649 10.0294 17.6337 9.67508 16.7783C9.32076 15.9229 9.22807 14.9817 9.40869 14.0735C9.58931 13.1655 10.0352 12.3313 10.6898 11.6766C11.3445 11.022 12.1787 10.5761 13.0867 10.3955C13.9949 10.2149 14.9361 10.3076 15.7915 10.6619C16.6469 11.0162 17.3781 11.6163 17.8923 12.386C18.4067 13.1558 18.6813 14.0609 18.6813 14.9868C18.6813 16.2283 18.1881 17.4191 17.3102 18.297C16.4323 19.1749 15.2415 19.6681 14 19.6681ZM23.1697 7.50028C23.1697 7.84707 23.0669 8.18605 22.8743 8.47436C22.6816 8.76269 22.4077 8.98742 22.0874 9.12011C21.7671 9.25282 21.4145 9.28753 21.0743 9.21989C20.7342 9.15223 20.4219 8.98525 20.1766 8.74005C19.9315 8.49485 19.7645 8.18245 19.6968 7.84235C19.6291 7.50223 19.6638 7.14971 19.7965 6.82934C19.9293 6.50897 20.154 6.23515 20.4423 6.04249C20.7307 5.84983 21.0696 5.74699 21.4164 5.74699C21.8814 5.74699 22.3274 5.93172 22.6561 6.26053C22.9851 6.58933 23.1697 7.03529 23.1697 7.50028ZM27.9211 9.25357C27.9721 7.07394 27.1591 4.96257 25.6594 3.38006C24.0853 1.86116 21.9729 1.02883 19.7858 1.06571C17.5066 0.960517 10.4934 0.960517 8.21416 1.06571C6.03519 1.01853 3.92523 1.83104 2.34064 3.32746C0.840947 4.90997 0.0279123 7.02134 0.078898 9.20097C-0.0262993 11.4802 -0.0262993 18.4934 0.078898 20.7727C0.0279123 22.9523 0.840947 25.0637 2.34064 26.6462C3.92523 28.1426 6.03519 28.9551 8.21416 28.9079C10.5285 29.0482 17.4715 29.0482 19.7858 28.9079C21.9655 28.9589 24.0768 28.1459 25.6594 26.6462C27.1591 25.0637 27.9721 22.9523 27.9211 20.7727C28.0263 18.4934 28.0263 11.4802 27.9211 9.20097V9.25357ZM24.9405 23.2799C24.7024 23.883 24.3432 24.4305 23.8847 24.889C23.4262 25.3475 22.8786 25.7068 22.2755 25.9449C19.5537 26.4952 16.7712 26.6839 14 26.5059C11.2347 26.684 8.45788 26.4954 5.74202 25.9449C5.13901 25.7068 4.5913 25.3475 4.13289 24.889C3.67445 24.4305 3.31508 23.883 3.07702 23.2799C2.34064 21.4214 2.49844 17.0382 2.49844 15.0043C2.49844 12.9705 2.34064 8.56979 3.07702 6.72884C3.30837 6.11987 3.66518 5.56635 4.1243 5.1042C4.58341 4.64207 5.13458 4.28163 5.74202 4.0463C8.45788 3.49574 11.2347 3.30708 14 3.48525C16.7712 3.30738 19.5537 3.49603 22.2755 4.0463C22.8786 4.28437 23.4262 4.64374 23.8847 5.10217C24.3432 5.56059 24.7024 6.1083 24.9405 6.7113C25.6769 8.56979 25.5016 12.953 25.5016 14.9868C25.5016 17.0206 25.6769 21.4214 24.9405 23.2623V23.2799Z" fill="#FE8D39"/>
                    </svg>
                </div>
                </div>
                <div className="flex w-[58px] h-full items-center justify-center">
                <img className="object-cover" src={LogoImage} alt="Logo" />
                </div>
                <div className="flex flex-row w-[288px]" id="div-lan-them-utility-bar">
                  <div className="w-full rounded-[50px] border-[1px] border-customOrange flex items-center justify-center cursor-pointer">
                    <Link to="/auth/login" className="text-[19px] font-[300] font-libre text-[#0B0B0B] no-underline w-full h-full flex items-center justify-center">
                      Login
                    </Link>
                  </div>

                  <div className="w-full flex items-center justify-center rounded-[50px] bg-black cursor-pointer">
                    <Link to="/auth/signup" className="text-[19px] font-[300] font-libre text-white no-underline w-full h-full flex items-center justify-center">
                      SignUp
                    </Link>
                  </div>
                </div>
            </div>
            <div id="div-menu" className="w-full flex flex-row justify-between">
                <MenuItemsNav />
                <div className="w-full flex justify-end">
                <SearchBarNav />
                </div>
            </div>
            </div>
        </header>
      </div>

      {/* Sticky Header */}
      <header 
        className={`
          fixed top-0 left-0 w-full z-50 my-2 bg-transparent opacity-0
          transition-all duration-300 ease-in-out
          ${isSticky ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
          ${isTransitioning ? 'pointer-events-none' : ''}
          bg-white shadow-md
        `}
      >
        <div className="max-w-full bg-[#8F8F8F] mx-[40px] rounded-[50px] items-center px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 pt-2">
                <img className="h-8 w-auto" src={LogoImage} alt="Logo" />
                <span className="font-libre text-md">
                  <span className="font-semibold text-black">Auction</span>
                  <span className="font-semibold text-customOrange">HAI</span>
                </span>
              </div>
              <div className="transition-transform duration-300 ease-in-out">
                <MenuItemsNav />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="transition-transform duration-300 ease-in-out">
                <SearchBarNav />
              </div>
              <UserCircle2 className="w-6 h-6 text-gray-600 cursor-pointer hover:text-customOrange transition-colors" />
            </div>
          </div>
        </div>
      </header>

      {/* Spacer div to prevent content jump */}
      <div className={`h-16 transition-all duration-300 ${isSticky ? 'opacity-100' : 'opacity-0 h-0'}`} />
    </>
  );
};

export default StickyHeader;



