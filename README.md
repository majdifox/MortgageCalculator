# Mortgage Calculator

A modern, responsive mortgage calculator built with React and TypeScript that helps users calculate their mortgage payments based on loan amount, term, interest rate, and mortgage type.

![image](https://github.com/user-attachments/assets/9c795a3b-4e45-4c37-bc0b-a1bfc0af643a)


## Features

- Calculate monthly mortgage payments for both repayment and interest-only mortgages
- View total repayment amount over the full term
- Clear form validation with error messages
- Responsive design that works on all devices
- Currency formatting in Euro (€)
- Form reset functionality
- Clean and intuitive user interface

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mortgage-calculator.git
cd mortgage-calculator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Usage

1. Enter your loan amount in Euro (€)
2. Specify the loan term in years (1-40 years)
3. Enter the interest rate (%)
4. Select the mortgage type:
   - **Amortissable (Repayment)**: Pay back both the principal and interest over time
   - **Intérêts seuls (Interest-only)**: Pay only the interest during the term, with the principal due at the end
5. Click "Calculer les remboursements" (Calculate repayments) to see the results
6. To start over, click "Réinitialiser" (Reset)

## Calculation Formulas

### Repayment Mortgage
The monthly payment for a repayment mortgage is calculated using the amortization formula:
```
M = P * [r(1+r)^n] / [(1+r)^n - 1]
```

Where:
- M = Monthly payment
- P = Principal (loan amount)
- r = Monthly interest rate (annual rate / 12 / 100)
- n = Total number of payments (term in years * 12)

### Interest-Only Mortgage
The monthly payment for an interest-only mortgage is calculated using:
```
M = P * r
```

Where:
- M = Monthly payment
- P = Principal (loan amount)
- r = Monthly interest rate (annual rate / 12 / 100)

## Project Structure

```
mortgage-calculator/
├── public/
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── icon-calculator.svg
│   │       └── illustration-empty.svg
│   ├── MortgageCalculator.css
│   ├── MortgageCalculator.tsx
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Customization

### Changing Currency Format
To change the currency format, modify the `formatCurrency` function in `MortgageCalculator.tsx`:

```typescript
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', {  // Change locale as needed
    style: 'currency',
    currency: 'EUR',  // Change currency code (USD, GBP, etc.)
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value).replace(/\s/g, '');
};
```

### Adding Additional Fields
To add new fields to the calculator (e.g., down payment, insurance):

1. Update the `FormState` interface
2. Add new form elements in the JSX
3. Update the calculation logic

## Technologies Used

- React
- TypeScript
- CSS
- SVG icons

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Icons from [project icon source]
- Design inspiration from [design inspiration source]

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
