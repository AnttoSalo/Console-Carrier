import styles from './Button.module.css';

interface Props {
	children: any;
	color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark' | 'link';
	onClick: () => void;
}

const Button = ({children, onClick, color = 'primary'}: Props) => {
	return (
		<button type="button" className={[styles.btn, styles['btn-' + color]].join(' ')} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
