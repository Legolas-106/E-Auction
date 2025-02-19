import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';

const CaptchaValidation = React.forwardRef((props,ref) => {
    const [captchaText, setCaptchaText] = useState('');
    const [userInput, setUserInput] = useState('');
    const canvasRef = useRef(null);

    useImperativeHandle(ref,()=>({
        handleCaptchaSubmit,
    }))

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        initializeCaptcha(ctx);
    }, []);

    const generateRandomChar = (min, max) =>
        String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min));

    const generateCaptchaText = () => {
        let captcha = '';
        for (let i = 0; i < 3; i++) {
            captcha += generateRandomChar(65, 90);
            captcha += generateRandomChar(97, 122);
            captcha += generateRandomChar(48, 57);
        }
        return captcha.split('').sort(() => Math.random() - 0.5).join('');
    };

    const drawCaptchaOnCanvas = (ctx, captcha) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)'];
        const letterSpace = 150 / captcha.length;
        for (let i = 0; i < captcha.length; i++) {
            const xInitialSpace = 25;
            ctx.font = '20px Roboto Mono';
            ctx.fillStyle = textColors[Math.floor(Math.random() * 2)];
            ctx.fillText(
                captcha[i],
                xInitialSpace + i * letterSpace,
                Math.floor(Math.random() * 16 + 25), // Randomize Y position
                100
            );
        }
    };

    const initializeCaptcha = (ctx) => {
        setUserInput('');
        const newCaptcha = generateCaptchaText();
        setCaptchaText(newCaptcha);
        drawCaptchaOnCanvas(ctx, newCaptcha);
    };

    const handleUserInputChange = (e) => setUserInput(e.target.value);

    const handleCaptchaSubmit = () => {
        if (userInput === captchaText) {
            return true;
        } else {
            alert('Incorrect Captcha');
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            initializeCaptcha(ctx);
            return false;
        }
    };

    return (
        <div className='flex w-1/2 h-full flex-row'>
            <div className="flex flex-col items-center">
                <h2 style={{ margin: '4px', fontSize: '20px', textAlign: 'center', color: 'black' }}>
                    Captcha
                </h2>
                <div className="wrapper flex">
                    <canvas ref={canvasRef} width="200" height="40" style={{ border: '2px solid gray', borderRadius: '10px',padding:'2px',margin:'2px' }} />
                </div>
                <button
                    className="reload-button my-2"
                    onClick={() => initializeCaptcha(canvasRef.current.getContext('2d'))}
                    style={{ fontSize: '15px', width: '4.6em', cursor: 'pointer', border: 'solid', borderRadius: '0.4em', color: 'black' }}
                >
                    Reload
                </button>
            </div>
            <div className='flex items-center px-4 pt-2 pb-4 w-full'>
                <input
                    type="text"
                    id="user-input"
                    placeholder="Enter the text in the image"
                    value={userInput}
                    className="user-input w-full"
                    onChange={handleUserInputChange}
                    style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem', padding: '16px', border: '2px solid gray', borderRadius: '20px' }}
                />
            </div>
        </div>
    );
});

export default CaptchaValidation;
