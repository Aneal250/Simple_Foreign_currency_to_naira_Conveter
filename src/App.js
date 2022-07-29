import { useEffect, useState } from "react";
import "./App.css";
import Convertered from "./component/Convertered";
import CurrencyConverter from "./component/CurrencyConverter";

function App() {
	const [currencyList, setCurrency] = useState([]);
	const [currencyOption, setCurrencyOption] = useState("");
	const [amount, setAmount] = useState("");
	const [converted, setConverted] = useState("");

	const APIKey = "mMSdsbNUpgyYHnrcKmS31ptN7ZDkTZrX";

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
				for (let keys in data.symbols) {
					setCurrency((symbols) => [...symbols, keys]);
				}
			})
			.catch((error) => console.log("error", error));
	};

	const ConvertFunction = () => {
		fetch(
			`https://api.apilayer.com/exchangerates_data/convert?to=NGN&from=${currencyOption}&amount=${amount}`,
			requestOptions
		)
			.then((response) => response.json())
			.then((data) => setConverted(data.result))
			.catch((error) => console.log("error", error));
	};

	useEffect(() => {
		FetchCurrency();
		if (currencyOption) {
			ConvertFunction();
		}
	}, [currencyOption]);

	return (
		<>
			<div className="title"> Currency Converter {`(Naira)`}</div>
			<section className="container">
				<CurrencyConverter
					currencyList={currencyList}
					setCurrency={setCurrency}
					amount={amount}
					setAmount={setAmount}
					currencyOption={currencyOption}
					setCurrencyOption={setCurrencyOption}
				/>
				<Convertered converted={converted} />
			</section>
		</>
	);
}

export default App;
