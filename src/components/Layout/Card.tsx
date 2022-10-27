const Card = ({ title, className = '', children }) => {
	return (
		<div className={`bg-white rounded-lg p-5 shadow ${className}`}>
			<h5 className="text-l font-medium">{title}</h5>
			{children}
		</div>
	);
};

export default Card;
