import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CurrencyInput } from '../CurrencyInput';
import { Input } from '../../../Input/src/Input';

const spy = jest.fn();

describe('<CurrencyInputField/>', () => {
    it('renders', () => {
        const { getByTestId } = render(
            <CurrencyInput value={0} onChange={spy} locale={'en-US'} currencyCode={'USD'} data-testid="test" />,
        );
        expect(getByTestId('test').nodeName).toBe('CurrencyInput');
    });
    it('should render and be able to pass expected props', () => {
        const changeSpy = jest.fn();
        const focusSpy = jest.fn();
        const blurSpy = jest.fn();
        const expectedValue = 0;
        const { getByTestId } = render(
            <CurrencyInput
                data-testid="test"
                currencyCode="USD"
                locale="en-US"
                value={expectedValue}
                onChange={changeSpy}
                onFocus={focusSpy}
                onBlur={blurSpy}
                className="customClassName"
                data-randomprop="testing"
            />,
        );
        const input = getByTestId('test');

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

        expect(input.getAttribute('data-randomprop')).toBe('testing');
    });

    describe('renders input', () => {
        const { getByTestId } = render(<Input value="" onChange={spy} data-testid="test" />);
        expect(getByTestId('test').nodeName).toBe('INPUT');
    });

    it('has correct currency symbol for EUR, France and apperars on the right of the input field', () => {
        const { getByTestId } = render(
            <CurrencyInput value={0} onChange={spy} locale={'fr-FR'} currencyCode={'EUR'} data-testid="test" />,
        );

        expect(getByTestId('currency-symbol')).toBe('€');
    });

    it('has correct currency symbol for USA, Dollar and apperars on the left of the input field', () => {
        const { getByTestId } = render(
            <CurrencyInput value={0} onChange={spy} locale={'en-us'} currencyCode={'USD'} data-testid="test" />,
        );

        expect(getByTestId('currency-symbol')).toBe('$');
    });

    it('correctly formats the input value for USD', () => {
        const { getByTestId } = render(
            <CurrencyInput value={0} onChange={spy} locale={'en-us'} currencyCode={'USD'} data-testid="test" />,
        );

        expect(getByTestId('currency-symbol-left')).toContain('.');
    });

    it('correctly formats the input value for french EUR', () => {
        const { getByTestId } = render(
            <CurrencyInput value={0} onChange={spy} locale={'fr-FR'} currencyCode={'EUR'} data-testid="test" />,
        );
        expect(getByTestId('currency-symbol-right')).toContain(',');
    });
});
