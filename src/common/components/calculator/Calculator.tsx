import Button from '@components/button/Button';
import Display from '@components/display/Display';
import Header from '@components/header/Header';
import { BUTTON_CONFIG } from '@constants/calculator';
import { useCalculator } from '@hooks/useCalculator';
import React from 'react';
import './Calculator.scss';

const Calculator: React.FC = () => {
  const { state: { history, display }, handleButtonClick } = useCalculator();

  return (
    <div className="calculator">
      <Header />

      <div className="calculator-body">
        <div className="calculator-toolbar">
          <div className="calculator-toolbar-left">
            <span className="calculator-mode">
              <span className="calculator-mode-highlight">S</span>tandard
            </span>
          </div>
        </div>

        <Display history={history} result={display} />

        <div className="calculator-buttons">
          {BUTTON_CONFIG.map((button, index) => (
            <Button
              key={`${button.value}-${index}`}
              button={button}
              onClick={handleButtonClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;