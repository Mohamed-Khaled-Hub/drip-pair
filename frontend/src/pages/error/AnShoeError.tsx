// Components
import Button from '../../components/Button.tsx'
// Functions
import { changeTitle } from '../../functions/Functions.ts'
// Style
import '../../styles/pages/error/AllShoesError.css'

const AnShoeError = () => {
    changeTitle('Shoe Not Found')

    return (
        <div id='an-shoe-error'>
            <h1>Shoe Not Found</h1>
            <p>
                The shoe you are looking for does not exist or has been removed.
            </p>
            <Button type='link' to='/shoes'>
                Go Back to Shoes
            </Button>
        </div>
    )
}

export default AnShoeError
