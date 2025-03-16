import moment from 'moment'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// Components
import Button from '../../components/Button.tsx'
// Contexts
import { UserContext } from '../../contexts/Contexts.ts'
// Functions
import { changeTitle } from '../../functions/Functions.ts'
// Style
import '../../styles/pages/root/ProfilePage.css'

const ProfilePage = () => {
    const navigate = useNavigate()
    const { user, deleteUser } = useContext(UserContext)

    changeTitle('My Profile')

    return (
        user && (
            <div id='profile-page'>
                <section>
                    <div className='info-field'>
                        <p className='identifier'>Last Active</p>
                        <p>{moment(user.logged_in).fromNow()}</p>
                    </div>
                    <div className='info-field'>
                        <p className='identifier'>Name</p>
                        <p>
                            {user.name.first} {user.name.last}
                        </p>
                    </div>
                    <div className='info-field'>
                        <p className='identifier'>Email</p>
                        <p>{user.email}</p>
                    </div>
                    <div className='info-field'>
                        <p className='identifier'>Phone</p>
                        <p>{user.phone}</p>
                    </div>
                    <div className='info-field'>
                        <p className='identifier'>DOB</p>
                        <p>
                            {new Date(user.dob).toLocaleDateString('en-US', {
                                month: 'short',
                                day: '2-digit',
                                year: 'numeric',
                            })}
                        </p>
                    </div>
                    {user.address !== '' && (
                        <div className='info-field'>
                            <p className='identifier'>Address</p>
                            <p>{user.address}</p>
                        </div>
                    )}
                </section>
                <section>
                    <span>
                        <div className='info-field'>
                            <p className='identifier'>Username</p>
                            <p>{user.username}</p>
                        </div>
                        <div className='info-field'>
                            <p className='identifier'>Password</p>
                            <p>{user.password}</p>
                        </div>
                    </span>
                    <span className='buttons-field'>
                        <Button type='link' to='/auth/change-password'>
                            Change Password
                        </Button>
                        <Button
                            id='delete-account-button'
                            onClick={() => {
                                if (
                                    confirm(
                                        'Are you sure you want to delete this account?'
                                    )
                                ) {
                                    deleteUser(user.id as number).then()
                                    navigate('/')
                                }
                            }}
                        >
                            Delete Account
                        </Button>
                    </span>
                </section>
            </div>
        )
    )
}

export default ProfilePage
