import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Components
import Button from '../../components/Button.tsx'
import AuthInput from '../../components/AuthInput.tsx'
// Context
import { UserContext } from '../../contexts/Contexts.ts'
// Functions
import { changeTitle } from '../../functions/Functions.ts'
// Globals
import { VALIDATION_REGEX } from '../../globals/Globals.ts'
// Types
import { InputValidationType } from '../../types/Types.ts'
// Style
import '../../styles/pages/auth/AuthPages.css'

const LoginPage = () => {
    const navigate = useNavigate()
    const { login } = useContext(UserContext)
    // Inputs
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

    changeTitle('Login')

    return (
        <div id='login-page'>
            <h1>Login</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    if (!VALIDATION_REGEX.username.test(username.value)) {
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
                    } else {
                        login(username.value, password.value)
                            .then(() => {
                                navigate('/')
                            })
                            .catch(() => {
                                setUsername({
                                    ...username,
                                    isValid: false,
                                    notValidMessage:
                                        'Wrong username or password',
                                })
                                setPassword({
                                    ...password,
                                    isValid: false,
                                    notValidMessage:
                                        'Wrong username or password',
                                })
                            })
                    }
                }}
            >
                <AuthInput
                    type='text'
                    autoFocus
                    placeholder='Username'
                    value={username.value}
                    onChange={(e) => {
                        setUsername({
                            value: e.target.value,
                            isValid: true,
                            notValidMessage: '',
                        })
                    }}
                    isValid={username.isValid}
                    notValidMessage={username.notValidMessage}
                />
                <AuthInput
                    type='password'
                    placeholder='Password'
                    value={password.value}
                    onChange={(e) => {
                        setPassword({
                            value: e.target.value,
                            isValid: true,
                            notValidMessage: '',
                        })
                    }}
                    isValid={password.isValid}
                    notValidMessage={password.notValidMessage}
                />
                <Button type='submit'>Login</Button>
            </form>
        </div>
    )
}

export default LoginPage
