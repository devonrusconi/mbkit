import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import PreBuiltComponents from './PreBuiltComponents';
import { Table, TableProps } from './Table';

export default {
    title: 'Components/Table',
    component: Table,
} as Meta;

const locale = 'en-US';

function getHeaders() {
    return [
        {
            title: 'Name',
            key: 'name',
            isSortable: true,
        },
        {
            title: 'Email',
            key: 'email',
            centerHeader: true,
        },
        {
            title: 'Phone',
            key: 'phone',
        },
        {
            title: 'Intro Offer',
            key: 'introOffer',
            isSortable: true,
        },
        {
            title: 'Visits',
            key: 'visits',
            isSortable: true,
            centerHeader: true,
            centerContent: true,
        },
    ];
}

const data = [
    {
        name: 'Bob',
        id: '123',
        expired: true,
        email: 'bob@test.com',
        introOffer: 'Skiing',
        introOfferDate: '01/25/19',
        introOfferValue: '200',
        visits: 41,
        phone: '8051233222',
        expirationDate: '2019-01-23T23:31:43.452Z',
    },
    {
        name: 'Toby',
        id: '124',
        expired: true,
        email: 'toby@test.com',
        introOffer: 'Kayaking',
        introOfferDate: '01/22/19',
        introOfferValue: '99',
        visits: 12,
        phone: '2095464873',
        expirationDate: '2019-01-20T23:31:43.452Z',
    },
    {
        name: 'Zeek',
        id: '125',
        expired: false,
        email: 'zeek@test.com',
        introOffer: 'Fishing',
        introOfferDate: '02/02/19',
        introOfferValue: '58',
        visits: 24,
        phone: '6619837566',
        expirationDate: '2019-01-03T23:31:43.452Z',
    },
];
const Template: Story<TableProps> = args => <Table {...args} />;

const defaultArgs: TableProps = {
    ariaLabel: 'Default table',
    headers: getHeaders(),
    records: data,
    uniqueRecordKey: 'key',
};

export const DefaultTable = Template.bind({});
DefaultTable.args = {
    ...defaultArgs,
};
