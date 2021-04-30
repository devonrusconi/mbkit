/* eslint react/prop-types: 0 */
import NumberLocalizationUtils, { CurrencySymbolSide } from './NumberLocalizationUtils';
import React, {
    forwardRef,
    FC,
    RefObject,
    InputHTMLAttributes,
    HTMLAttributes,
    ChangeEvent,
    RefAttributes,
} from 'react';
import { Input } from '../../Input/src/Input';
import styles from './CurrencyInput.scss';

export type CurrencyInputProps = InputHTMLAttributes<HTMLInputElement> &
    RefAttributes<HTMLInputElement> & {
        /** Value that is displayed in text input */
        value: number;
        /** Fires when user interacts with value in input field */
        onChange: (event: ChangeEvent<HTMLInputElement>) => void;

        wrapperProps?: HTMLAttributes<HTMLDivElement>;
        /** Adds red border and sets aria-invalid attribute */
        invalid?: boolean;

        locale: string;

        currencyCode: string;
    };
export const CurrencyInput: FC<CurrencyInputProps> = forwardRef(
    (props: CurrencyInputProps, ref: RefObject<HTMLInputElement>) => {
        const { locale, currencyCode, value, onChange, invalid } = props;

        function CurrencySymbol({
            symbol,
            currencySymbolDisplaySide,
        }: {
            symbol: string;
            currencySymbolDisplaySide: CurrencySymbolSide;
        }) {
            return (
                <span
                    data-testid="currency-symbol"
                    className={`${styles.currencySymbol} ${
                        currencySymbolDisplaySide === 'left' ? styles.currencySymbolLeft : styles.currencySymbolRight
                    } ${styles.flexCenteredContent}`}
                >
                    {symbol}
                </span>
            );
        }
        function inputValueFormatter(value: number, locale: string) {
            const currencyOptions = new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currencyCode,
            }).resolvedOptions() as Intl.NumberFormatOptions;

            return new Intl.NumberFormat(locale, {
                ...currencyOptions,
                style: 'decimal',
            }).format(value);
        }

        const currencySymbolInfo = NumberLocalizationUtils.getCurrencySymbolInfo(locale, currencyCode);
        return (
            <div data-testid={'currency-input-wrapper'} className={styles.currencyInput}>
                {currencySymbolInfo.currencySymbolDisplaySide === 'left' && (
                    <CurrencySymbol {...currencySymbolInfo} data-testid={'currency-symbol-left'} />
                )}
                <Input
                    data-testid={'currency-input'}
                    className={`${styles.inputField} ${
                        currencySymbolInfo.currencySymbolDisplaySide === 'left'
                            ? styles.inputFieldLeft
                            : styles.inputFieldRight
                    }`}
                    value={inputValueFormatter(value, locale)}
                    onChange={onChange}
                    invalid={invalid}
                />
                {currencySymbolInfo.currencySymbolDisplaySide === 'right' && (
                    <CurrencySymbol {...currencySymbolInfo} data-testid={'currency-symbol-right'} />
                )}
            </div>
        );
    },
);
CurrencyInput.displayName = 'CurrencyInput';
