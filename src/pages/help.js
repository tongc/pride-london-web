import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Container, Row, Column } from '../components/grid'

import AccordionWrapper from '../components/accordion/accordionWrapper'
import Accordion from '../components/accordion'
import theme from '../theme/theme'

const PageWrapper = styled.div`
  background-color: ${theme.colors.white};

  h1 {
    margin-top: 60px;

    @media (max-width: ${theme.breakpoints[1]}) {
      font-size: 20px;
      margin-top: 30px;
    }
  }
`

const Help = () => (
  <Fragment>
    <PageWrapper>
      <Container>
        <Row>
          <Column width={[1, 1, 1, 0.65]}>
            <h1> We're often asked... </h1>
            <AccordionWrapper>
              <Accordion />
            </AccordionWrapper>
          </Column>
        </Row>
      </Container>
    </PageWrapper>
  </Fragment>
)

export default Help
