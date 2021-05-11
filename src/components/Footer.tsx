import React from 'react'
import styled from 'styled-components'

const Link = styled.a`
  color: #9649cb;
`

const Wrapper = styled.div`
  font-weight: bold;
  color: #ccc;
`

export const Footer = () => (
  <Wrapper>
    <Link href="https://you54f.com">Homepage</Link>
    {' | '}
    <Link href="https://github.com/you54f/you54fdotcom">Github Repo</Link>
    {' | '}
    <Link href="https://github.com/you54f">Github Profile</Link>
  </Wrapper>
)
