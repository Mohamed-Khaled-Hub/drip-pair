import { useContext } from 'react'
import { Link } from 'react-router-dom'
// Contexts
import { WebsiteInfoContext } from '../../contexts/Contexts.ts'
// Functions
import { changeTitle, getFromAssets } from '../../functions/Functions.ts'
// Style
import '../../styles/pages/root/HomePage.css'

const HomePage = () => {
    const { brands } = useContext(WebsiteInfoContext)

    changeTitle('Home')

    return (
        <div id='home-page'>
            {brands.map((brand, index) => (
                <Link to={`shoes/${brand.name.toLowerCase()}`} key={index}>
                    <img
                        src={getFromAssets(`brands/${brand.name}/Home.jpg`)}
                        alt={brand.name}
                    />
                    <div className='brand-logo'>
                        <div>
                            <img
                                src={getFromAssets(
                                    `brands/${brand.name}/Logo.png`
                                )}
                                alt={brand.name}
                            />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default HomePage
