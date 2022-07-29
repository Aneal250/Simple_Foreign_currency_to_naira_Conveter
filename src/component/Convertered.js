import React from "react";

const Convertered = ({ converted }) => {
	const ConvertedAmount = (x) => {
		let number = Number(x).toFixed(2);
		return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
	};

	return (
		<div>
			<p className="result">NGN {ConvertedAmount(converted)}</p>
			<p className="text">Equivalent Price in Naira</p>
		</div>
	);
};

export default Convertered;
