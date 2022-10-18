const Card = ({ title, children }) => {
	return (
		<div className="bg-white rounded-lg p-5 shadow">
			<h5 className="text-l font-medium">{title}</h5>
			{children}
		</div>
	);
};

export default Card;
