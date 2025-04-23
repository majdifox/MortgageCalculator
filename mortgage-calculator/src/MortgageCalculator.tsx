import React, { useState, ChangeEvent } from 'react';
import './MortgageCalculator.css';
import calculatorIcon from './assets/images/icon-calculator.svg';
import emptyIllustration from './assets/images/illustration-empty.svg';

// Define TypeScript interfaces
interface FormState {
  amount: string;
  term: string;
  rate: string;
  mortgageType: 'repayment' | 'interest-only';
  error: {
    amount: boolean;
    term: boolean;
    rate: boolean;
  };
  result: boolean;
}

interface Result {
  monthlyPayment: number;
  totalRepayment: number;
}


const MortgageCalculator: React.FC = () => {
  // Initial state
  const initialState: FormState = {
    amount: '',
    term: '',
    rate: '',
    mortgageType: 'repayment',
    error: {
      amount: false,
      term: false,
      rate: false,
    },
    result: false,
  };

  const [state, setState] = useState<FormState>(initialState); // search for it
  const [calculationResult, setCalculationResult] = useState<Result | null>(null);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
      error: {
        ...state.error,
        [name]: false,
      },
    });
  };

  // Handle radio button changes
  const handleRadioChange = (e: { target: { value: any } }) => {
    setState({
      ...state,
      mortgageType: e.target.value as 'repayment' | 'interest-only',
    });
  };

  // Clear all form fields
  const handleClear = () => {
    setState(initialState);
    setCalculationResult(null);
  };

  // Calculate mortgage payments
  const calculate = () => {
    // Form validation
    const errors = {
      amount: state.amount === '',
      term: state.term === '',
      rate: state.rate === '',
    };

    if (errors.amount || errors.term || errors.rate) {
      setState({
        ...state,
        error: errors,
      });
      return;
    }

    const amount = parseFloat(state.amount);
    const term = parseFloat(state.term);
    const rate = parseFloat(state.rate) / 100 / 12; // Monthly interest rate
    const periods = term * 12; // Total number of payments

    let monthlyPayment: number;

    if (state.mortgageType === 'repayment') {
      // Amortizing loan formula
      if (rate === 0) {
        monthlyPayment = amount / periods;
      } else {
        monthlyPayment = (amount * rate * Math.pow(1 + rate, periods)) / (Math.pow(1 + rate, periods) - 1);
      }
    } else {
      // Interest-only loan
      monthlyPayment = amount * rate;
    }

    const totalRepayment = state.mortgageType === 'repayment' 
      ? monthlyPayment * periods 
      : (monthlyPayment * periods) + amount;

    setCalculationResult({
      monthlyPayment,
      totalRepayment,
    });

    setState({
      ...state,
      result: true,
    });
  };

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value).replace(/\s/g, '');
  };

  return (
    <div className="mortgagecalc__container">
      <div className="mortgagecalc__card">
        <div className="mortgagecalc__card-left">
          <div className="mortgagecalc__heading-container">
            <h2 className="mortgagecalc__heading">Calculateur Hypothécaire</h2>
            <a className="mortgagecalc-link" onClick={handleClear}>
              Réinitialiser
            </a>
          </div>
          <div className="mortgagecalc__input-container">
            <div className="mortgagecalc__amount">
              <label htmlFor="amount" className="calc-amountlabel">
                Montant du prêt
              </label>
              <div className="calc-amount-container">
                <span
                  className={
                    state.error.amount ? "pound-icon error-icon" : "pound-icon"
                  }
                >
                  €
                </span>
                <input
                  name="amount"
                  value={state.amount}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  className={
                    state.error.amount
                      ? "calc-amount error-input"
                      : "calc-amount"
                  }
                />
              </div>
              {state.error.amount && (
                <span className="error-field">Ce champ est obligatoire</span>
              )}
            </div>
            <div className="mortgagecal__termrate-container">
              <div className="momortgagecal__term">
                <label htmlFor="term" className="calc-termlabel">
                  Durée du prêt
                </label>
                <div className="calc-term-container">
                  <span
                    className={
                      state.error.term ? "years-text error-icon" : "years-text"
                    }
                  >
                    ans
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    className={
                      state.error.term ? "calc-term error-input" : "calc-term"
                    }
                    name="term"
                    value={state.term}
                    onChange={handleChange}
                  />
                </div>
                {state.error.term && (
                  <span className="error-field">Ce champ est obligatoire</span>
                )}
              </div>
              <div className="momortgagecal__rate">
                <label htmlFor="rate" className="calc-ratelabel">
                  Taux d'intérêt
                </label>
                <div className="calc-rate-container">
                  <span
                    className={
                      state.error.rate
                        ? "percent-text error-icon"
                        : "percent-text"
                    }
                  >
                    %
                  </span>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    className={
                      state.error.rate ? "calc-rate error-input" : "calc-rate"
                    }
                    name="rate"
                    value={state.rate}
                    onChange={handleChange}
                  />
                </div>
                {state.error.rate && (
                  <span className="error-field">Ce champ est obligatoire</span>
                )}
              </div>
            </div>
          </div>
          <div className="mortgagecalc__radio-container">
            <label className="mortgagecalc__radio-label">Type de prêt</label>
            <div
              className={`mortgagecalc__radio-div ${
                state.mortgageType === "repayment" ? "checked" : ""
              }`}
              onClick={() =>
                handleRadioChange({ target: { value: "repayment" } })
              }
            >
              <input
                type="radio"
                className="mortgagecalc__radio-input"
                value="repayment"
                checked={state.mortgageType === "repayment"}
                onChange={handleRadioChange}
              />
              <span className="mortgagecalc__radio-value">Amortissable</span>
            </div>
            <div
              className={`mortgagecalc__radio-div ${
                state.mortgageType === "interest-only" ? "checked" : ""
              }`}
              onClick={() =>
                handleRadioChange({ target: { value: "interest-only" } })
              }
            >
              <input
                type="radio"
                className="mortgagecalc__radio-input"
                value="interest-only"
                checked={state.mortgageType === "interest-only"}
                onChange={handleRadioChange}
              />
              <span className="mortgagecalc__radio-value">Intérêts seuls</span>
            </div>
          </div>
          <div className="mortgagecalc__button-container">
            <span className="calculatorIcon">
              <img
                src={calculatorIcon}
                alt="Calculator Icon"
              />
            </span>
            <button
              className="mortgagecalc__calculate-button"
              onClick={calculate}
            >
              Calculer les remboursements
            </button>
          </div>
        </div>
        <div className="mortgagecalc__card-right">
          {!state.result || !calculationResult ? (
            <div className="mortgagecalc__empty">
              <div className="mortgagecalc__empty-imgcontainer">
                <img
                  src={emptyIllustration}
                  alt="empty illustration"
                />
              </div>
              <h2 className="mortgagecalc__empty-heading">
                Résultats affichés ici
              </h2>
              <p className="mortgagecalc__empty-info">
                Complétez le formulaire et cliquez sur "Calculer les remboursements" pour voir vos mensualités.
              </p>
            </div>
          ) : (
            <div className="mortgagecalc__active">
              <h2 className="martgagecalc__active-heading">Vos résultats</h2>
              <p className="mortgagecalc__active-info">
                Vos résultats sont affichés ci-dessous selon les informations que vous avez fournies. Pour ajuster les résultats, modifiez le formulaire et cliquez à nouveau sur "Calculer les remboursements".
              </p>
              <div className="mortgagecalc__active-cardcontainer">
                <div className="mortgagecalc__active-cardtop">
                  <span className="cardtop-info">Votre mensualité</span>
                  <span className="cardtop-info-amount">{formatCurrency(calculationResult.monthlyPayment)}</span>
                </div>
                <div className="line"></div>
                <div className="mortgagecalc__active-cardbottom">
                  <span className="cardbottom-info">
                    Montant total remboursé sur toute la durée
                  </span>
                  <span className="cardbottom-info-amount">{formatCurrency(calculationResult.totalRepayment)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;