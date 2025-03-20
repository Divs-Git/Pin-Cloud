import { useState } from 'react';
import Image from '../../components/image/Image';
import './auth.css';
import axios from '../../api';

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData);

    try {
      const response = await axios.post(
        `/users/auth/${isRegister ? 'register' : 'login'}`,
        data
      );
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className='auth'>
      <div className='authContainer'>
        <Image path={'/general/logo.png'} alt={''} w={36} h={36} />
        <h1> {isRegister ? 'Create an account' : 'Login to your account'} </h1>
        {isRegister ? (
          <form key={'registerForm'} onSubmit={handleSubmit}>
            <div className='formGroup'>
              <label htmlFor='username'>Username</label>
              <input
                type='username'
                placeholder='Username'
                required
                name='username'
                id='username'
              />
            </div>

            <div className='formGroup'>
              <label htmlFor='displayName'>Display Name</label>
              <input
                type='displayName'
                placeholder='Display Name'
                required
                name='displayName'
                id='displayName'
              />
            </div>

            <div className='formGroup'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                placeholder='Email'
                required
                name='email'
                id='email'
              />
            </div>

            <div className='formGroup'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                placeholder='Password'
                required
                name='password'
                id='password'
              />
            </div>

            <button type='submit'>Register</button>
            <p onClick={() => setIsRegister(false)}>
              Already a member? <b>Login</b>
            </p>
            {error && <p className='error'>{error}</p>}
          </form>
        ) : (
          <form key={'loginForm'} onSubmit={handleSubmit}>
            <div className='formGroup'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                placeholder='Email'
                required
                name='email'
                id='email'
              />
            </div>

            <div className='formGroup'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                placeholder='Password'
                required
                name='password'
                id='password'
              />
            </div>

            <button type='submit'>Login</button>
            <p onClick={() => setIsRegister(true)}>
              Don&apos;t have an account? <b>Register</b>
            </p>
            {error && <p className='error'>{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
