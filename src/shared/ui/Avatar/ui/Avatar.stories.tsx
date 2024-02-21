import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Avatar } from './Avatar';
// ? Картинка для тестов, чтобы не грузить её откуда-либо потом и не тратить время на загрузку;
import AvatarImage from '../../../assets/tests/avatar_image_for_test.jpg';

export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const IsHasAvatar = Template.bind({});
IsHasAvatar.args = {
    src: AvatarImage,
};

export const IsHasntAvatar = Template.bind({});
IsHasntAvatar.args = {
    src: '',
    alt: 'Нет аватара',
};

export const CustomBigSize = Template.bind({});
CustomBigSize.args = {
    src: AvatarImage,
    size: 300,
};

export const CustomSmallSize = Template.bind({});
CustomSmallSize.args = {
    src: AvatarImage,
    size: 50,
};
