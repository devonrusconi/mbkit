import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { CurrencyInput } from './index';
import { CurrencyInputProps } from './CurrencyInput';

export default {
    title: 'Components/CurrencyInput',
    component: CurrencyInput,
} as Meta;

const Template: Story<CurrencyInputProps> = args => <CurrencyInput {...args} />;

const defaultArgs: CurrencyInputProps = {
    locale: 'en-US',
    currencyCode: 'USD',
    value: 0,
    onChange: () => {
        console.log('this will update the value for the currency input');
    },
    invalid: false,
};

export const USACurrencyInput = Template.bind({});
USACurrencyInput.args = {
    ...defaultArgs,
};

export const FranceCurrencyInput = Template.bind({});
FranceCurrencyInput.args = {
    ...defaultArgs,
    locale: 'fr-FR',
    currencyCode: 'EUR',
};
