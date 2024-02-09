import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import GlobalContext from '../context/GlobalContext';
import { SidebarLabel } from '../data/types/label.type';

export default function Labels() {
  const { labels, setLabels } = useContext(GlobalContext);

  const handleChangeInput = useCallback((obj: SidebarLabel) => {
    setLabels(labels.map((lbl) => lbl.label === obj.label ? obj : lbl))
  }, [labels, setLabels])

  return (
    <React.Fragment>
      <Container>Label</Container>
      {labels.map(({ checked, label }) => (
          <Label key={label}>
            <Input 
              type="checkbox" 
              onChange={() => handleChangeInput({label, checked: !checked})} 
              checked={checked} 
              $color={label} 
            />
            <LabelColor>{label}</LabelColor>
          </Label>
        ))}
    </React.Fragment>
  );
}

const LabelColor = styled.span`
  margin-left: 0.5rem;
  color: #4a5568;
  text-transform: capitalize;
`

const Container = styled.div`
  color: #718096;
  font-weight: bold;
  margin-top: 2.5rem;
`;

const Label = styled.label`
  align-items: center;
  margin-top: 0.75rem;
  display: block;
`;

const Input = styled.input.attrs({ type: 'checkbox' }) <{ $color: string; }>`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  user-select: none;
  flex-shrink: 0;
  height: 1rem;
  width: 1rem;
  color: currentColor;
  border-color: #cbd5e0;
  border-width: 1px;
  border-radius: 0.25rem;
  height: 1.25rem;
  width: 1.25rem;
  color: black;
  background-color: ${props => props.$color};
  transition: background-color 0.2s ease-in-out,border-color 0.2s ease-in-out,box-shadow 0.2s ease-in-out;
  cursor: pointer;
  accent-color: white;
  position: relative;

  &:focus {
    outline: 0;
  }

  &:checked {
    background-color: ${props => props.$color};
  }

  &:checked::after {
    content: "";
    background-color: #fff;
    display: block;
    position: absolute;
    border-radius: 9999px;
    left: 0.25rem;
    right: 0.25rem;
    top: 0.25rem;
    bottom: 0.25rem
  }

`;