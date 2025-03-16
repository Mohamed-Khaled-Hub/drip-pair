import { Link } from 'react-router-dom'
// Types
import { ButtonProps } from '../types/Types.ts'
// Style
import '../styles/components/Button.css'

const Button = ({
    to,
    id,
    style,
    title,
    onClick,
    disabled,
    children,
    className,
    type = 'button',
}: ButtonProps) => {
    return type !== 'link' ? (
        <button
            id={id}
            type={type}
            style={style}
            title={title}
            onClick={onClick}
            disabled={disabled}
            className={`${className === undefined ? 'custom-button' : className}`}
        >
            {children}
        </button>
    ) : (
        <Link
            id={id}
            to={`${to}`}
            style={style}
            title={title}
            onClick={onClick}
            className={`${className === undefined ? 'custom-button' : className}`}
        >
            {children}
        </Link>
    )
}

export default Button
