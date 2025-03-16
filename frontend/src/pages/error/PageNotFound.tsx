// Components
import Button from '../../components/Button.tsx'
// Functions
import { changeTitle } from '../../functions/Functions.ts'
// Style
import '../../styles/pages/error/AllShoesError.css'

const PageNotFound = () => {
    changeTitle('Page Not Found')

    return (
        <div id='page-not-found'>
            <h1>Page Not Found</h1>
            <p>
                The page you are looking for does not exist or is unavailable.
            </p>
            <Button type='link' to='/'>
                Go Back to Home
            </Button>
        </div>
    )
}

export default PageNotFound
