import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Forum } from './index';
import { ForumProps } from './Forum';

export default {
    title: 'Components/Forum',
    component: Forum,
} as Meta;

const Template: Story<ForumProps> = args => <Forum {...args} />;

const defaultArgs: ForumProps = {
    tipsyText: 'tipsy text',
    labelText: 'tipsy text',
    children: <button>Hello</button>,
};

export const DefaultForum = Template.bind({});

DefaultForum.args = {
    tipsyText: 'this is a tipsy',
    labelText: 'this is a label',
    children: <input></input>,
};

DefaultForum.args = {
    ...defaultArgs,
};
