import {EditableSpan} from './EditableSpan';
import {action} from '@storybook/addon-actions';

export default {
    title: 'EditableSpan',
    component: EditableSpan
}


export const EditableSpanExample = () => {
  return <EditableSpan title={'hello'} changeTitle={action('title was changed')}/>
}