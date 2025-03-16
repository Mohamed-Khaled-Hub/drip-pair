import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Components
import Button from '../../components/Button.tsx'
import AuthInput from '../../components/AuthInput.tsx'
// Contexts
import { UserContext } from '../../contexts/Contexts.ts'
// Functions
import { changeTitle } from '../../functions/Functions.ts'
// Globals
import { VALIDATION_REGEX } from '../../globals/Globals.ts'
// Types
import { InputValidationType } from '../../types/Types.ts'
// Style
import '../../styles/pages/auth/AuthPages.css'

const ChangePasswordPage = () => {
    const navigate = useNavigate()
    const { user, changePassword } = useContext(UserContext)
    // Inputs
    const [oldPassword, setOldPassword] = useState<InputValidationType>({
        value: '',
        isValid: true,
        notValidMessage: '',
    })
    const [newPassword, setNewPassword] = useState<InputValidationType>({
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

    changeTitle('Change Password')

    return (
        <div id='change-password-page'>
            <h1>Change Password</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    if (!VALIDATION_REGEX.password.test(oldPassword.value)) {
                        setOldPassword({
                            ...oldPassword,
                            isValid: false,
                            notValidMessage: 'Invalid old password',
                        })
                    } else if (
                        !VALIDATION_REGEX.password.test(newPassword.value)
                    ) {
                        setNewPassword({
                            ...newPassword,
                            isValid: false,
                            notValidMessage: 'Invalid new password',
                        })
                    } else if (confirmPassword.value !== newPassword.value) {
                        setNewPassword({
                            ...newPassword,
                            isValid: false,
                            notValidMessage: 'New password must match',
                        })
                        setConfirmPassword({
                            ...confirmPassword,
                            isValid: false,
                            notValidMessage: 'Confirm password must match',
                        })
                    } else {
                        changePassword(
                            user!.id as number,
                            oldPassword.value,
                            newPassword.value
                        )
                            .then(() => {
                                navigate('/profile')
                            })
                            .catch(() => {
                                setOldPassword({
                                    ...oldPassword,
                                    isValid: false,
                                    notValidMessage:
                                        'Wrong old password, or something wrong',
                                })
                            })
                    }
                }}
            >
                <AuthInput
                    type='password'
                    placeholder='Old Password'
                    value={oldPassword.value}
                    onChange={(e) => {
                        setOldPassword({
                            value: e.target.value,
                            isValid: true,
                            notValidMessage: '',
                        })
                    }}
                    isValid={oldPassword.isValid}
                    notValidMessage={oldPassword.notValidMessage}
                />
                <AuthInput
                    type='password'
                    placeholder='New Password'
                    value={newPassword.value}
                    onChange={(e) => {
                        setNewPassword({
                            value: e.target.value,
                            isValid: true,
                            notValidMessage: '',
                        })
                    }}
                    isValid={newPassword.isValid}
                    notValidMessage={newPassword.notValidMessage}
                />
                <AuthInput
                    type='password'
                    placeholder='Confirm New Password'
                    value={confirmPassword.value}
                    onChange={(e) => {
                        setConfirmPassword({
                            value: e.target.value,
                            isValid: true,
                            notValidMessage: '',
                        })
                    }}
                    isValid={confirmPassword.isValid}
                    notValidMessage={confirmPassword.notValidMessage}
                />
                <Button type='submit'>Change Password</Button>
            </form>
        </div>
    )
}

export default ChangePasswordPage
