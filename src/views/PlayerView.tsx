import * as React from 'react';
import styled from 'styled-components';
import { GameState } from '../models/GameState';
import { Theme } from '../Theme';
import { getGameStateUpdateStream } from '../api/localServer';

type PlayerViewProps = {
    gameState?: GameState
}

type PlayerViewInternalState = {
    answer_letters: Array<Array<string>>,
    teamname: string,
    teamnumber: number,

}

const Root = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    position: absolute;
    top: 0;
    left: 0;
    margin-left: 0px;
    margin-right: 0px;
    width: 100vw;
    height: 100vh;
    background-color: #cccccc;
    background-image: url('/imgs/background${(props: { backgroundType: string }) => props.backgroundType}.jpg');
    background-size: contain;
`

const Header = styled.div`
    display: flex;
    flex-direction: row;
    flex: 0 0 100vw;
    flex-wrap: wrap;
    font-size: 25pt;
    gap: 10px;
    justify-content: center;
    align-items: center;
`
const Title = styled.h1`
    color: ${Theme.primary};
    font-family: 'Phosphate';
    font-size: 100px;
    font-weight: normal;
    font-style: normal;
    margin: 10px 0 0 0;
    flex: 0 0 60%;
`

const Letterbox = styled.textarea`
    position: relative;
    resize: none;
    background: transparent;
    color: #ffffff;
    font-size: 20pt;
    width: 95%;
    height: 95%;
    margin: 0;
    padding: 0;
`
const LetterboxVertical = styled.textarea`
    position: relative;
    resize: none;
    background: rgba(255,255,255,0.5);
    color: #ffffff;
    font-size: 20pt;
    width: 95%;
    height: 95%;
    margin: 0;
    padding: 0;
`
const LetterBorder = styled.div`
    border: 2px solid ${Theme.secondary};
    background: transparent;
    position:relative;
    aspect-ratio: 1/1;
`

const NumberBox = styled.div`
    position: absolute;
    display: flex;
    width:10%;
    height:100%;
    right: 2px;
    bottom:2px;
    font-size:12pt;
    justify-content: right;
    align-items: flex-end;
`
const Letterbox_hidden = styled.div`
    position: relative;
    color: #ffffff;
`
const QuestionNumber = styled.div`
    display: flex;
    font-size:25pt;
    width:100%;
    justify-content: center;
    align-items: center;
`

const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 0 30vw;
    flex-wrap: wrap;
    font-size: 20pt;
    gap: 10px;
    justify-content: flex-start;
    `

const RightSide = styled.div`
    display: grid;
    grid-template: repeat(${(props: { width: number, height: number }) => props.height},30pt) /
                   repeat(${(props: { width: number, height: number }) => props.width},30pt);
    width: 60vw;
    row-gap: 0';
    aspect-ratio: 1/1;
    `
const Question = styled.div`
    display: flex;
    margin-top: 0px;
`


export default class PlayerView extends React.Component<PlayerViewProps, PlayerViewInternalState> { 

    state = {
        answer_letters: new Array,
        teamname: "",
        teamnumber: 0,
    }

    componentDidUpdate(prevProps:PlayerViewProps) {
        if (!this.props.gameState) {
            return <div>Not connected to server, is the server online?</div>;
        }
        if (prevProps.gameState !== this.props.gameState) {
        const { gameState } = this.props;
        const { roundState } = gameState;
        const { questions } = roundState;


        let answer_letters = [...Array(questions.length)];
        let question = Object();
        for (let i = 0; i<questions.length; i++) {
            question = questions[i];
            answer_letters[i] = [...Array(question.answer_length)];
        }
        this.setState({
            answer_letters
        });
    }
    }

    onLetterFill = (e: any) => {
        let evalue = e.target.value;
        let ename = e.target.name;

        let newLetters = this.state.answer_letters;
        newLetters[+ename.split(',')[0]][+ename.split(',')[1]] = evalue;
        this.setState({answer_letters:newLetters});

    

        console.log(this.state.answer_letters);

    };

    setTeamname = (e: any) => {
        this.setState({teamname:e.state.value});
    };
    setTeamnumber = (e: any) => {
        this.setState({teamnumber:e.state.value});
    };


    submitAnswers = (e: any) => {
        
    };
    render() {
        if (!this.props.gameState) {
            return <div>Not connected to server, is the server online?</div>;
        }
        const { gameState } = this.props;
        const { roundState } = gameState;
        const { questions } = roundState;
        
        let backgroundType = '1';
    
        var empty_befores = questions.map(function(question, idx) {
            return Math.max(...[...Array.from(questions, x=> x.overlap_letter)]) -  question.overlap_letter;
            });
        console.log(empty_befores)
        var total_lengths = empty_befores.map(function(num, idx) {
            return num + questions[idx].answer_length;
            });

        var grid_width = Math.max(...total_lengths);

        var cryptogram = <RightSide width = {grid_width} height = {questions.length}>
            {
            questions.map(
                (question, question_index) =>
                [...Array(grid_width)].map(
                    (grid_column, idx) => {
                    if (idx < empty_befores[question_index])
                    {
                       return <Letterbox_hidden>
                        </Letterbox_hidden>
                    }
                    else if (idx === empty_befores[question_index])
                    {
                        return <QuestionNumber> {question_index+1}  </QuestionNumber>
                    }
                    else if (idx === empty_befores[question_index]+question.overlap_letter+1)
                    {
                        return <LetterBorder>
                            <LetterboxVertical name={question_index.toString()+','+(idx-empty_befores[question_index]-1).toString()} maxLength = {1} onChange = {this.onLetterFill}>
                        </LetterboxVertical>
                        <NumberBox> {question.hint_numbers[idx-empty_befores[question_index]-1]!=0 ? question.hint_numbers[idx-empty_befores[question_index]-1] : ''} </NumberBox>
                        </LetterBorder>
                    }
                    else if (idx < total_lengths[question_index]+1)
                    {
                        return <LetterBorder>
                            <Letterbox name={question_index.toString()+','+(idx-empty_befores[question_index]-1).toString()} maxLength = {1} onChange = {this.onLetterFill}>
                        </Letterbox>
                        <NumberBox> {question.hint_numbers[idx-empty_befores[question_index]-1]!=0 ? question.hint_numbers[idx-empty_befores[question_index]-1] : ''} </NumberBox>
                        </LetterBorder>
                    }
                    else 
                    {
                        return <Letterbox_hidden>
                        </Letterbox_hidden>
                    }
                }

                    )
            )
            }
            </RightSide>

        const { teamname, teamnumber } = this.state;

        var showQuestions = questions.map(
            function(question, number){ 
                return <Question>{number+1}      {question.text}</Question>
            });
        
        return (
            <Root backgroundType={backgroundType}>
                <Header>
                    <Title> Cryptogram </Title>
                <div style={{width:'28%'}}>
                    <button onClick={this.submitAnswers} style = {{fontSize:'20pt'}}>Opsturen</button>
                    <div>
                    Teamnaam: <input type="string" onChange={this.setTeamname} ></input>
                    </div>
                    <div>
                    Teamnummer: <input type="string" onChange={this.setTeamnumber}></input>
                    
                </div></div>
                </Header>
                
                <LeftSide>{showQuestions}</LeftSide>
                {cryptogram}
            </Root >
        )
 
    }
}
