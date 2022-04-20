import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions';

export default {
    title: 'AddItemForm',
    component: AddItemForm
}

export const AddItemFormExample = () => {
    return <AddItemForm addItem={action('item was added')}/>
}
