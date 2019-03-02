import styled from 'styled-components'
import theme from '../../theme/theme'

const AccordionWrapper = styled.div`
  .accordion__body {
    padding-top: 0 !important;
    background-color: ${theme.colors.lightGrey} !important;
    animation: none !important;

    p {
      @media (max-width: ${theme.breakpoints[1]}) {
        font-size: 14px;
      }
    }
  }

  .accordion__title {
    padding: 20px !important;
    border-radius: 4px;
    outline: none;
    background-color: ${theme.colors.lightGrey} !important;

    h3 {
      color: ${theme.colors.black};

      &:hover {
        color: ${theme.colors.indigo};
      }

      @media (max-width: ${theme.breakpoints[1]}) {
        font-size: 14px;
      }
    }
  }

  .accordion__title[aria-selected='true'] {
    border-top: 2px solid ${theme.colors.eucalyptusGreen} !important;
    border-left: 2px solid ${theme.colors.eucalyptusGreen} !important;
    border-right: 2px solid ${theme.colors.eucalyptusGreen} !important;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    background-color: ${theme.colors.white} !important;

    h3 {
      color: ${theme.colors.indigo};
    }
  }

  .accordion__body[aria-hidden='false'] {
    border-bottom: 2px solid ${theme.colors.eucalyptusGreen} !important;
    border-left: 2px solid ${theme.colors.eucalyptusGreen} !important;
    border-right: 2px solid ${theme.colors.eucalyptusGreen} !important;
    border-bottom-left-radius: 4px !important;
    border-bottom-right-radius: 4px !important;
    background-color: ${theme.colors.white} !important;
  }

  .accordion__item + .accordion__item {
    border-top: none;
    margin-top: 20px;
  }

  .accordion {
    border: none;
    border-radius: 4px !important;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`

export default AccordionWrapper
