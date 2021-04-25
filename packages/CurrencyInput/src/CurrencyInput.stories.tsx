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
    locale: 'US-en',
    currencyCode: 'USD',
    value: '',
    onChange: () => {},
};

export const CurrencyInputUS = Template.bind({});
CurrencyInputUS.args = {
    ...defaultArgs,
};
