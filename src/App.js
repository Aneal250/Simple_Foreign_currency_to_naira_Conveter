import { useEffect, useState } from "react";
import "./App.css";
import Convertered from "./component/Convertered";
import CurrencyConverter from "./component/CurrencyConverter";

function App() {
	const [currencyList, setCurrency] = useState([]);
	const [currencyOption, setCurrencyOption] = useState("");
	const [amount, setAmount] = useState("");
	const [converted, setConverted] = useState("");
	const [CountryAndCurrency, setCountryAndCurrency] = useState([]);

	const APIKey = "IawQ04OgCcARZp3eFIur2XprdwtJkw4C";

	const myHeaders = new Headers();
	myHeaders.append("apikey", APIKey);

	const requestOptions = {
		method: "GET",
		redirect: "follow",
		headers: myHeaders,
	};

	const FetchCurrency = () => {
		fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				for (let keys in data.symbols) {
					setCurrency((symbols) => [...symbols, keys]);
				}
			})
			.catch((error) => console.log("error", error));
	};

	const ConvertFunction = () => {
		fetch(
			`https://api.apilayer.com/exchangerates_data/convert?to=${currencyOption}&from=NGN&amount=2`,
			requestOptions
		)
			.then((response) => response.json())
			.then((data) => setConverted(data.result))
			.catch((error) => console.log("error", error));
	};

	useEffect(() => {
		FetchCurrency();
		ConvertFunction();
		// ListSymbols();
	}, [currencyOption]);

	return (
		<div className="App">
			<CurrencyConverter
				currencyList={currencyList}
				setCurrency={setCurrency}
				amount={amount}
				setAmount={setAmount}
				currencyOption={currencyOption}
				setCurrencyOption={setCurrencyOption}
			/>
			<Convertered converted={converted} />
		</div>
	);
}

export default App;
