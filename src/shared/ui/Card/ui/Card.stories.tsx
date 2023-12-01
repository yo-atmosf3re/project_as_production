import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { THEME } from 'app/providers/ThemeProvider';
import { Text } from '../../Text';
import { ThemeDecorator } from '../../../config/storybook/ThemeDecorator/ThemeDecorator';
import { CARD_THEME, Card } from './Card';

export default {
    title: 'shared/Card',
    component: Card,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Light = Template.bind({});
Light.args = {
    children: <Text title="Test" text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis animi, non sunt neque iste quam at temporibus porro! Porro delectus molestiae laborum sunt possimus voluptatibus maiores, cumque commodi unde quasi dolor exercitationem voluptatem fugiat hic inventore officia accusantium error ad eius ipsa quas maxime beatae est a. Placeat ut ullam, illum quod saepe fugit nihil repudiandae pariatur. Delectus, cumque accusamus? Ipsam nostrum deserunt doloribus. Rerum deleniti voluptatem dolor sit illo voluptates odio quod minima commodi provident iure molestias, quia quidem assumenda. Mollitia at voluptatem consectetur repellendus amet quos architecto! Molestiae ducimus dolores voluptatum repellat dolor quos magnam quaerat debitis molestias?" />,
};

export const LightOutlined = Template.bind({});
LightOutlined.args = {
    children: <Text title="Test" text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis animi, non sunt neque iste quam at temporibus porro! Porro delectus molestiae laborum sunt possimus voluptatibus maiores, cumque commodi unde quasi dolor exercitationem voluptatem fugiat hic inventore officia accusantium error ad eius ipsa quas maxime beatae est a. Placeat ut ullam, illum quod saepe fugit nihil repudiandae pariatur. Delectus, cumque accusamus? Ipsam nostrum deserunt doloribus. Rerum deleniti voluptatem dolor sit illo voluptates odio quod minima commodi provident iure molestias, quia quidem assumenda. Mollitia at voluptatem consectetur repellendus amet quos architecto! Molestiae ducimus dolores voluptatum repellat dolor quos magnam quaerat debitis molestias?" />,
    theme: CARD_THEME.OUTLINED,
};

export const Dark = Template.bind({});
Dark.args = {
    children: <Text title="Test" text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis animi, non sunt neque iste quam at temporibus porro! Porro delectus molestiae laborum sunt possimus voluptatibus maiores, cumque commodi unde quasi dolor exercitationem voluptatem fugiat hic inventore officia accusantium error ad eius ipsa quas maxime beatae est a. Placeat ut ullam, illum quod saepe fugit nihil repudiandae pariatur. Delectus, cumque accusamus? Ipsam nostrum deserunt doloribus. Rerum deleniti voluptatem dolor sit illo voluptates odio quod minima commodi provident iure molestias, quia quidem assumenda. Mollitia at voluptatem consectetur repellendus amet quos architecto! Molestiae ducimus dolores voluptatum repellat dolor quos magnam quaerat debitis molestias?" />,
};
Dark.decorators = [ThemeDecorator(THEME.DARK)];

export const Jungle = Template.bind({});
Jungle.args = {
    children: <Text title="Test" text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis animi, non sunt neque iste quam at temporibus porro! Porro delectus molestiae laborum sunt possimus voluptatibus maiores, cumque commodi unde quasi dolor exercitationem voluptatem fugiat hic inventore officia accusantium error ad eius ipsa quas maxime beatae est a. Placeat ut ullam, illum quod saepe fugit nihil repudiandae pariatur. Delectus, cumque accusamus? Ipsam nostrum deserunt doloribus. Rerum deleniti voluptatem dolor sit illo voluptates odio quod minima commodi provident iure molestias, quia quidem assumenda. Mollitia at voluptatem consectetur repellendus amet quos architecto! Molestiae ducimus dolores voluptatum repellat dolor quos magnam quaerat debitis molestias?" />,
};
Jungle.decorators = [ThemeDecorator(THEME.JUNGLE)];
