import * as React from 'react';
import styled from 'styled-components';
import { PresenterState } from '../models/PresenterState';
import { Theme } from '../Theme'


const CameraLinkWrapper = styled.div`
    max-width: 240px;
    max-height: 275px;
    padding: 1rem;
    position: relative;
    background: linear-gradient(80deg, ${Theme.primary}, ${Theme.primaryAccent});
    padding: 5px;
`

const CameraLinkDiv = styled.div`
    width: 240px;
    height: 275px;
    overflow: hidden;
    position: relative;
    left: 0px;
    top: 0px;
`

const CameraLink = styled.iframe`
    height: 295px;
    width: 505px;
    box-sizing: border-box;
    position: relative;
    left: -132px;
    top: -10px;
    
`

type CameraProps = {
    presenter: PresenterState,
}


export default class SmallCamera extends React.Component<CameraProps, {}> {

    render() {
        const { name, cameraLink } = this.props.presenter;
        return (
            <CameraLinkWrapper>
                <CameraLinkDiv>
                <CameraLink src = {cameraLink}/>
                </CameraLinkDiv>
            </CameraLinkWrapper>
        );
    }
}
