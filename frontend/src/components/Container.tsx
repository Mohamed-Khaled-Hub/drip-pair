import { PropsWithChildren } from 'react'
// Style
import '../styles/components/Container.css'

const Container = ({ children }: PropsWithChildren) => {
    return <div id='container'>{children}</div>
}

export default Container
