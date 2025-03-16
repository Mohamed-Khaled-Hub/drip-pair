import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Components
import AuthInput from '../../components/AuthInput.tsx'
import Button from '../../components/Button.tsx'
// Context
import { UserContext } from '../../contexts/Contexts.ts'
// Functions
import { changeTitle } from '../../functions/Functions.ts'
// Globals
import { VALIDATION_REGEX } from '../../globals/Globals.ts'
// Types
import { InputValidationType } from '../../types/Types.ts'
// Styles
import '../../styles/pages/auth/AuthPages.css'
import '../../styles/pages/auth/SignupPage.css'

const SignupPage = () => {
    const navigate = useNavigate()
    const { signup } = useContext(UserContext)
    // Inputs
    const [firstName, setFirstName] = useState<InputValidationType>({
        value: '',
        isValid: true,
        notValidMessage: '',
    })
    const [lastName, setLastName] = useState<InputValidationType>({
        value: '',
        isValid: true,
        notValidMessage: '',
    })
    const [email, setEmail] = useState<InputValidationType>({
        value: '',
        isValid: true,
        notValidMessage: '',
    })
    const [username, setUsername] = useState<InputValidationType>({
        value: '',
        isValid: true,
        notValidMessage: '',
    })
    const [password, setPassword] = useState<InputValidationType>({
        value: '',
        isValid: true,
        notValidMessage: '',
    })
    const [confirmPassword, setConfirmPassword] = useState<InputValidationType>(
        {
            value: '',
            isValid: true,
            notValidMessage: '',
        }
    )
    const [address, setAddress] = useState<InputValidationType>({
        value: '',
        isValid: true,
        notValidMessage: '',
    })
    const [dob, setDob] = useState<InputValidationType>({
        value: '',
        isValid: true,
        notValidMessage: '',
    })
    const [phone, setPhone] = useState<InputValidationType>({
        value: '',
        isValid: true,
        notValidMessage: '',
    })

    changeTitle('Sign Up')

    return (
        <div id='signup-page'>
            <h1>Sign Up</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    if (!VALIDATION_REGEX.firstName.test(firstName.value)) {
                        setFirstName({
                            ...firstName,
                            isValid: false,
                            notValidMessage: 'Invalid first name',
                        })
                    } else if (
                        !VALIDATION_REGEX.lastName.test(lastName.value)
                    ) {
                        setLastName({
                            ...lastName,
                            isValid: false,
                            notValidMessage: 'Invalid last name',
                        })
                    } else if (!VALIDATION_REGEX.email.test(email.value)) {
                        setEmail({
                            ...email,
                            isValid: false,
                            notValidMessage: 'Invalid email',
                        })
                    } else if (
                        !VALIDATION_REGEX.username.test(username.value)
                    ) {
                        setUsername({
                            ...username,
                            isValid: false,
                            notValidMessage: 'Invalid username',
                        })
                    } else if (
                        !VALIDATION_REGEX.password.test(password.value)
                    ) {
                        setPassword({
                            ...password,
                            isValid: false,
                            notValidMessage: 'Invalid password',
                        })
                    } else if (confirmPassword.value !== password.value) {
                        setPassword({
                            ...password,
                            isValid: false,
                            notValidMessage: 'Password must match',
                        })
                        setConfirmPassword({
                            ...confirmPassword,
                            isValid: false,
                            notValidMessage: 'Confirm password must match',
                        })
                    } else if (dob.value === '') {
                        setDob({
                            ...dob,
                            isValid: false,
                            notValidMessage: 'Date of birth is required',
                        })
                    } else if (!VALIDATION_REGEX.phone.test(phone.value)) {
                        setPhone({
                            ...phone,
                            isValid: false,
                            notValidMessage: 'Invalid phone number',
                        })
                    } else {
                        signup({
                            name: {
                                first: firstName.value,
                                last: lastName.value,
                            },
                            email: email.value,
                            username: username.value,
                            password: password.value,
                            address: address.value,
                            dob: dob.value,
                            phone: phone.value,
                            cart: [],
                        })
                            .then(() => {
                                navigate('/')
                            })
                            .catch(() => {})
                    }
                }}
            >
                <AuthInput
                    type='text'
                    autoFocus
                    placeholder='First Name*'
                    value={firstName.value}
                    isValid={firstName.isValid}
                    notValidMessage={firstName.notValidMessage}
                    onChange={(e) =>
                        setFirstName({
                            value: e.target.value,
                            isValid: true,
                            notValidMessage: '',
                        })
                    }
                />
                <AuthInput
                    type='text'
                    placeholder='Last Name*'
                    value={lastName.value}
                    isValid={lastName.isValid}
                    notValidMessage={lastName.notValidMessage}
                    onChange={(e) =>
                        setLastName({
                            value: e.target.value,
                            isValid: true,
                            notValidMessage: '',
                        })
                    }
                />
                <AuthInput
                    type='email'
                    placeholder='Email*'
                    value={email.value}
                    isValid={email.isValid}
                    notValidMessage={email.notValidMessage}
                    onChange={(e) =>
                        setEmail({
                            value: e.target.value,
                            isValid: true,
                            notValidMessage: '',
                        })
                    }
                />
                <AuthInput
                    type='text'
                    placeholder='Username*'
                    value={username.value}
                    isValid={username.isValid}
                    notValidMessage={username.notValidMessage}
                    onChange={(e) =>
                        setUsername({
                            value: e.target.value,
                            isValid: true,
                            notValidMessage: '',
                        })
                    }
                />
                <AuthInput
                    type='password'
                    placeholder='Password*'
                    value={password.value}
                    isValid={password.isValid}
                    notValidMessage={password.notValidMessage}
                    onChange={(e) =>
                        setPassword({
                            value: e.target.value,
                            isValid: true,
                            notValidMessage: '',
                        })
                    }
                />
                <AuthInput
                    type='password'
                    placeholder='Confirm Password*'
                    value={confirmPassword.value}
                    isValid={confirmPassword.isValid}
                    notValidMessage={confirmPassword.notValidMessage}
                    onChange={(e) =>
                        setConfirmPassword({
                            value: e.target.value,
                            isValid: true,
                            notValidMessage: '',
                        })
                    }
                />
                <AuthInput
                    type='text'
                    placeholder='Address (Optional)'
                    value={address.value}
                    isValid={address.isValid}
                    notValidMessage={address.notValidMessage}
                    onChange={(e) =>
                        setAddress({
                            value: e.target.value,
                            isValid: true,
                            notValidMessage: '',
                        })
                    }
                />
                <AuthInput
                    type='date'
                    value={dob.value}
                    isValid={dob.isValid}
                    placeholder='DOB*'
                    notValidMessage={dob.notValidMessage}
                    onChange={(e) =>
                        setDob({
                            value: e.target.value,
                            isValid: true,
                            notValidMessage: '',
                        })
                    }
                />
                <AuthInput
                    type='text'
                    placeholder='Phone*'
                    value={phone.value}
                    isValid={phone.isValid}
                    notValidMessage={phone.notValidMessage}
                    onChange={(e) =>
                        setPhone({
                            value: e.target.value,
                            isValid: true,
                            notValidMessage: '',
                        })
                    }
                />
                <Button type='submit'>Create Account</Button>
            </form>
        </div>
    )
}

export default SignupPage
