import React, { useState } from 'react';

const SettingNavBarExpandingDiv = () => {
  // Define constants
  const initialWidth = 185;
  const expandedWidth = 620;
  const transitionDuration = 300; // Transition duration in milliseconds

  // State to manage hover behavior
  const [isHovered, setIsHovered] = useState(true);
  const [darkTheme,setDarkTheme] = useState(false);

  return (
    <div
      className={`h-[60px] mt-[25px] flex rounded-r-[50px] ${isHovered ? "ml-[20px] rounded-l-[50px]" : ""} bg-[#0A326D] relative overflow-hidden`}
      style={{
        width: isHovered ? expandedWidth : initialWidth, // Width changes based on hover
        transitionDuration: `${transitionDuration}ms`, // Smooth transition
      }}
      onMouseEnter={() => setIsHovered(true)}  // Set to true when mouse enters
      onMouseLeave={() => setIsHovered(false)}  // Set to false when mouse leaves
    >
      <div
        className="w-full h-full flex flex-row items-center justify-center space-x-2"
        style={{
          transform: isHovered ? 'translateX(-20px)' : 'translateX(0)', // Move the content left when hovered
          transitionDuration: `${transitionDuration}ms`, // Smooth transition for movement
        }}
      >
        {isHovered && 
        <>
            <div className='w-full flex flex-row items-center justify-between'>    
                <div className='w-full flex flex-row items-center justify-between rounded-[50px] border border-white border-[2px]' id='div-font-resizer'>
                    <div className='w-full'>
                        {/* <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1H15" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg> */}
                        +
                    </div>
                    <div className='w-full'>
                        <svg width="27" height="21" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.46946 18C1.39946 18 1.34346 17.972 1.30146 17.916C1.27346 17.86 1.27346 17.79 1.30146 17.706L6.78246 2.691C6.82446 2.593 6.87346 2.523 6.92946 2.481C6.98546 2.439 7.06246 2.418 7.16046 2.418H8.42046C8.65846 2.418 8.80546 2.509 8.86146 2.691L14.2795 17.706C14.3215 17.776 14.3215 17.846 14.2795 17.916C14.2375 17.972 14.1745 18 14.0905 18H13.0195C12.8515 18 12.7465 17.937 12.7045 17.811L11.1505 13.485C11.1365 13.429 11.1155 13.387 11.0875 13.359C11.0595 13.331 11.0035 13.317 10.9195 13.317H4.53546C4.42346 13.317 4.34646 13.373 4.30446 13.485L2.70846 17.832C2.69446 17.888 2.66646 17.93 2.62446 17.958C2.58246 17.986 2.51946 18 2.43546 18H1.46946ZM10.4575 12.036C10.6115 12.036 10.6605 11.959 10.6045 11.805L7.89546 4.35C7.83946 4.224 7.78346 4.161 7.72746 4.161C7.68546 4.161 7.63646 4.231 7.58046 4.371L4.82946 11.826C4.77346 11.966 4.80846 12.036 4.93446 12.036H10.4575ZM23.5577 16.593C23.0117 17.125 22.4237 17.531 21.7937 17.811C21.1637 18.077 20.4707 18.21 19.7147 18.21C18.6227 18.21 17.7617 17.937 17.1317 17.391C16.5017 16.831 16.1867 16.089 16.1867 15.165C16.1867 14.437 16.3897 13.814 16.7957 13.296C17.2017 12.764 17.8037 12.344 18.6017 12.036C19.3997 11.728 20.3867 11.532 21.5627 11.448L23.4317 11.301C23.5437 11.287 23.6277 11.259 23.6837 11.217C23.7537 11.161 23.7887 11.084 23.7887 10.986V10.377C23.7887 9.565 23.5297 8.921 23.0117 8.445C22.5077 7.969 21.8287 7.731 20.9747 7.731C20.3167 7.731 19.7217 7.885 19.1897 8.193C18.6577 8.487 18.1747 8.928 17.7407 9.516C17.6987 9.572 17.6567 9.614 17.6147 9.642C17.5867 9.656 17.5377 9.649 17.4677 9.621L16.6067 9.264C16.5647 9.236 16.5367 9.208 16.5227 9.18C16.5087 9.138 16.5297 9.075 16.5857 8.991C17.0197 8.291 17.6007 7.731 18.3287 7.311C19.0707 6.877 19.9737 6.66 21.0377 6.66C21.9197 6.66 22.6617 6.807 23.2637 7.101C23.8797 7.381 24.3417 7.794 24.6497 8.34C24.9717 8.886 25.1327 9.53 25.1327 10.272V17.727C25.1327 17.839 25.1117 17.916 25.0697 17.958C25.0417 17.986 24.9787 18 24.8807 18H24.1037C24.0197 18 23.9567 17.979 23.9147 17.937C23.8727 17.881 23.8517 17.811 23.8517 17.727L23.8097 16.635C23.7817 16.439 23.6977 16.425 23.5577 16.593ZM23.7887 12.561C23.7887 12.323 23.6907 12.218 23.4947 12.246L21.9197 12.372C21.1917 12.414 20.5547 12.505 20.0087 12.645C19.4767 12.785 19.0287 12.967 18.6647 13.191C18.3007 13.415 18.0277 13.681 17.8457 13.989C17.6637 14.283 17.5727 14.626 17.5727 15.018C17.5727 15.676 17.8037 16.194 18.2657 16.572C18.7277 16.936 19.3507 17.118 20.1347 17.118C20.6107 17.118 21.0727 17.034 21.5207 16.866C21.9687 16.684 22.3677 16.46 22.7177 16.194C23.0537 15.9 23.3127 15.599 23.4947 15.291C23.6907 14.983 23.7887 14.689 23.7887 14.409V12.561Z" fill="#FAFAFA"/>
                        </svg>
                    </div>
                    <div className='w-full'>
                        <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1H15" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div className='w-full flex flex-row items-center justify-between rounded-[50px] border border-white border-[2px] px-2' id='div-theme-change'>
                   <div>
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
                    <div>
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
                <div id='div-language-change'>

                </div>
            </div>
        </>
        }
        <p className="text-[21px] font-libre text-white mb-0">Settings</p>
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_205_252)">
            <path
              d="M12.9487 15C14.6056 15 15.9487 13.6569 15.9487 12C15.9487 10.3431 14.6056 9 12.9487 9C11.2919 9 9.94873 10.3431 9.94873 12C9.94873 13.6569 11.2919 15 12.9487 15Z"
              stroke="#FAFAFA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M"
              stroke="#FAFAFA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_205_252">
              <rect width="24" height="24" fill="white" transform="translate(0.94873)" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default SettingNavBarExpandingDiv;
