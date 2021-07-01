import './sign-in.styles.scss'

import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';

const SignIn = () => {
    const [ email, setEmail ] = useState('') 
    const [ password, setPassword ] = useState('') 
    
    const handleSubmit = e => {
        e.preventDefault()
    }

    return <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput name='email' value={email} onChange={({ target: { value } }) => setEmail(value)} label='Email' required />
            <FormInput name='password' value={password} onChange={({ target: { value } }) => setPassword(value)} label='Password' required/>
            <div className='buttons'>
                <CustomButton type='submit'>Sign In</CustomButton>
                <CustomButton onClick={signInWithGoogle} isGoogleSignIn >
                    {''}
                    Sign In With Google{''}
                </CustomButton>
            </div>
        </form>
    </div>
}

export default SignIn