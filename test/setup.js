import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import createDOM from './createDOM';

Enzyme.configure({ adapter: new Adapter() });
createDOM();
