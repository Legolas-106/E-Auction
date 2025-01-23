import React,{useState, useRef, useEffect} from "react";
import LoginPageImage from '../../public/images/SignUpPage1.jpeg';
import { authService } from "../../services/authServices";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: ''
    });
    const [errors, setErrors] = useState({});

    const inputRef = useRef(null);
    const navigate = useNavigate();

    const navigateTo = (path) =>{
      if(path == 'forgot-password'){
        return navigate('../forgot-pass');
      }
      else if(path == 'signup-bidder'){
      return navigate('../signup/bidder');
      }
      else{
        return navigate('../signup/vendor')
      }
    }

    useEffect(()=>{
        if(inputRef.current){
            inputRef.current.scrollIntoView({
                behavior: 'smooth',        // Smooth scrolling
                block: 'center',           // Align the element vertically in the center
                inline: 'center',  
            })}
    });
  
    const validateForm = () => {
      const newErrors = {};
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (validateForm()) {
        try {
          const credentials = { ...formData };
          const response = isLogin
            ? await authService.login(credentials)
            : await authService.signup(credentials);
          if (response.token) {
            localStorage.setItem('authToken', response.token);
            window.location.href = '/dashboard';
          }
        } catch (error) {
          setErrors(prev => ({
            ...prev,
            submit: error.message
          }));
        }
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    };
  
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto h-screen">
          <div className="flex justify-center items-center h-full">
            {/* Left side with image */}
            <div className="hidden lg:block lg:w-1/2">
              <img
                src={LoginPageImage}
                alt="Login illustration"
                className="w-full h-auto"
              />
            </div>
  
            {/* Right side with form */}
            <div className="w-full lg:w-1/2 px-8 lg:px-12">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
                {/* Social login buttons */}
                {/* <div className="text-center mb-8">
                  <p className="text-lg text-gray-700 mb-4">Sign in with</p>
                  <div className="flex justify-center space-x-4">
                    <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700">
                      <i className="fab fa-facebook-f"></i>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500">
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800">
                      <i className="fab fa-linkedin-in"></i>
                    </button>
                  </div>
                </div>
  
                <div className="relative flex items-center justify-center mb-8">
                  <div className="border-t border-gray-300 w-full"></div>
                  <span className="bg-white px-4 text-gray-500 text-sm">Or</span>
                </div> */}
                <div className='pb-5'> 
                  <h2>Welcome, Please Log In</h2>
                </div>
  
                <form onSubmit={handleSubmit}>
                  {errors.submit && (
                    <div className="mb-4 text-red-500 text-sm text-center">
                      {errors.submit}
                    </div>
                  )}
  
                  {/* Email input */}
                  <div className="mb-6">
                    <input
                        ref={inputRef}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                      placeholder="Enter a valid email address"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
  
                  {/* Password input */}
                  <div className="mb-6">
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                        placeholder="Enter password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {showPassword ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          )}
                        </svg>
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>
  
                  {/* Remember me and Forgot password */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                        Remember me
                      </label>
                    </div>
                    <a href="#!" className="text-sm text-blue-600 hover:text-blue-800">
                      Forgot password?
                    </a>
                  </div>
  
                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {isLogin ? 'Login' : 'Sign Up'}
                  </button>
  
                  {/* Register link */}
                  <p className="text-center mt-4 text-sm">
                    Don't have an account?{' '}
                  </p>
                  <div className="w-full flex flex-row items-center">
                    <div className="w-1/2">
                    <button
                        type="button"
                        onClick={() => {
                          setIsLogin(!isLogin);
                          navigateTo("signup-bidder");
                        }}

                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Bidder Registration
                      </button>
                    </div>
                    <div className="w-1/2">
                        <button type="button" onClick={()=>{setIsLogin(!isLogin);navigateTo("signup-vendor")}} className="text-green-600 hover:text-green-900 font-medium">
                          Vendor Registration
                        </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default LoginPage;