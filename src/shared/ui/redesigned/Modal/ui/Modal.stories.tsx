import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Modal } from './Modal';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/redesigned/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [NewDesignDecorator],
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    isOpen: true,
    children:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eligendi architecto nisi minus aspernatur nemo culpa ipsa. Aliquid consequatur at sequi pariatur obcaecati vero debitis dolorem tenetur quam voluptatum necessitatibus quaerat alias eligendi corporis, aliquam quasi repellendus, ducimus, laboriosam architecto beatae impedit labore? A, cum quia quaerat recusandae rerum unde incidunt blanditiis laborum facilis sequi eius cumque officia quo, quibusdam beatae in nam ullam magni maiores odit vitae quas. Voluptatum consectetur ut soluta eum laudantium, distinctio libero consequatur inventore laboriosam maiores odit beatae a eligendi deserunt sit repellendus id asperiores reiciendis nam odio natus porro. Quas, dignissimos? Adipisci, beatae rem.',
};
