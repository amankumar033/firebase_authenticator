import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const App = () => {

  const [phone, setPhone] = useState('+91');
  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState('');

  const generateRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA verified!", response);
        },
        "expired-callback": () => {
          console.log("reCAPTCHA expired. Refreshing...");
          generateRecaptcha(); // Reinitialize if expired
        },
      });
    }
  };
  
  
  
  
  const handleSend = async (event) => {
    event.preventDefault();
    setHasFilled(true);
  
    try {
      generateRecaptcha();  // 🔹 Ensure reCAPTCHA is initialized
      const appVerifier = window.recaptchaVerifier;
  
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      window.confirmationResult = confirmationResult;
      console.log("OTP Sent!");
    } catch (error) {
      console.error("handleSend error:", error);
      alert(error.message);
    }
  };
  
  
  
  const verifyOtp = (event) => {
    let otp = event.target.value;
    setOtp(otp);

    if (otp.length === 6) {
      // verifu otp
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        // User signed in successfully.
        let user = result.user;
        console.log(user);
        alert('User signed in successfully');
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        alert('User couldn\'t sign in (bad verification code?)');
      });
    }
  }

  if(!hasFilled){
    return (
      <div className='app__container'>
        <Card sx={{ width: '300px'}}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <Typography sx={{ padding: '20px'}} variant='h5' component='div'>Enter your phone number</Typography>
            <form onSubmit={handleSend}>
              <TextField sx={{ width: '240px'}} variant='outlined' autoComplete='off' label='Phone Number' value={phone} onChange={(event) => setPhone(event.target.value)} />
              <Button type='submit' variant='contained' sx={{ width: '240px', marginTop: '20px'}}>Send Code</Button>
            </form>
          </CardContent>
        </Card>
        <div id="recaptcha"></div>
      </div>
    ) 
  } else {
    return (
      <div className='app__container'>
        <Card sx={{ width: '300px'}}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <Typography sx={{ padding: '20px'}} variant='h5' component='div'>Enter the OTP</Typography>
              <TextField sx={{ width: '240px'}} variant='outlined' label='OTP ' value={otp} onChange={verifyOtp} />
          </CardContent>
        </Card>
        <div id="recaptcha"></div>
      </div>
    )
  }
}

export default App;