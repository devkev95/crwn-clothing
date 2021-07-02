import { useState } from 'react'

import './sign-up.styles.scss'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

const SignUp = () => {
    const [ displayName, changeDisplayName ] = useState('')
    const [ email, changeEmail ] = useState('')
    const [ password, changePassword ] = useState('')
    const [ confirmPassword, changeConfirmPassword] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert('Password don\'t match')
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            await createUserProfileDocument(user, { displayName })

            changeDisplayName('')
            changeEmail('')
            changePassword('')
            changeConfirmPassword('')
        } catch(e) {
            console.log(e)
        }
    }

    return <div className='sign-up'>
        <h2 className='title'>I do not have an account</h2>
        <span>Sign up with an email and password</span>
        <form className='sign-up-form' onSubmit={handleSubmit}>
            <FormInput
                type='text'
                name='displayName'
                value={displayName}
                onChange={({ target: { value } }) => changeDisplayName(value)}
                label='Display Name'
                required
            />
            <FormInput
                type='email'
                name='email'
                value={email}
                onChange={({ target: { value } }) => changeEmail(value)}
                label='Email'
                required
            />
            <FormInput
                type='password'
                name='password'
                value={password}
                onChange={({ target: { value } }) => changePassword(value)}
                label='Password'
                required
            />
            <FormInput
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={({ target: { value } }) => changeConfirmPassword(value)}
                label='Confirm password'
                required
            />
            <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
    </div>
}

export default SignUp