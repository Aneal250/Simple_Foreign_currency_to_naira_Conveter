import React, { useState, useEffect } from "react";

const CurrencyConverter = ({
	currencyList,
	setCurrency,
	amount,
	setAmount,
	currencyOption,
	setCurrencyOption,
}) => {
	return (
		<div>
			<input
				type="number"
				placeholder="Enter Amount to convert"
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
			/>
			<select onChange={(e) => setCurrencyOption(e.target.value)}>
				{currencyList.map((currency, index) => (
					<option value={currency} key={index}>
						{currency}
					</option>
				))}
			</select>
		</div>
	);
};

export default CurrencyConverter;
