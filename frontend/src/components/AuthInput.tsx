import { useState } from 'react'
// Functions
import { getFromAssets } from '../functions/Functions.ts'
// Types
import { AuthInputProps } from '../types/Types.ts'
// Style
import '../styles/components/AuthInput.css'

const AuthInput = ({
    type,
    value,
    isValid,
    onChange,
    autoFocus,
    placeholder,
    notValidMessage,
}: AuthInputProps) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className='auth-input-container'>
            <input
                type={
                    type === 'password'
                        ? showPassword
                            ? 'text'
                            : 'password'
                        : type
                }
                value={value}
                autoFocus={autoFocus}
                onChange={onChange}
                placeholder={placeholder}
                className={`auth-input${!isValid ? ' not-valid-input' : ''}`}
            />
            {type === 'password' && (
                <div
                    className='show-password'
                    onClick={() => setShowPassword(!showPassword)}
                >
                    <img
                        src={getFromAssets(
                            `svg/${showPassword ? 'Show' : 'Hide'} Password.svg`
                        )}
                        alt={`${showPassword ? 'Show' : 'Hide'} Password`}
                    />
                </div>
            )}
            {notValidMessage !== '' && (
                <div className='error-message'>{notValidMessage}</div>
            )}
        </div>
    )
}

export default AuthInput
