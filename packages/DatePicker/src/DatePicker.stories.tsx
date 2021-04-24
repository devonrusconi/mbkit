import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { DatePicker } from './index';
import { DatePickerProps } from './DatePicker';

export default {
    title: 'Components/DatePicker',
    component: DatePicker,
} as Meta;

const Template: Story<DatePickerProps> = args => <DatePicker {...args} />;

const defaultArgs: DatePickerProps = {};

export const DatePickerType = Template.bind({});
DatePickerType.args = {
    ...defaultArgs,
};
