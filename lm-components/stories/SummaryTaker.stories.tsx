import React from 'react';

import { Meta, Story } from '@storybook/react';

import { SummaryTaker, Props } from '../src/SummaryTaker';

const meta: Meta = {
  title: 'SummaryTaker',
  component: SummaryTaker,
};

export default meta;

const Template: Story<Props> = (args) => <SummaryTaker {...args} />;

export const Default = () => <SummaryTaker></SummaryTaker>;

export const Secondary = Template.bind({});

Secondary.args = {};
