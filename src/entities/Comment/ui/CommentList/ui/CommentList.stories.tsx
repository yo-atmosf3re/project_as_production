import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CommentList } from './CommentList';

export default {
    title: 'entities/Comment/CommentList',
    component: CommentList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentList>;

const comments = [
    {
        id: '1',
        text: 'hello world',
        user: {
            id: '1',
            username: 'Vasya',
        },
    },
    {
        id: '2',
        text: 'hello war',
        user: {
            id: '2',
            username: 'Petya',
        },
    },
    {
        id: '3',
        text: 'hello outworld',
        user: {
            id: '1',
            username: 'Vasya',
        },
    },
];

const Template: ComponentStory<typeof CommentList> = (args) => (
    <CommentList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    comments,
};

export const Loading = Template.bind({});
Loading.args = {
    comments: [],
    isLoading: true,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    comments,
};

export const LoadingDark = Template.bind({});
LoadingDark.args = {
    comments: [],
    isLoading: true,
};

export const PrimaryJungle = Template.bind({});
PrimaryJungle.args = {
    comments,
};

export const LoadingJungle = Template.bind({});
LoadingJungle.args = {
    comments: [],
    isLoading: true,
};
