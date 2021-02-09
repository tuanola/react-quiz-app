import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
    }
    
    body {
        width: 100%;
        padding: 0 20px;
        margin: 0;
        display: flex;
        justify-content: center;
        font-family: Arial;
        background-color: #A2C3FC;
    }
    
    * {
        box-sizing: border-box;
    }
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    margin-top: 10px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    
    .score {
        font-size: 1.2rem;
    }
    
    h1 {
        color: #47435E;
        font-size: 2rem;
    }
`

type ButtonWrapperProps = {
    correct: boolean;
    userClicked: boolean;
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    transition: all 0.3 ease;
    
    :hover {
        opacity: 0.8;
    }
    
    button {
        cursor: pointer;
        user-select: none;
        font-size: 1rem;
        width: 100%;
        min-width: 100px;
        height: 40px;
        margin: 5px 0;
        background: ${({ correct, userClicked }) =>
            correct 
                ? 'linear-gradient(90deg, #85D29F, #F8F9FE)'
                : !correct && userClicked
                    ? 'linear-gradient(90deg, #F47885, #f7cfd3)'
                    : 'linear-gradient(90deg, #F8F9FE, #D4F4FA)'
        };
        border: none;
        box-shadow: 2px 2px 5px #aaa;
        border-radius: 10px;
    }    
`

export const NextStepWrapper = styled.div`
    button {
        cursor: pointer;
        border: none;
        box-shadow: 2px 2px 5px #aaa;
        border-radius: 10px;
        padding: 10px;
        
        color: #fff;
        background-color: #47435E;
    }
`
