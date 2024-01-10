import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { EditableProfilePageHeader } from './EditableProfilePageHeader';

describe('features/EditableProfilePageHeader', () => {
    test('Test sidebar render', () => {
        componentRender(<EditableProfilePageHeader />);
    });
});
