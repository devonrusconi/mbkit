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
        value: string;
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
        const { locale, currencyCode } = props;

        function CurrencySymbol({
            symbol,
            currencySymbolDisplaySide,
        }: {
            symbol: string;
            currencySymbolDisplaySide: CurrencySymbolSide;
        }) {
            return (
                <span
                    className={`${styles.currencySymbol} ${
                        currencySymbolDisplaySide === 'left' ? styles.currencySymbolLeft : styles.currencySymbolRight
                    } ${styles.flexCenteredContent}`}
                >
                    {symbol}
                </span>
            );
        }

        const currencySymbolInfo = NumberLocalizationUtils.getCurrencySymbolInfo(locale, currencyCode);

        return (
            <div className={styles.currencyInput}>
                {currencySymbolInfo.currencySymbolDisplaySide === 'left' && <CurrencySymbol {...currencySymbolInfo} />}
                <Input value="" onChange={() => {}} />
                {currencySymbolInfo.currencySymbolDisplaySide === 'right' && <CurrencySymbol {...currencySymbolInfo} />}
            </div>
        );
    },
);
CurrencyInput.displayName = 'CurrencyInput';
