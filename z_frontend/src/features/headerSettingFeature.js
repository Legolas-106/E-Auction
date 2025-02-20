import React, { useState } from 'react';
import LanguageSelectSvg from "../public/icons/svgs/Frame 53.svg";
import { ChevronDown, ChevronUp } from 'lucide-react';

const SettingNavBarExpandingDiv = () => {
  // Define constants
  const initialWidth = 185;
  const expandedWidth = 620;
  const transitionDuration = 300; // Transition duration in milliseconds

  // State to manage hover behavior
  const [isHovered, setIsHovered] = useState(false);
  const [darkTheme,setDarkTheme] = useState(false);
  const [languageSelectionHovered,setLanguageSelectionHovered] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Eng");

  const languages = [
    { code: "en", label: "Eng" },
    { code: "es", label: "Spn" },
    { code: "fr", label: "Fre" },
    { code: "de", label: "Ger" },
  ];

  return (
    <div
      className={`h-[40px] mt-[10px] flex rounded-r-[50px] ${isHovered ? "ml-[20px] rounded-l-[50px] px-[46px]" : "pr-[20px] pl-[36px]"} bg-[#0A326D] z-50`}
      style={{
        // width: isHovered ? expandedWidth : initialWidth, // Width changes based on hover
        transitionDuration: `${transitionDuration}ms`, // Smooth transition
      }}
      onMouseEnter={() => setIsHovered(true)}  // Set to true when mouse enters
      onMouseLeave={() => setIsHovered(false)}  // Set to false when mouse leaves
    >
      <div
        className="w-full h-full flex flex-row items-center justify-center space-x-2"
        style={{
          transform: isHovered ? 'translateX(0)' : 'translateX(0)', // Move the content left when hovered
          transitionDuration: `${transitionDuration}ms`, // Smooth transition for movement
        }}
      >
        {isHovered && 
        <>
            <div className='w-full flex flex-row items-center justify-between gap-[20px] transition-all transition-300'>    
                <div className='w-full flex flex-row items-center justify-center gap-[17px] rounded-[50px] border-white border-[2px] px-[20px]' id='div-font-resizer'>
                    <button className='w-full h-full text-white hover:text-customOrange'>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                    <button className='w-full hover:text-customOrange h-full'>
                        <svg width="27" height="21" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.46946 18C1.39946 18 1.34346 17.972 1.30146 17.916C1.27346 17.86 1.27346 17.79 1.30146 17.706L6.78246 2.691C6.82446 2.593 6.87346 2.523 6.92946 2.481C6.98546 2.439 7.06246 2.418 7.16046 2.418H8.42046C8.65846 2.418 8.80546 2.509 8.86146 2.691L14.2795 17.706C14.3215 17.776 14.3215 17.846 14.2795 17.916C14.2375 17.972 14.1745 18 14.0905 18H13.0195C12.8515 18 12.7465 17.937 12.7045 17.811L11.1505 13.485C11.1365 13.429 11.1155 13.387 11.0875 13.359C11.0595 13.331 11.0035 13.317 10.9195 13.317H4.53546C4.42346 13.317 4.34646 13.373 4.30446 13.485L2.70846 17.832C2.69446 17.888 2.66646 17.93 2.62446 17.958C2.58246 17.986 2.51946 18 2.43546 18H1.46946ZM10.4575 12.036C10.6115 12.036 10.6605 11.959 10.6045 11.805L7.89546 4.35C7.83946 4.224 7.78346 4.161 7.72746 4.161C7.68546 4.161 7.63646 4.231 7.58046 4.371L4.82946 11.826C4.77346 11.966 4.80846 12.036 4.93446 12.036H10.4575ZM23.5577 16.593C23.0117 17.125 22.4237 17.531 21.7937 17.811C21.1637 18.077 20.4707 18.21 19.7147 18.21C18.6227 18.21 17.7617 17.937 17.1317 17.391C16.5017 16.831 16.1867 16.089 16.1867 15.165C16.1867 14.437 16.3897 13.814 16.7957 13.296C17.2017 12.764 17.8037 12.344 18.6017 12.036C19.3997 11.728 20.3867 11.532 21.5627 11.448L23.4317 11.301C23.5437 11.287 23.6277 11.259 23.6837 11.217C23.7537 11.161 23.7887 11.084 23.7887 10.986V10.377C23.7887 9.565 23.5297 8.921 23.0117 8.445C22.5077 7.969 21.8287 7.731 20.9747 7.731C20.3167 7.731 19.7217 7.885 19.1897 8.193C18.6577 8.487 18.1747 8.928 17.7407 9.516C17.6987 9.572 17.6567 9.614 17.6147 9.642C17.5867 9.656 17.5377 9.649 17.4677 9.621L16.6067 9.264C16.5647 9.236 16.5367 9.208 16.5227 9.18C16.5087 9.138 16.5297 9.075 16.5857 8.991C17.0197 8.291 17.6007 7.731 18.3287 7.311C19.0707 6.877 19.9737 6.66 21.0377 6.66C21.9197 6.66 22.6617 6.807 23.2637 7.101C23.8797 7.381 24.3417 7.794 24.6497 8.34C24.9717 8.886 25.1327 9.53 25.1327 10.272V17.727C25.1327 17.839 25.1117 17.916 25.0697 17.958C25.0417 17.986 24.9787 18 24.8807 18H24.1037C24.0197 18 23.9567 17.979 23.9147 17.937C23.8727 17.881 23.8517 17.811 23.8517 17.727L23.8097 16.635C23.7817 16.439 23.6977 16.425 23.5577 16.593ZM23.7887 12.561C23.7887 12.323 23.6907 12.218 23.4947 12.246L21.9197 12.372C21.1917 12.414 20.5547 12.505 20.0087 12.645C19.4767 12.785 19.0287 12.967 18.6647 13.191C18.3007 13.415 18.0277 13.681 17.8457 13.989C17.6637 14.283 17.5727 14.626 17.5727 15.018C17.5727 15.676 17.8037 16.194 18.2657 16.572C18.7277 16.936 19.3507 17.118 20.1347 17.118C20.6107 17.118 21.0727 17.034 21.5207 16.866C21.9687 16.684 22.3677 16.46 22.7177 16.194C23.0537 15.9 23.3127 15.599 23.4947 15.291C23.6907 14.983 23.7887 14.689 23.7887 14.409V12.561Z" fill="#FAFAFA"/>
                        </svg>
                    </button>
                    <button className='w-full h-full'>
                        <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1H15" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div className='w-full flex flex-row items-center justify-center gap-[10px] rounded-[50px] border-white border-[2px] px-[14px]' id='div-theme-change'>
                   <div onClick={()=>setDarkTheme(!darkTheme)}>
                            {darkTheme ? (
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="15" fill="#0B3258" stroke="#95C0EA" stroke-width="2"/>
                                </svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_185_651)">
                                    <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="#FFEB3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M12 1V3" stroke="#FFEB3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M12 21V23" stroke="#FFEB3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4.22021 4.22021L5.64021 5.64021" stroke="#FFEB3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M18.3599 18.3599L19.7799 19.7799" stroke="#FFEB3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M1 12H3" stroke="#FFEB3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M21 12H23" stroke="#FFEB3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4.22021 19.7799L5.64021 18.3599" stroke="#FFEB3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M18.3599 5.64021L19.7799 4.22021" stroke="#FFEB3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_185_651">
                                    <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                            ) }
                    </div>
                    <div onClick={()=>setDarkTheme(!darkTheme)}>
                            {darkTheme ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.9999 12.79C20.8426 14.4922 20.2038 16.1144 19.1581 17.4668C18.1125 18.8192 16.7034 19.8458 15.0956 20.4265C13.4878 21.0073 11.7479 21.1181 10.0794 20.7461C8.41092 20.3741 6.8829 19.5345 5.67413 18.3258C4.46536 17.117 3.62584 15.589 3.25381 13.9205C2.88178 12.252 2.99262 10.5121 3.57336 8.9043C4.15411 7.29651 5.18073 5.88737 6.53311 4.84175C7.8855 3.79614 9.5077 3.15731 11.2099 3C10.2133 4.34827 9.73375 6.00945 9.85843 7.68141C9.98312 9.35338 10.7038 10.9251 11.8893 12.1106C13.0748 13.2961 14.6465 14.0168 16.3185 14.1415C17.9905 14.2662 19.6516 13.7866 20.9999 12.79Z" fill="#0B3258" stroke="#B8D5F1" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            ) : (
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="15" fill="#FFF6AA" stroke="#FFEB3B" stroke-width="2"/>
                                </svg>
                            )}
                    </div>             
                </div>
                <div id='div-language-change' className='w-full items-center justify-center  px-[23px]'>
                        <div className={`relative w-full bg-white border flex flex-row items-center gap-[7px] justify-center border-gray-300 ${languageSelectionHovered ? "rounded-t-[50px]" : "rounded-[50px]" }  cursor-pointer`}
                          onMouseEnter={()=>setLanguageSelectionHovered(true)}
                          onMouseLeave={()=>setLanguageSelectionHovered(false)}
                          >
                            <div className='flex items-center justify-between px-1 py-1'>
                              <span>{selectedLanguage}</span>

                              {languageSelectionHovered ? <ChevronDown /> : <ChevronUp />}
                            </div>

                            {languageSelectionHovered && (
                              <ul className="absolute left-0 p-0 top-full w-full bg-white border border-gray-300 rounded-b-[50px] shadow-md">
                                {languages.map((lang) =>
                                  lang.label !== selectedLanguage && (
                                    <li
                                      key={lang.code}
                                      className="px-[20px] py-[10px] text-center text-black"
                                      onClick={() => setSelectedLanguage(lang.label)}
                                    >
                                      {lang.label}
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                        </div>
                </div>
            </div>
        </>
        }
        <p className="text-[21px] font-libre text-white mb-0">Settings</p>
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_185_601)">
        <path d="M12.9487 15C14.6056 15 15.9487 13.6569 15.9487 12C15.9487 10.3431 14.6056 9 12.9487 9C11.2919 9 9.94873 10.3431 9.94873 12C9.94873 13.6569 11.2919 15 12.9487 15Z" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11.2799 19.8074C10.9597 19.7287 10.6233 19.7477 10.3141 19.8619C10.0048 19.9762 9.73691 20.1805 9.54484 20.4484L9.49617 20.5179C9.34554 20.7333 9.15393 20.9169 8.9323 21.0582C8.71067 21.1995 8.46336 21.2957 8.20453 21.3413C7.94569 21.3869 7.68039 21.3811 7.42381 21.3242C7.16722 21.2672 6.92438 21.1602 6.70917 21.0094C6.49378 20.8587 6.3102 20.6671 6.16892 20.4455C6.02764 20.2239 5.93143 19.9765 5.88579 19.7177C5.84015 19.4589 5.84598 19.1936 5.90294 18.937C5.95989 18.6804 6.06687 18.4376 6.21774 18.2223L6.26641 18.1528C6.45252 17.8807 6.55284 17.5591 6.55443 17.2294C6.55603 16.8997 6.45883 16.5771 6.27536 16.3032C6.09916 16.0339 5.84807 15.8221 5.55301 15.6937C5.25794 15.5653 4.93177 15.526 4.61465 15.5806L4.44723 15.6101C3.92486 15.7022 3.38729 15.583 2.95278 15.2788C2.51828 14.9746 2.22243 14.5102 2.13032 13.9878C2.03821 13.4654 2.15739 12.9278 2.46163 12.4933C2.76588 12.0588 3.23027 11.763 3.75264 11.6709L3.84127 11.6552C4.16589 11.5901 4.46342 11.4289 4.69518 11.1924C4.92694 10.956 5.0822 10.6553 5.14079 10.3294C5.21951 10.0093 5.20052 9.67291 5.08626 9.36366C4.972 9.0544 4.76773 8.78647 4.49977 8.5944L4.43026 8.54573C4.21488 8.3951 4.0313 8.20349 3.89002 7.98186C3.74874 7.76023 3.65252 7.51292 3.60688 7.25409C3.56124 6.99525 3.56707 6.72995 3.62403 6.47337C3.68099 6.21678 3.78796 5.97394 3.93883 5.75873C4.08947 5.54334 4.28108 5.35976 4.50271 5.21848C4.72434 5.0772 4.97164 4.98099 5.23048 4.93535C5.48932 4.88971 5.75461 4.89554 6.0112 4.9525C6.26778 5.00945 6.51063 5.11643 6.72584 5.2673L6.79535 5.31597C7.06748 5.50208 7.38912 5.6024 7.7188 5.604C8.04848 5.60559 8.37108 5.50839 8.645 5.32492C8.91427 5.14872 9.12613 4.89764 9.25452 4.60257C9.38291 4.3075 9.42221 3.98133 9.3676 3.66421L9.33808 3.49679C9.24597 2.97442 9.36515 2.43685 9.66939 2.00234C9.97364 1.56784 10.438 1.27199 10.9604 1.17988C11.4828 1.08777 12.0203 1.20695 12.4548 1.51119C12.8894 1.81544 13.1852 2.27983 13.2773 2.8022L13.2929 2.89083C13.358 3.21545 13.5193 3.51298 13.7557 3.74474C13.9922 3.9765 14.2929 4.13176 14.6187 4.19035C14.9389 4.26907 15.2753 4.25008 15.5845 4.13582C15.8938 4.02156 16.1617 3.81729 16.3538 3.54933L16.4025 3.47982C16.5531 3.26444 16.7447 3.08086 16.9663 2.93958C17.188 2.7983 17.4353 2.70209 17.6941 2.65645C17.9529 2.6108 18.2182 2.61663 18.4748 2.67359C18.7314 2.73055 18.9742 2.83752 19.1895 2.98839C19.4048 3.13903 19.5884 3.33064 19.7297 3.55227C19.871 3.7739 19.9672 4.0212 20.0128 4.28004C20.0585 4.53888 20.0527 4.80417 19.9957 5.06076C19.9387 5.31734 19.8318 5.56019 19.6809 5.7754L19.6322 5.84491C19.4461 6.11704 19.3458 6.43868 19.3442 6.76836C19.3426 7.09804 19.4398 7.42064 19.6233 7.69456L19.6372 7.77335C19.8134 8.04261 20.0644 8.25448 20.3595 8.38286C20.6546 8.51125 20.9808 8.55056 21.2979 8.49595L21.4653 8.46643C21.9877 8.37432 22.5252 8.49349 22.9597 8.79774C23.3942 9.10198 23.6901 9.56637 23.7822 10.0887C23.8743 10.6111 23.7551 11.1487 23.4509 11.5832C23.1466 12.0177 22.6823 12.3135 22.1599 12.4057L22.0712 12.4213C21.7546 12.4784 21.4615 12.6269 21.2282 12.8485C20.9948 13.07 20.8313 13.355 20.7578 13.6683C20.6791 13.9885 20.6981 14.3248 20.8124 14.6341C20.9266 14.9433 21.1309 15.2113 21.3989 15.4033L21.4684 15.452C21.6838 15.6027 21.8673 15.7943 22.0086 16.0159C22.1499 16.2375 22.2461 16.4848 22.2917 16.7437C22.3374 17.0025 22.3316 17.2678 22.2746 17.5244C22.2176 17.781 22.1107 18.0238 21.9598 18.239C21.8092 18.4544 21.6176 18.638 21.3959 18.7793C21.1743 18.9205 20.927 19.0168 20.6681 19.0624C20.4093 19.108 20.144 19.1022 19.8874 19.0453C19.6308 18.9883 19.388 18.8813 19.1728 18.7304L19.1033 18.6818C18.8312 18.4957 18.5095 18.3953 18.1798 18.3938C17.8501 18.3922 17.5275 18.4894 17.2536 18.6728L17.1748 18.6867C16.9056 18.8629 16.6937 19.114 16.5653 19.4091C16.4369 19.7041 16.3976 20.0303 16.4522 20.3474L16.4818 20.5148C16.5739 21.0372 16.4547 21.5748 16.1505 22.0093C15.8462 22.4438 15.3818 22.7397 14.8594 22.8318C14.3371 22.9239 13.7995 22.8047 13.365 22.5004C12.9305 22.1962 12.6346 21.7318 12.5425 21.2094L12.5269 21.1208C12.4698 20.8041 12.3213 20.5111 12.0997 20.2777C11.8781 20.0444 11.5932 19.8809 11.2799 19.8074Z" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_185_601">
        <rect width="24" height="24" fill="white" transform="translate(0.94873)"/>
        </clipPath>
        </defs>
        </svg>
      </div>
    </div>
  );
};

export default SettingNavBarExpandingDiv;
