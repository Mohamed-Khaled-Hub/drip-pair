// Components
import Button from '../../components/Button.tsx'
// Functions
import { changeTitle } from '../../functions/Functions.ts'
// Style
import '../../styles/pages/error/AllShoesError.css'

const ShoesError = () => {
    changeTitle('Something Went Wrong')

    return (
        <div id='shoes-error'>
            <h1>Something Went Wrong</h1>
            <p>
                We encountered an issue while trying to load the shoes. Please
                try again later.
            </p>
            <Button type='link' to='/'>
                Go Back to Home
            </Button>
        </div>
    )
}

export default ShoesError
