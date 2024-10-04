import React from 'react'
import styled from 'styled-components'
import {MoonIcon} from '../../icons/MoonIcon'
import {SunIcon} from '../../icons/SunIcon'

interface ToggleProps {
    isDarkMode: boolean
    onToggle: (checked: boolean) => void
}

interface StyledProps {
    $isDarkMode: boolean // Use $ prefix to avoid passing to DOM
}

const ToggleButton = styled.button<StyledProps>`
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.3s ease;
    color: #ffffff; // Always white

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    &:focus {
        outline: none;
    }

    svg {
        width: 24px;
        height: 24px;
        transition: all 0.3s ease;
    }
`

const IconWrapper = styled.div<StyledProps>`
    position: relative;
    width: 24px;
    height: 24px;
    overflow: hidden;

    svg {
        position: absolute;
        top: 0;
        left: 0;
        transition: transform 0.3s ease;
        fill: #ffffff; // Always white
    }

    svg:first-child {
        transform: ${props => (props.$isDarkMode ? 'translateY(-100%)' : 'translateY(0)')};
    }

    svg:last-child {
        transform: ${props => (props.$isDarkMode ? 'translateY(0)' : 'translateY(100%)')};
    }
`

export const Toggle: React.FC<ToggleProps> = ({isDarkMode, onToggle}) => (
    <ToggleButton
        $isDarkMode={isDarkMode}
        onClick={() => onToggle(!isDarkMode)}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
        <IconWrapper $isDarkMode={isDarkMode}>
            <SunIcon />
            <MoonIcon />
        </IconWrapper>
    </ToggleButton>
)
