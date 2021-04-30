import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CurrencyInput } from '../CurrencyInput';
import { Input } from '../../../Input/src/Input';

const spy = jest.fn();

describe('<CurrencyInputField/>', () => {
    it('renders', () => {
        const { getByTestId } = render(
            <CurrencyInput value={0} onChange={spy} locale={'en-US'} currencyCode={'USD'} />,
        );
        expect(getByTestId('currency-input-wrapper').nodeName).toBe('DIV');
    });
    it('should render and be able to pass expected props', () => {
        const changeSpy = jest.fn();
        const focusSpy = jest.fn();
        const blurSpy = jest.fn();
        const expectedValue = 0;
        const { getByTestId } = render(
            <CurrencyInput
                currencyCode="USD"
                locale="en-US"
                value={expectedValue}
                onChange={changeSpy}
                className="customClassName"
            />,
        );
        const input = getByTestId('currency-input-wrapper');
        expect(input.classList.contains('customClassName')).toBe(true);
        expect(input.getAttribute('value')).toBe(expectedValue);

        const newValue = 'new value';
        const event = { target: { value: newValue } };
        fireEvent.change(input, event);
        expect(changeSpy).toHaveBeenCalledTimes(1);

        expect(focusSpy).toHaveBeenCalledTimes(0);
        input.focus();
        expect(focusSpy).toHaveBeenCalledTimes(1);

        expect(blurSpy).toHaveBeenCalledTimes(0);
        input.blur();
        expect(blurSpy).toHaveBeenCalledTimes(1);
    });

    it('has correct currency symbol for EUR, France and apperars on the right of the input field', () => {
        const { getByTestId } = render(
            <CurrencyInput value={0} onChange={spy} locale={'fr-FR'} currencyCode={'EUR'} />,
        );

        expect(getByTestId('currency-symbol').textContent).toBe('€');
    });

    it('has correct currency symbol for USA, Dollar and apperars on the left of the input field', () => {
        const { getByTestId } = render(
            <CurrencyInput value={0} onChange={spy} locale={'en-us'} currencyCode={'USD'} />,
        );

        expect(getByTestId('currency-symbol').textContent).toBe('$');
    });

    it('correctly formats the input value for USD', () => {
        const { getByTestId } = render(
            <CurrencyInput value={555} onChange={spy} locale={'en-us'} currencyCode={'USD'} />,
        );

        expect(getByTestId('currency-input').textContent).toContain('.');
    });

    it('correctly formats the input value for french EUR', () => {
        const { getByTestId } = render(
            <CurrencyInput value={1265} onChange={spy} locale={'fr-FR'} currencyCode={'EUR'} />,
        );
        expect(getByTestId('currency-input').textContent).toContain(',');
    });
});
