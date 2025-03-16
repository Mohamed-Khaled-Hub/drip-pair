import { PropsWithChildren } from 'react'
// Components
import Container from '../Container.tsx'
// Style
import '../../styles/components/mains/AuthMain.css'

const AuthMain = ({ children }: PropsWithChildren) => {
    return (
        <main id='auth-main'>
            <Container>{children}</Container>
        </main>
    )
}

export default AuthMain
