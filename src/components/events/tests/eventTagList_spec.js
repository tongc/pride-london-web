import React from 'react'
import { mount } from 'enzyme'
import EventTagList from '../eventTagList'

describe('The EventTag component', () => {
  it('renders', () => {
    const wrapper = mount(
      <EventTagList values={['Bananas', 'Golf', 'Shoe Spoons']} />
    )
    expect(wrapper.text()).toBe('BananasGolfShoe Spoons')
    expect(wrapper.find('li')).toHaveLength(3)
  })
})
