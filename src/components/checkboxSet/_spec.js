import React from 'react'
import { shallow, mount } from 'enzyme'
import 'jest-styled-components'
import theme from '../../theme/theme'
import constants from '../../constants'
import Checkbox from '../checkbox'
import { Provider } from '../appContext'
import CheckboxSet from './'

// SVGs need to be mocked as the SVG output causes Babel to throw
jest.mock('../../theme/assets/images/icon-check.svg', () => 'foo')

describe('CheckboxSet', () => {
  const filterName = 'eventCategories'
  const options = constants[filterName] || []

  it('renders', () => {
    const wrapper = shallow(<CheckboxSet filterName="test" />, {
      context: { theme },
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('should render list properly', () => {
    const wrapper = mount(
      <Provider>
        <CheckboxSet filterName={filterName} sort="DESC" />
      </Provider>
    )
    expect(wrapper.find(Checkbox)).toHaveLength(options.length)
  })

  it('should check filter properly', () => {
    const wrapper = mount(
      <Provider>
        <CheckboxSet filterName={filterName} sort="DESC" />
      </Provider>
    )
    const checkbox = wrapper.find(Checkbox).first()
    const input = checkbox.find('input[type="checkbox"]')
    expect(input.props().checked).toEqual(false)
    checkbox.simulate('click')
    setTimeout(() => {
      expect(input.props().checked).toEqual(true)
    })
  })
})
