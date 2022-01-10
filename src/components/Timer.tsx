import styled from 'styled-components';
import { Theme } from '../Theme';

export const Timer = styled.div`
position: absolute;
bottom: 0;
left: 0;
width: 100%;
height: 0%;
background-image: linear-gradient(${Theme.secondaryAccent}, ${Theme.secondaryAccent});
animation : drop ${(props: { duration: number }) => props.duration}s infinite,
            pulse ${(props: { duration: number }) => props.duration}s infinite;
animation-iteration-count: 1;
animation-timing-function : linear;

@keyframes drop {
    0%   { height: 100% }
    100% { height: 0%    }
 }

 @keyframes pulse {
    0%   { -webkit-transform: scale(1)   ; opacity: 1;    }
    80%  { -webkit-transform: scale(1); opacity: 1; }
    82%  { -webkit-transform: scale(1); opacity: 0.25; }
    84%  { -webkit-transform: scale(1); opacity: 1; }
    86%  { -webkit-transform: scale(1); opacity: 0.25; }
    88%  { -webkit-transform: scale(1); opacity: 1; }
    90%  { -webkit-transform: scale(1); opacity: 0.25; }
    92%  { -webkit-transform: scale(1); opacity: 1; }
    94%  { -webkit-transform: scale(1); opacity: 0.25; }
    96%  { -webkit-transform: scale(1); opacity: 1; }
    98%  { -webkit-transform: scale(1); opacity: 0.25; }
    100% { -webkit-transform: scale(1)   ; opacity: 1;    }
 }
`