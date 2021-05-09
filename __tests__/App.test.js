import App from '../src/app/App.vue'
import { mount } from '@vue/test-utils';
describe('App', () => {
    // Inspect the raw component options
    it('has data', () => {
      expect(typeof App.data).toBe('undefined')
    })
  })
