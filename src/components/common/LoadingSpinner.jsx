import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const neonGlow = keyframes`
  0% {
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.neonBlue},
                0 0 10px ${({ theme }) => theme.colors.neonBlue};
  }
  50% {
    box-shadow: 0 0 10px ${({ theme }) => theme.colors.neonBlue},
                0 0 20px ${({ theme }) => theme.colors.neonBlue},
                0 0 30px ${({ theme }) => theme.colors.neonBlue};
  }
  100% {
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.neonBlue},
                0 0 10px ${({ theme }) => theme.colors.neonBlue};
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  height: ${({ size }) => size === 'large' ? '120px' : size === 'small' ? '40px' : '80px'};
`;

const Spinner = styled.div`
  position: relative;
  width: ${({ size }) => size === 'large' ? '80px' : size === 'small' ? '24px' : '50px'};
  height: ${({ size }) => size === 'large' ? '80px' : size === 'small' ? '24px' : '50px'};
`;

const SpinnerOuter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: ${({ size }) => size === 'large' ? '4px' : size === 'small' ? '2px' : '3px'} solid transparent;
  border-top-color: ${({ theme }) => theme.colors.neonBlue};
  border-right-color: ${({ theme }) => theme.colors.neonPink};
  border-bottom-color: ${({ theme }) => theme.colors.neonPurple};
  animation: ${rotate} 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
  animation-delay: -0.2s;
`;

const SpinnerMiddle = styled.div`
  position: absolute;
  top: 15%;
  left: 15%;
  width: 70%;
  height: 70%;
  border-radius: 50%;
  border: ${({ size }) => size === 'large' ? '4px' : size === 'small' ? '2px' : '3px'} solid transparent;
  border-top-color: ${({ theme }) => theme.colors.neonPink};
  border-right-color: ${({ theme }) => theme.colors.neonPurple};
  border-bottom-color: ${({ theme }) => theme.colors.neonBlue};
  animation: ${rotate} 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
  animation-delay: -0.1s;
`;

const SpinnerInner = styled.div`
  position: absolute;
  top: 30%;
  left: 30%;
  width: 40%;
  height: 40%;
  border-radius: 50%;
  border: ${({ size }) => size === 'large' ? '4px' : size === 'small' ? '2px' : '3px'} solid transparent;
  border-top-color: ${({ theme }) => theme.colors.neonPurple};
  border-right-color: ${({ theme }) => theme.colors.neonBlue};
  border-bottom-color: ${({ theme }) => theme.colors.neonPink};
  animation: ${rotate} 0.9s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
`;

const SpinnerCore = styled.div`
  position: absolute;
  top: 42.5%;
  left: 42.5%;
  width: 15%;
  height: 15%;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.accent};
  animation: ${pulse} 1.5s ease-in-out infinite, ${neonGlow} 2s ease-in-out infinite;
`;

// Label text shown below the spinner
const Label = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ size, theme }) => 
    size === 'large' ? theme.fontSizes.md : 
    size === 'small' ? theme.fontSizes.xs : 
    theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;
`;

const LoadingSpinner = ({ 
  size = 'medium',  // 'small', 'medium', 'large'
  label,
  className 
}) => {
  return (
    <Container size={size} className={className}>
      <div>
        <Spinner size={size}>
          <SpinnerOuter size={size} />
          <SpinnerMiddle size={size} />
          <SpinnerInner size={size} />
          <SpinnerCore />
        </Spinner>
        {label && <Label size={size}>{label}</Label>}
      </div>
    </Container>
  );
};

export default LoadingSpinner; 