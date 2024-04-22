import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from '../../Text';
import { Card } from './Card';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/Card',
    component: Card,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [NewDesignDecorator],
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Light = Template.bind({});
Light.args = {
    children: (
        <Text
            title="Test"
            text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis animi, non sunt neque iste quam at temporibus porro! Porro delectus molestiae laborum sunt possimus voluptatibus maiores, cumque commodi unde quasi dolor exercitationem voluptatem fugiat hic inventore officia accusantium error ad eius ipsa quas maxime beatae est a. Placeat ut ullam, illum quod saepe fugit nihil repudiandae pariatur. Delectus, cumque accusamus? Ipsam nostrum deserunt doloribus. Rerum deleniti voluptatem dolor sit illo voluptates odio quod minima commodi provident iure molestias, quia quidem assumenda. Mollitia at voluptatem consectetur repellendus amet quos architecto! Molestiae ducimus dolores voluptatum repellat dolor quos magnam quaerat debitis molestias?"
        />
    ),
};

export const LightOutlined = Template.bind({});
LightOutlined.args = {
    children: (
        <Text
            title="Test"
            text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis animi, non sunt neque iste quam at temporibus porro! Porro delectus molestiae laborum sunt possimus voluptatibus maiores, cumque commodi unde quasi dolor exercitationem voluptatem fugiat hic inventore officia accusantium error ad eius ipsa quas maxime beatae est a. Placeat ut ullam, illum quod saepe fugit nihil repudiandae pariatur. Delectus, cumque accusamus? Ipsam nostrum deserunt doloribus. Rerum deleniti voluptatem dolor sit illo voluptates odio quod minima commodi provident iure molestias, quia quidem assumenda. Mollitia at voluptatem consectetur repellendus amet quos architecto! Molestiae ducimus dolores voluptatum repellat dolor quos magnam quaerat debitis molestias?"
        />
    ),
    variant: 'outlined',
};
