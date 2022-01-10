import styled from 'styled-components';
import { Theme } from '../Theme'

export const Time = styled.div`
    font-size: 70px;
    text-shadow: 1px 1px rgba(0,0,0,0.75), 2px 2px rgba(0,0,0,0.75);
    background-color: ${(props: { isCurrentPlayer: boolean }) => props.isCurrentPlayer ? Theme.primaryAccent : Theme.secondary};
    height: 100px;
    width: 170px;
    border-radius: 50%;
    line-height: 92px;
    box-shadow: 0px 10px 50px 10px rgba(0,0,0,.5), 0px 20px 50px 10px rgba(0,0,0,.5);
    margin: auto;
    margin-top: 15px;
    transition-property: background;
    transition-duration: .3s;
`
