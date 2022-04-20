import App from './App';
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator';

export default {
    title: 'App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}





export const AppExample = (props: any) => {
    return <App/>
}