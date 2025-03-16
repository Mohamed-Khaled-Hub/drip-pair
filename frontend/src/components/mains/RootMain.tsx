import { PropsWithChildren } from 'react'
// Components
import Container from '../Container.tsx'
// Style
import '../../styles/components/mains/RootMain.css'

const RootMain = ({ children }: PropsWithChildren) => {
    return (
        <main id='root-main'>
            <Container>{children}</Container>
        </main>
    )
}

export default RootMain
