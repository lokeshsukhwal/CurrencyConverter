import { useState, useEffect } from "react";
import { TextField, Button, Select, MenuItem, Typography, Container } from "@mui/material";
import axios from "axios";

function CurrencyConverter() {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [amount, setAmount] = useState(1);
    const [conversionResult, setConversionResult] = useState(null);

    useEffect(() => {
        axios.get("https://api.exchangerate-api.com/v4/latest/USD")
            .then(response => {
                setCurrencies(Object.keys(response.data.rates));
            });
    }, []);

    const handleConvert = () => {
        axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
            .then(response => {
                const rate = response.data.rates[toCurrency];
                setConversionResult(amount * rate);
            });
    };

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <Container className="" maxWidth="sm" style={{ marginTop: '20vh', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)' }}>
            <Typography style={{textAlign:'center'}} variant="h4" gutterBottom>
                Currency Converter
            </Typography>
            <TextField
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                label="Amount"
                fullWidth
                margin="normal"
            />
            <Select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                fullWidth
                margin="normal"
            >
                {currencies.map(currency => (
                    <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                ))}
            </Select>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSwap}
                fullWidth
                style={{marginTop: '10px', marginBottom: '10px' }}
            >
                Swap
            </Button>
            <Select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                fullWidth
                margin="normal"
            >
                {currencies.map(currency => (
                    <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                ))}
            </Select>
            <Button
                variant="contained"
                color="primary"
                onClick={handleConvert}
                fullWidth
                style={{ marginTop: '20px' }}
            >
                Convert
            </Button>
            {conversionResult && (
                <Typography variant="h5" style={{ textAlign:'center', marginTop: '20px' }}>
                    {amount} {fromCurrency} = {conversionResult.toFixed(2)} {toCurrency}
                </Typography>
            )}
        </Container>
    );
}

export default CurrencyConverter;
