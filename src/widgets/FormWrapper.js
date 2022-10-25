import styles from './FormWrapper.module.css';

const FormWrapper = ({children}) => {
	return (
		<div className={styles.main}>
			{children}
		</div>
	);
};

export default FormWrapper;