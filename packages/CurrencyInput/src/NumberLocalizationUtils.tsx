export type CurrencySymbolSide = 'left' | 'right';

class NumberLocalizationUtils {
    // taken originally from https://stackoverflow.com/a/42213804
    // this is only needed because the Intl API doesn't have a built-in parse

    /* TODO check out globalizejs if this doesn't end up working out; that library looked pretty good. I couldn't get webpack to load this library tho. See https://github.com/globalizejs/globalize/issues/603
     *   numbro also seems good https://github.com/BenjaminVanRyseghem/numbro. It's an active fork of numeral-js
     *   Also, see:
     *   http://rxaviers.github.io/javascript-globalization/
     *   https://github.com/google/closure-library/tree/master/closure/goog/i18n
     */

    public static getCurrencySymbolInfo(
        locale: string,
        currencyCode: string,
    ): {
        symbol: string;
        currencySymbolDisplaySide: CurrencySymbolSide;
    } {
        const currencyFormat = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode,
        });
        const formattedZeroCurrency = currencyFormat.format(0);
        const formattedZero = new Intl.NumberFormat(locale, {
            ...(currencyFormat.resolvedOptions() as Intl.NumberFormatOptions),
            style: 'decimal',
        }).format(0);

        const symbol = formattedZeroCurrency.replace(formattedZero, '').trim();
        const zeroIndex = formattedZeroCurrency.indexOf(formattedZero);
        let currencySymbolDisplaySide: CurrencySymbolSide = 'left';
        if (zeroIndex === 0) {
            currencySymbolDisplaySide = 'right';
        }
        return {
            symbol,
            currencySymbolDisplaySide,
        };
    }
}

export default NumberLocalizationUtils;
