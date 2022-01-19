import styled from "styled-components";

export const Content = styled.div`
  max-width: 1050px;
  padding: 16px;
  margin: 64px auto 0 auto;
`

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  
`
export const Flex = styled.div`
 display: flex;
  gap: 8px;
  justify-content: center;
`

export const Label = styled.div`
  font-size: 24px;
  color: #D7DADC;
`

export const Input = styled.input`
  background-color: rgba(0,0,0,0);
  border-radius: 8px;
  height: 42px;
  width: 120px;
  border: 2px solid #fff;
  color: white;
  box-sizing: border-box;
`

export const LetterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 auto;
`

export const Letter = styled.div<{color:string}>`
  font-size: 32px;
  font-weight: 600;
  text-transform: capitalize;
  width: 62px;
  height: 62px;
  text-align: center;
  line-height: 62px;
  background-color: ${props=> props.color};
  color: #D7DADC;
`

export const Button = styled.div`
  font-size: 24px;
  height: 42px;
  color: #D7DADC;
  background-color: #538D4E;
  padding: 0 12px;
  box-sizing: border-box;
  line-height: 38px; 
  border-radius: 8px;
  cursor: pointer;
`