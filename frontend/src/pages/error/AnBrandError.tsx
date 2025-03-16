// Components
import Button from '../../components/Button.tsx'
// Functions
import { changeTitle } from '../../functions/Functions.ts'
// Style
import '../../styles/pages/error/AllShoesError.css'

const AnBrandError = () => {
    changeTitle('Brand Not Found')

    return (
        <div id='an-brand-error'>
            <h1>Brand Not Found</h1>
            <p>
                The brand you are looking for does not exist or is unavailable.
            </p>
            <Button type='link' to='/shoes'>
                Go Back to Shoes
            </Button>
        </div>
    )
}

export default AnBrandError
