import './sign-in.styles.scss'

import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle, auth } from '../../firebase/firebase.utils';

const SignIn = () => {
    const [ email, setEmail ] = useState('') 
    const [ password, setPassword ] = useState('') 
    
    const handleSubmit = async e => {
        e.preventDefault()

        try {
            await auth.signInWithEmailAndPassword(email, password)
            setEmail('')
            setPassword('')
        } catch (e) {
            console.log(e)
        }

    }

    return <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput name='email' type='text' value={email} onChange={({ target: { value } }) => setEmail(value)} label='Email' required />
            <FormInput name='password' type='password' value={password} onChange={({ target: { value } }) => setPassword(value)} label='Password' required/>
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