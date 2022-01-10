import * as React from 'react';
import styled from 'styled-components';
import { PresenterState } from '../models/PresenterState';
import { Theme } from '../Theme'

// const keyOrder = ['smallLeft', 'smallRight','bigLeft','bigLeft']

const cameraHeight = ['295px','295px', '420px','420px'];
const cameraWidth = ['505px','505px', '720px','720px'];

const cameraWrapperWidth = ['240px', '240px','350px', '350px'];
const cameraWrapperHeight = ['275px', '275px', '400px', '400px'];

const cameraHorizontalOffset =  ['-132px', '-132px', '-185px', '-185px'];
const cameraVerticalOffset = ['-10px','-10px', '-10px','-10px'];

const cameraHorizontalPosition = ['left: 35px', 'right: 35px', 'left: 510px', 'right: 510px'];
const cameraVerticalPosition = ['bottom: 170px','top: 60px','top: 350px', 'top: 350px'];


const CameraLinkWrapper = styled.div`
    ${(props: { show: boolean ,index: number}) => props.show ? null : `display:none;`}
    padding: 1rem;
    position: absolute;
    overflow: hidden;
    background: ${Theme.secondary};
    padding: 5px;
    width: ${(props: { show: boolean ,index: number}) => cameraWrapperWidth[props.index]};
    height: ${(props: { show: boolean ,index: number}) => cameraWrapperHeight[props.index]};
    ${(props: { show: boolean ,index: number}) => cameraVerticalPosition[props.index]};
    ${(props: { show: boolean ,index: number}) => cameraHorizontalPosition[props.index]};
    z-order: 1;
`

const CameraLinkDiv = styled.div`
    width: ${(props: {index: number}) =>cameraWrapperWidth[props.index]};
    height: ${(props: {index: number}) =>cameraWrapperHeight[props.index]};
    overflow: hidden;
    position: relative;
    left: 0px;
    top: 0px;
`

const CameraLink = styled.iframe`
    height: ${(props: {index: number}) => cameraHeight[props.index]};
    width: ${(props: {index: number}) => cameraWidth[props.index]};
    box-sizing: border-box;
    position: relative;
    left: ${(props: {index: number}) => cameraHorizontalOffset[props.index]};
    top: ${(props: {index: number}) => cameraVerticalOffset[props.index]};
`

type CameraProps = {
    presenter: PresenterState,
    namePlace?: string,
    smallCamera: boolean,
    show: boolean,
}


export default class Camera extends React.Component<CameraProps, {}> {

    render() {
        const smallCamera = this.props.smallCamera;
        const { cameraLink } = this.props.presenter;
        const namePlace = this.props.namePlace ? this.props.namePlace : 'center';
        const show = this.props.show

        var key = Number()
        if (smallCamera && namePlace === 'left') {
            key = 0;
        }
        else if (smallCamera && namePlace === 'right') {
            key = 1;
        }
        else if (!smallCamera && namePlace === 'left') {
            key = 2;
        }
        else {
            key = 3;
        };

        return (
                <CameraLinkWrapper index = {key} show = {show}>
                    <CameraLinkDiv index = {key}>
                    <CameraLink src = {cameraLink} index = {key}/>
                    </CameraLinkDiv>
                </CameraLinkWrapper>
        );
    }
}
